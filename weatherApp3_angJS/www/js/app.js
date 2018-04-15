// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('WeatherApp', ['ionic', 'weatherApp.controllers'])

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })
      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'templates/search.html',
            controller: 'SearchController'
          }
        }
      })
      .state('app.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'templates/settings.html',
            controller: 'SettingsController'
          }
        }
      })
      .state('app.current', {
        url: '/current/:city/:lat/:lng',
        views: {
          'menuContent': {
            templateUrl: 'templates/current.html',
            controller: 'CurrentController'
          }
        }
      });
      
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/search');
  })

  .controller('OptionsMenuController', function ($scope, Locations) {
    $scope.locations = Locations.data;
  })

  .factory('Settings', function(){
    var Settings = {
      units: 'us',
      days: 8
    };
    return Settings;
  })
  .factory('Locations', function () {
    var Locations = {
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
