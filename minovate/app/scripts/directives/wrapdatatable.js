'use strict';

/**
 * @ngdoc directive
 * @name minovateApp.directive:wrapDatatable
 * @description
 * # wrapDatatable
 */
app
  .directive('wrapDatatable', function ($timeout, $compile) {
    return {
      restrict: 'E',
      transclude: true,
      template: '<ng-transclude></ng-transclude>',
      link: link
    };

    function link(scope, element) {
      // Using $timeout service as a "hack" to trigger the callback function once everything is rendered
      $timeout(function () {
        // Compiling so that angular knows the button has a directive
        $compile(element.find(".table-action-button"))(scope);
      }, 0, false);
    }
  });
