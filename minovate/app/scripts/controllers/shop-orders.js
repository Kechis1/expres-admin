'use strict';

app
  .factory('OrdersList', function($resource) {
    return $resource('http://localhost:80/v1/app/orders', null, {
      query: {
        method: 'GET',
        isArray: false
      }
    });
  });

/**
 * @ngdoc function
 * @name minovateApp.controller:ShopOrdersCtrl
 * @description
 * # ShopOrdersCtrl
 * Controller of the minovateApp
 */
app
  .controller('OrdersTableCtrl', function ($scope, OrdersList, $translate, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder, $resource, $filter) {
    var $translation = $filter('translate');
    var sLengthMenu = $translation('Labels.VIEW') + ' _MENU_ ' + $translation('Labels.RECORDS');
    var sInfo = $translation('Labels.FOUND') + ' _TOTAL_ ' + $translation('Labels.RECORDS');
    var vm = this;
    vm.orders = [];
    vm.dtOptions = DTOptionsBuilder.newOptions()
      .withBootstrap()
      .withOption('order', [[1, 'desc']])
      .withDOM('<"row"<"col-md-8 col-sm-12"<"inline-controls"l>><"col-md-4 col-sm-12"<"pull-right"f>>>t<"row"<"col-md-4 col-sm-12"<"inline-controls"l>><"col-md-4 col-sm-12"<"inline-controls text-center"i>><"col-md-4 col-sm-12"p>>')
      .withLanguage({
        "sLengthMenu": sLengthMenu,
        "sInfo": sInfo,
        "oPaginate": {
          "sPage": $translation('Labels.PAGE'),
          "sPageOf": $translation('Labels.OF')
        }
      })
      .withPaginationType('input')
      .withColumnFilter();


    vm.dtColumnDefs = [
      DTColumnDefBuilder.newColumnDef(0).notSortable(),
      DTColumnDefBuilder.newColumnDef(9).notSortable()
    ];

    vm.selectedAll = false;

    vm.selectAll = function () {

      $scope.selectedAll = !$scope.selectedAll;

      angular.forEach(vm.orders.fields, function (order) {
        order.selected = $scope.selectedAll;
      });
    };

    vm.orders = OrdersList.get();

    var STATUS_COUNT = 0;
    $scope.status_keys = [];

    $translate('Pages.Orders.STATUS.children_count').then(function (count) {
      STATUS_COUNT = count;
      for (var i = 0; i < STATUS_COUNT; i++) {
        $scope.status_keys.push(i);
      }
    });

    vm.delete = function (order) {

    };

  });
