'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:PagesSignupCtrl
 * @description
 * # PagesSignupCtrl
 * Controller of the minovateApp
 */
app
  .controller('SignupCtrl', function ($scope) {
    // function to submit the form after all validation has occurred
    $scope.submitForm = function(isValid) {
      console.log('validate form');

      // check to make sure the form is completely valid
      if (isValid) {
        console.log('our form is amazing');
      } else {
        console.log('form is invalid');
      }

    };
  });
