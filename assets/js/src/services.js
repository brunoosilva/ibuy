var app = angular.module('ibuy.services', []);

//app.constant('API_URL', 'http://localhost:3000/');
app.constant('API_URL', 'https://protected-atoll-9121.herokuapp.com/');

app.service('authService', ['$http', '$localstorage', 'API_URL', function($http, $localstorage, API_URL) {
  return{
    getUser: function(){
        var user = $localstorage.get('user');
        return (Object.keys(user).length)?user:false;
    },
    isAuthenticated: function(){
        return (this.getUser())?true:false;
    },
    login: function(credentials){
      return $http.post(API_URL + "user", credentials);
    },
    signup: function(params){
      return $http.post(API_URL + "user/add", params);
    },
    logout: function(){
        $localstorage.remove('user');
    }
  }
}]);

app.service('productsService', ['$http', 'authService', 'API_URL', function($http, authService, API_URL) {
  return {
      getProducts: function(){
        return $http.get(API_URL + "products");
      },
      getProduct: function(alias){
        return $http.get(API_URL + "products/" + alias);
      }
  }
}]);

app.service('wishilistService', ['$http', 'authService', 'API_URL', function($http, authService, API_URL) {
  return {
      getList: function(){
        var user = authService.getUser();
        return $http.get(API_URL + "wishilist/" + user["_id"]);
      },
      addList: function(data){
        var user = authService.getUser();
        data.id_user = user["_id"];
        data.purchased = false;
        return $http.post(API_URL + "wishilist", data);
      },
      updateItemList: function(id_product, purchased){
        var user = authService.getUser();
        return $http.put(API_URL + "wishilist/" + user["_id"] + "/" + id_product, {id_user: user["_id"], id_product: id_product, purchased: purchased});
      },
      deleteItemList: function(id_product){
        var user = authService.getUser();
        return $http.delete(API_URL + "wishilist/" + user["_id"] + "/" + id_product);
      }
  }
}]);
