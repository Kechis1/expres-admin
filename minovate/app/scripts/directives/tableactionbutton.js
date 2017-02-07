'use strict';

/**
 * @ngdoc directive
 * @name minovateApp.directive:tableActionButton
 * @description
 * # tableActionButton
 */
app
  .directive('tableActionButton', function () {
    return {
      restrict: 'C',
      template: '<div class="btn-group mb-20"> <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"> Single <span class="caret"></span> </button> <ul class="dropdown-menu" role="menu"> <li><a href="#">Action</a></li> <li><a href="#">Another action</a></li> <li><a href="#">Something else here</a></li> <li class="divider"></li> <li><a href="#">Separated link</a></li> </ul> </div>'
    };
  });
