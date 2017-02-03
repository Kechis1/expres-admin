'use strict';

app
  .factory('NavInfo', function($resource) {
    return $resource('http://localhost:80/v1/app/nav', null, {
      query: {
        method: 'GET',
        isArray: false
      }
    });
  });

/**
 * @ngdoc function
 * @name minovateApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the minovateApp
 */
app
  .controller('NavCtrl', function ($scope, NavInfo) {
    $scope.oneAtATime = false;

    $scope.status = {
      isFirstOpen: true,
      isSecondOpen: true,
      isThirdOpen: true
    };

    $scope.info = NavInfo.get();

  });
