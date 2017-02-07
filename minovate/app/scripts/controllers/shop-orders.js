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

  .controller('OrdersTableCtrl', ['$scope', 'OrdersList', '$translate', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'DTColumnBuilder', '$filter',
    function($scope, OrdersList, $translate, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder, $filter) {
      var $translation = $filter('translate');
      var vm = this;
      var lfound = $translation('Labels.FOUND.many');
      var lview = $translation('Labels.VIEW');
      var lrecords = $translation('Labels.RECORDS.many');
      vm.orders = [];
      // Initialize table
      OrdersList.get().$promise.then(function(orders) {
        vm.orders = orders.fields;
        switch (vm.orders.length) {
          case 1:
            lfound = $translation('Labels.FOUND.one');
            lrecords = $translation('Labels.RECORDS.one');
            break;
          case 2:case 3:case 4:
            lfound = $translation('Labels.FOUND.chico');
            lrecords = $translation('Labels.RECORDS.chico');
            break;
          default:
            lfound = $translation('Labels.FOUND.many');
            lrecords = $translation('Labels.RECORDS.many');
            break;
        }
        vm.dtOptions = DTOptionsBuilder.newOptions()
          .withBootstrap()
          .withOption('order', [[1, 'desc']])
          .withDOM('<"row"<"col-md-4 col-sm-12"<"inline-controls">><"col-md-8 col-sm-12"<"pull-right"f>>>t<"row"<"col-md-4 col-sm-12"<"inline-controls"l>><"col-md-4 col-sm-12"<"inline-controls text-center"i>><"col-md-4 col-sm-12"<"pull-right"p>>>')
          .withLanguage({
            "sLengthMenu": lview + ' _MENU_ ' + $translation('Labels.RECORDS.many'),
            "sInfo": lfound + ' _TOTAL_ ' + lrecords,
            "sInfoEmpty": lfound + ' _TOTAL_ ' + lrecords,
            "emptyTable": $translation('Labels.EMPTYTABLE'),
            "oPaginate": {
              "sPage": $translation('Labels.PAGE'),
              "sPageOf": $translation('Labels.OF')
            },
            "sSearch": $translation('Labels.SEARCH') + ':'
          })
          .withPaginationType('input')
          .withColumnFilter();
      });



      vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0).notSortable(),
        DTColumnDefBuilder.newColumnDef(9).notSortable()
      ];

      ////////////////////////////////////////// *Initialize table

      var STATUS_COUNT = 0;
      $scope.status_keys = [];

      $translate('Pages.Orders.STATUS.children_count').then(function (count) {
        STATUS_COUNT = count;
        for (var i = 0; i < STATUS_COUNT; i++) {
          $scope.status_keys.push(i);
        }
      });
      //////////////////////////////////////////
      //************ Table Settings **********//
      //////////////////////////////////////////

      vm.selectedAll = false;

      vm.selectAll = function () {

        $scope.selectedAll = !$scope.selectedAll;

        angular.forEach(vm.orders, function (order) {
          order.selected = $scope.selectedAll;
        });
      };

}]);
