'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:DaterangepickerCtrl
 * @description
 * # DaterangepickerCtrl
 * Controller of the minovateApp
 */
app
  .controller('DaterangepickerCtrl', function ($scope, $moment, $filter) {
    var $translate = $filter('translate');
    var startDate = $moment().subtract(30, 'days');
    $scope.startDate = startDate.format('D. ') + $translate('Months.Long.' + startDate.format('MMMM')) + " " + startDate.format('YYYY');
    $scope.endDate = $moment().format('D. ') + $translate('Months.Long.' + $moment().format('MMMM')) + " " + $moment().format('YYYY');
    $scope.rangeOptions = {
      ranges: {
        Today: [$moment(), $moment()],
        Yesterday: [$moment().subtract(1, 'days'), $moment().subtract(1, 'days')],
        'Last 7 Days': [$moment().subtract(6, 'days'), $moment()],
        'Last 30 Days': [$moment().subtract(29, 'days'), $moment()],
        'This Month': [$moment().startOf('month'), $moment().endOf('month')],
        'Last Month': [$moment().subtract(1, 'month').startOf('month'), $moment().subtract(1, 'month').endOf('month')]
      },
      opens: 'left',
      startDate: $moment().subtract(30, 'days'),
      endDate: $moment(),
      parentEl: '#content'
    };
  });
