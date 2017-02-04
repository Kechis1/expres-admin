'use strict';

app
  .factory('OrdersList', function($resource) {
    return $resource('http://localhost:80/v1/app/orders', null, {
      query: {
        method: 'GET',
        isArray: false
      }
    });
  })

  .controller('OrdersTableCtrl', ['$scope', '$filter', 'OrdersList', 'ngTableParams', 'toastr', '$translate',
    function($scope, $filter, OrdersList, ngTableParams, toastr, $translate) {

      //////////////////////////////////////////
      //************ Table Settings **********//
      //////////////////////////////////////////

      // Initialize table
      OrdersList.get().$promise.then(function(orders) {
        $scope.orders = orders.fields;

        $scope.tableParams = new ngTableParams({
          page: 1,            // show first page
          count: 10,          // count per page
          sorting: {
            id: 'desc'     // initial sorting
          }
        }, {
          total: $scope.orders.length, // length of data
          getData: function ($defer, params) {
            // use build-in angular filter
            var orderedData = params.sorting() ?
              $filter('orderBy')($scope.orders, params.orderBy()) :
              $scope.orders;

            orderedData = $filter('filter')(orderedData, $scope.searchText);
            params.total(orderedData.length);

            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
          }
        });
        ////////////////////////////////////////// *Initialize table

        var STATUS_COUNT = 0;
        $scope.status_keys = [];

        $translate('Pages.Orders.STATUS.children_count').then(function (count) {
          STATUS_COUNT = count;
          for (var i = 0; i < STATUS_COUNT; i++) {
             $scope.status_keys.push(i);
           }
        });
      });

      $scope.selectedAll = false;

      $scope.selectAll = function () {

        $scope.selectedAll = !$scope.selectedAll;

        angular.forEach($scope.orders, function (order) {
          order.selected = $scope.selectedAll;
        });
      };

}]);
