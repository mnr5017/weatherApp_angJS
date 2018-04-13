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
      .state('app.current', {
        url: '/current',
        views: {
          'menuContent': {
            templateUrl: 'templates/current.html'
          }
        }
      })
      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'templates/search.html'
          }
        },
        controller: 'SearchController'
      })
      .state('app.favorites', {
        url: '/favorites',
        views: {
          'menuContent': {
            templateUrl: 'templates/favorites.html'
            //controller: 'PlaylistsCtrl'
          }
        }
      })
      .state('app.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'templates/settings.html'
            //controller: 'PlaylistsCtrl'
          }
        }
      })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/current');
  })

  .controller('OptionsMenuController', function ($scope, Cities) {
    $scope.cities = Cities.data;
  })

  .factory('Settings', function () {
    var Settings = {
      units: 'fahrenheit'
    };
    return Settings;
  })
  .factory('Cities', function () {
    var Cities = {
      data: [{
        address: 'Philadelphia, PA, USA',
        lat: 39.9525839,
        lng: -75.1652215
      }],
      getIndex: function (item) {
        var index = -1;
        angular.forEach(Cities.data, function(address, i) {
          if (item.lat == address.lat && item.lng == address.lng) {
            index = i;
          }
        });
        return index;
      },
      toggle: function (item) {
        var index = Locations.getIndex(item);
        if (index >= 0) {
          Cities.data.splice(index, 1);
        } else {
          Cities.data.push(item);
        }
      },
      primary: function (item) {
        var index = Cities.getIndex(item);
        if(index >= 0) {
          Cities.data.splice(0, 0, item);
        } else {
          Cities.data.unshift(item);
        }
      }
    };
    return Cities;
  })
