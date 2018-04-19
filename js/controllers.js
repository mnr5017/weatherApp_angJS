angular.module('weatherApp.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

//controller for search - retrieves city through google api
.controller('SearchController', function ($scope, $http) {
    //sets search term to blank
    $scope.model = {term: ''};

    //on submit click, search function called to implement google geocode api
    $scope.search = function () {
      $http.get('https://maps.googleapis.com/maps/api/geocode/json',
        {params: {address: $scope.model.term}}).success(function (response) {
          $scope.results = response.results;
        });
    };
})

//controller for settings - add, remove favorite locations
.controller('SettingsController', function ($scope, Settings, Locations) {
    $scope.settings = Settings;
    $scope.locations = Locations.data;
    $scope.canDelete = false;

    $scope.remove = function (index) {
      Locations.toggle(Locations.data[index]);
    };
})

//controller for current conditions - retrieves conditions from forecast api using lat/lng
.controller('CurrentController', function ($scope, $http, $stateParams, Settings) {
    $scope.params = $stateParams;
    $scope.settings = Settings;

    $http.get('/api/forecast/' + $stateParams.lat + ',' + $stateParams.lng, 
      {params: {units: Settings.units}}).success(function (forecast) {
        $scope.forecast = forecast;
      });

    $scope.setFavorites = function() {
      var selection = $ionicActionSheet.show({
        options: [ 
        {text:'Make Primary City'},
        {text: 'Add/Remove SavedCity'}
        ],
        cancelOption: 'Cancel',
        buttonClicked: function (index) {
          if (index === 0) {
            Locations.toggle($stateParams);
          }
          if (index === 1) {
            Locations.primary($stateParams);
          }
          if (index === 2) {
            $scope.showModal();
          }
          return true;
        }
      });
    }
});

