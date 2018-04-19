// Weather App - app.js

// Provides routing for login, search, settings, and current weather pages.  Angular.module links in
// Ionic and weatherApp controllers file. App file also contains filters and factories for current
// weather page formatting, fahrenheit/celsius user preference, and saved location settings.
angular.module('WeatherApp', ['ionic', 'weatherApp.controllers'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
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
    $urlRouterProvider.otherwise('/app/search');
  })
  
  .controller('OptionsMenuController', function ($scope, Locations) {
    $scope.locations = Locations.data;
  })
  
  //filter provides current weather page with icon image for corresponding weather condition 
  .filter('icons', function() {
    var matchIcon = {
      'partly-cloudy-day': 'ion-ios-partlysunny',
      'clear-day': 'ion-ios-sonny',
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
  //factory determines saved user locations
  .factory('Locations', function () {
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
          Locations.data.splice(index, 1);
        } else {
          Locations.data.push(item);
        }
      },
      primary: function (item) {
        var index = Locations.getIndex(item);
        if (index >= 0) {
          Locations.data.splice(index, 1);
          Locations.data.splice(0, 0, item);
        } else {
          Locations.data.unshift(item);
        }
      }
    };
    return Locations;
  });
