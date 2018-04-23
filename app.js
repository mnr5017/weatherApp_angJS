// Weather App - app.js

// Provides routing for login, search, settings, and current weather pages.  Angular.module links in
// Ionic and weatherApp controllers file. App file also contains filters and factories for current
// weather page formatting, fahrenheit/celsius user preference, and saved location settings.
angular.module('WeatherApp', ['ionic', 'weatherApp.controllers'])
  //.constant('LOCATIONS_DATA_KEY', 'LOCATIONS_DATA_KEY')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })
      // location page
      .state('app.userLocation', {
        url: '/userLocation',
        views: {
          'menuContent': {
            templateUrl: 'templates/userLocation.html',
            controller: 'UserLocationController'
          }
        }
      })
      //search page - finds cities 
      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'templates/search.html',
            controller: 'SearchController'
          }
        }
      })
      //settings page - change from F/C, add/delete favorites
      .state('app.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'templates/settings.html',
            controller: 'SettingsController'
          }
        }
      })
      //current weather - retrieves temperature, conditions
      .state('app.current', {
        url: '/current/:city/:lat/:lng',
        views: {
          'menuContent': {
            templateUrl: 'templates/current.html',
            controller: 'CurrentController'
          }
        }
      });
      
    // default template if no other state is matched
    $urlRouterProvider.otherwise('/app/userLocation');
  })
  .controller('OptionsMenuController', function ($scope, Locations) {
    $scope.locations = Locations.data;
  })
  
  //filter provides current weather page with icon image for corresponding weather condition 
  .filter('icons', function() {
    var matchIcon = {
      'partly-cloudy-day': 'ion-ios-partlysunny',
      'clear-day': 'ion-ios-sunny',
      'partly-cloudy-night': 'ion-ios-cloudy-night',
      'clear-night': 'ion-ios-moon',
      cloudy: 'ion-ios-cloudy',
      fog: 'ion-ios-cloud',
      wind: 'ion-ios-flag',
      rain: 'ion-ios-rainy',
      sleet: 'ion-ios-rainy',
      snow: 'ion-ios-snowy'
    };
    return function(icon) {
      return matchIcon[icon] || '';
    }
  })

  //factory determines whether settings are set to fahrenheit or celsius 
  .factory('Settings', function(){
    var Settings = {
      units: 'us'
    };
    return Settings;
  })
  /*
  //factory to add to local storage
  .factory('AddToLocal', function () {
    window.localStorage.setItem(LOCATIONS_DATA_KEY, JSON.stringify)
  })
  //factory to retrieve from local storage
  .factory('RetrieveFromLocal', function () {
      var savedData = localStorage.getItem(LOCATIONS_DATA_KEY);
      if (savedData) {
        savedLocations = JSON.parse(savedData);
        return true;
      }
      return false;
  })  */
  //factory determines saved user locations
  .factory('Locations', /*['AddToLocal', 'RetrieveFromLocal',*/ function ($ionicPopup) {
    //either retrieve list from local or use default Locations
    var Locations = {
      //philadelphia default city
      data: [{
        city: 'Philadelphia, PA, USA',
        lat: 39.952583,
        lng: -75.165222
      }],
      getIndex: function (item) {
        var index = -1;
        angular.forEach(Locations.data, function (location, i) {
          if (item.lat == location.lat && item.lng == location.lng) {
            index = i;
          }
        });
        return index;
      },
      toggle: function (item) {
        var index = Locations.getIndex(item);
        if (index >= 0) {
          $ionicPopup.confirm({
            title: "Are you sure?",
            template: 'This will remove ' + Locations.data[index].city
          }).then(function (res) {
            if (res) {
              Locations.data.splice(index, 1);
              //AddToLocal();
            }
          });
        } else {
          Locations.data.push(item);
          //AddToLocal();
          $ionicPopup.alert({
            title: 'Added to Saved Cities'
          });
        }
      }
    };
    return Locations;
  }/*]*/);
