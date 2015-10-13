var app = angular.module('ibuy.controllers', []);

app.controller('LoginCtrl', ['$scope', 'authService', 'SweetAlert', '$location', '$localstorage',
  function($scope, authService, SweetAlert, $location, $localstorage) {

  $scope.auth = {};
  $scope.doLogIn = function(){
    $scope.disableButton = true;

    authService.login($scope.auth).then(function(data) {
      var result = data.data;
      if(result){
          $localstorage.set('user', result);
          $location.path('/items');
      }
    }, function(err) {
      $scope.disableButton = false;
      if(err.status == 404){
        SweetAlert.swal("Erro", err.data, "error");
      } else {
          console.log("Error", err);
      }
    });
  }
}]);

app.controller('RegisterCtrl', ['$scope', 'authService', 'SweetAlert', '$location', '$localstorage',
  function($scope, authService, SweetAlert, $location, $localstorage) {

  $scope.auth = {};
  $scope.doSignUp = function(){
    $scope.disableButton = true;

    authService.signup($scope.auth).then(function(data) {
      var result = data.data;
      if(result){
          $localstorage.set('user', result);
          $location.path('/items');
      }
    }, function(err) {
      $scope.disableButton = false;
      SweetAlert.swal("Erro", err.data, "error");
    });
  }
}]);

app.controller('headerCtrl', ['$scope', '$location', 'authService', function($scope, $location, authService) {
  $scope.isActive = function(menu){
    return ($location.path() == menu);
  };

  $scope.username = authService.getUser().name;

  $scope.doLogout = function(){
    authService.logout();
    $location.path("/login");
  };

  $scope.headerMobile = false;
}]);

app.controller('ItemsCtrl', ['$scope', 'productsService', function($scope, productsService) {
  $scope.items = [];
  productsService.getProducts().then(function(data){
    var result = data.data;
    if(result){
      $scope.items = result;
    }
  });
}]);

app.controller('ItemDetailCtrl', ['$scope', 'productsService', '$route', function($scope, productsService, $route) {
  $scope.item = {};
  $scope.alias = $route.current.params.alias;
  productsService.getProduct($scope.alias).then(function(data){
    var result = data.data;
    if(result){
      $scope.item = result;
    }
  });
}]);



app.controller('WishilistCtrl', ['$scope', function($scope) {

}]);
