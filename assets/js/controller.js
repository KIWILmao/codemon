angular
  .module("product.controllers", [])
  .controller(
    "editCtrl",
    function ($rootScope, $scope, $http, $routeParams, $location) {
      const id = $routeParams.id
      $http.get(`/api/product/${id}`).then((res) => {
        $scope.name = res.data.name
        $scope.description = res.data.description
        $scope.price = res.data.price
      })
      $scope.updateProduct = () => {
        const idx = $rootScope.products.findIndex((item) => {
          return item._id == id
        })
        const updatedProduct = {
          name: $scope.name,
          description: $scope.description,
          price: $scope.price,
        }
        $http.put(`/api/product/${id}`, updatedProduct)
        $rootScope.products.splice(idx, 1, updatedProduct)
        $location.path("product-list")
      }
    }
  )
