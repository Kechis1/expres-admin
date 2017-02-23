'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:OrdersTableCtrl
 * @description
 * # OrdersTableCtrl
 * Controller of the minovateApp
 */
app
  .controller('OrdersTableCtrl', ['$scope', 'toastr', 'OrdersHiddenFactr', 'OrdersFactr', '$translate', 'ngTableParams', '$filter',
    function($scope, toastr, OrdersHiddenFactr, OrdersFactr, $translate, ngTableParams, $filter) {
      //////////////////////////////////////////
      //************ Table Settings **********//
      //////////////////////////////////////////
      var STATUS_COUNT = 0;
      var $translation = $filter('translate');
      $scope.status_keys = [];
      $scope.orders_shown_deleted = false;

      $translate('Pages.Orders.STATUS.children_count').then(function (count) {
        STATUS_COUNT = count;
        for (var i = 0; i < STATUS_COUNT; i++) {
          $scope.status_keys.push(i);
        }
      });

      $scope.selectedAll = false;

      $scope.selectAll = function () {
        $scope.selectedAll = !$scope.selectedAll;
        angular.forEach($scope.orders, function (order) {
          order.selected = $scope.selectedAll;
        });
      };

      /**
       * @desc Gets selected checkboxes
       * @returns {Array}
       */
      function getSelectedOrders() {
        var orders = [];
        angular.forEach($scope.orders, function (order) {
          if (order.selected === true) {
            orders.push({
              id: order.id
            });
          }
        });
        return orders;
      }

      $scope.getOrders = function () {
        OrdersFactr.get().$promise.then(function(orders) {
          $scope.orders = orders.fields;
          angular.element('.tile.refreshing').removeClass('refreshing');
          $scope.orders_shown_deleted = false;
        });
      };

      $scope.getHiddenOrders = function() {
        OrdersHiddenFactr.get().$promise.then(function (orders) {
          $scope.orders = orders.fields;
          angular.element('.tile.refreshing').removeClass('refreshing');
          $scope.orders_shown_deleted = true;
        });
      };

      /**
       * @desc DELETE CRUD operation
       * @param id
       */
      $scope.deleteItem = function(id) {
        var orders = getSelectedOrders();
        if (typeof(id) !== 'undefined') {
          orders = [];
          orders.push({
            id: id
          });
        }
        var data = {status: null, orders: orders};
        OrdersFactr.delete({}, data).$promise.then(function() {
          toastr.success($translation('Messages.ORDERS.DELETE'), $translation('Messages.SUCCESS'));
          OrdersFactr.get().$promise.then(function(orders) {
            $scope.orders = orders.fields;
            angular.element('.tile.refreshing').removeClass('refreshing');
          });
        }, function(error) {
          toastr.error(error.data.message, $translation('Messages.ERROR'));
          angular.element('.tile.refreshing').removeClass('refreshing');
        });
      };

      /**
       * @desc PUT CRUD operation
       * @param status
       */
      $scope.statusUpdate = function(status) {
        var orders = getSelectedOrders();
        var data = {status: status, orders: orders};
        OrdersFactr.put({}, data).$promise.then(function() {
          toastr.success($translation('Messages.ORDERS.UPDATE'), $translation('Messages.SUCCESS'));
          OrdersFactr.get().$promise.then(function(orders) {
            $scope.orders = orders.fields;
            angular.element('.tile.refreshing').removeClass('refreshing');
          });
        }, function(error) {
          toastr.error(error.data.message, $translation('Messages.ERROR'));
          angular.element('.tile.refreshing').removeClass('refreshing');
        });
      };

      // Initialize table
      OrdersFactr.get().$promise.then(function(orders) {
        $scope.orders = orders.fields;
        // watch data in scope, if change reload table
        $scope.$watchCollection('orders', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            $scope.tableParams.reload();
          }
        });

        $scope.$watch('searchText', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            $scope.tableParams.reload();
          }
        });
        ///////////////////////////////////////////// *watch data in scope, if change reload table

        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: {
              id: 'desc'     // initial sorting
            }
          }, {
            total: $scope.orders.length, // length of data
            getData: function($defer, params) {
              var orderedData = params.sorting() ?
                $filter('orderBy')($scope.orders, params.orderBy()) :
                $scope.orders;

              orderedData	= $filter('filter')(orderedData, $scope.searchText);
              params.total(orderedData.length);

              $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
      });
      ////////////////////////////////////////// *Initialize table


      //////////////////////////////////////////
      //************ Table Settings **********//
      //////////////////////////////////////////
}]);
