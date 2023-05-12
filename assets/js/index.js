;(() => {
  const app = angular.module("codemon", ["ngRoute", "product.controllers"])

  app.config([
    "$routeProvider",
    function ($routeProvider) {
      $routeProvider
        .when("/", {
          templateUrl: "views/home.html",
        })
        .when("/product-list", {
          templateUrl: "views/product.html",
        })
        .when("/edit/:id", {
          templateUrl: "views/edit.html",
          controller: "editCtrl",
        })
    },
  ])

  app.run(function ($rootScope, $http) {
    $http.get("/api/product").then((res) => {
      $rootScope.products = res.data
    })
  })
})()
