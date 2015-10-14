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
      $localstorage.set('user', result);
      if(result){
        swal({
          title: "Parabéns!",
          text: "Seu cadastro foi criado com sucesso!",
          type: "success",
          confirmButtonColor: "#15905c",
          confirmButtonText: "Começar!"
        }, function(){
          $scope.$apply(function() { $location.path("/items"); });
       });
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


app.controller('ItemsCtrl', ['$scope', 'productsService', 'wishilist', function($scope, productsService, wishilist) {
  $scope.items = [];
  productsService.getProducts().then(function(data){
    var result = data.data;
    if(result){
      $scope.items = result;
    }
  });

  $scope.addWishilist = function(item){
    item.wishilist = true;
    wishilist.addWishilist(item._id);
  };
}]);

app.controller('ItemDetailCtrl', ['$scope', 'productsService', '$route', 'wishilist', function($scope, productsService, $route, wishilist) {
  $scope.item = {};
  $scope.alias = $route.current.params.alias;
  productsService.getProduct($scope.alias).then(function(data){
    var result = data.data;
    if(result){
      $scope.item = result;
    }
  });

  $scope.addWishilist = function(id_product){
    $scope.item.isWishilist = true;
    wishilist.addWishilist(id_product);
  };

  $scope.removeWishilist = function(id_product){
    $scope.item.isWishilist = false;
    wishilist.removeWishilist(id_product);
  };
}]);

app.controller('WishilistCtrl', ['$scope', 'wishilistService', 'wishilist', function($scope, wishilistService, wishilist) {
  $scope.wishlist = [];
  wishilistService.getList().then(function(data) {
    var result = data.data;
    if(result){
        $scope.wishlist = result;
    }
  }, function(err) {
    SweetAlert.swal("Erro", err.data, "error");
  });

  $scope.changePurchased = function(item){
    item.purchased = !item.purchased;
    wishilist.changeWishilist(item._id, item.purchased);
  };

  $scope.removeWishilist = function(item, $index){
    wishilist.removeWishilist(item._id, true);
    $scope.wishlist.splice($index, 1);
  };
}]);
