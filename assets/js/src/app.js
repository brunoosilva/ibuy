var app = angular.module('iBuy', [
  'ngRoute',
  'ngSanitize',
  'ibuy.services',
  'ibuy.controllers',
  'oitozero.ngSweetAlert'
]);

app.run(['$rootScope', '$location', 'authService', function($rootScope, $location, authService){
  $rootScope.$on("$routeChangeStart", function (event, next, current) {
      if(next && next.$$route.originalPath == '/login' && authService.isAuthenticated()){
          $location.path("/items");
      }

      if(next && next.$$route){
          if (next.$$route.secure) {
              if (!authService.isAuthenticated()) {
                  $rootScope.$evalAsync(function () {
                    $location.path("/login");
                  });
              }
          }
      }
  });
}]);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
  $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  var param = function(obj) {
     var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

     for(name in obj) {
         value = obj[name];

         if(value instanceof Array) {
             for(i=0; i<value.length; ++i) {
                 subValue = value[i];
                 fullSubName = name + '[' + i + ']';
                 innerObj = {};
                 innerObj[fullSubName] = subValue;
                 query += param(innerObj) + '&';
             }
         }
         else if(value instanceof Object) {
             for(subName in value) {
                 subValue = value[subName];
                 fullSubName = name + '[' + subName + ']';
                 innerObj = {};
                 innerObj[fullSubName] = subValue;
                 query += param(innerObj) + '&';
             }
         }
         else if(value !== undefined && value !== null)
             query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
     }

     return query.length ? query.substr(0, query.length - 1) : query;
  };
  $httpProvider.defaults.transformRequest = [function(data) {
     return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];

  $routeProvider
  .when('/login', {
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .when('/register', {
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })
  .when('/items', {
    templateUrl: 'templates/items.html',
    controller: 'ItemsCtrl',
    secure: true
  })
  .when('/items/:alias', {
    templateUrl: 'templates/item-detail.html',
    controller: 'ItemDetailCtrl',
    secure: true
  })
  .when('/wishilist', {
    templateUrl: 'templates/wishilist.html',
    controller: 'WishilistCtrl',
    secure: true
  })
  .otherwise({ redirectTo: '/login' });
}]);

app.factory('$localstorage', ['$window', function($window){
    return{
        set: function(key, value) {
            if(typeof value == 'object'){
                $window.localStorage[key] = JSON.stringify(value);
            } else {
                $window.localStorage[key] = value;
            }
        },
        get: function(key, defaultValue) {
            try{
                return JSON.parse($window.localStorage[key] || '{}');
            } catch(e){
                return $window.localStorage[key] || defaultValue;
            }
        },
        remove: function(key){
            $window.localStorage.removeItem(key);
        }
    };
}]);
