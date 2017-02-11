'use strict';

app
  .factory('DashboardInfo', function($resource) {
    return $resource('https://www.kominexpres.cz/v1/app/dashboard/:from/:to', null, {
      query: {
        params: {
          from: '@from',
          to: '@to'
        },
        method: 'GET',
        isArray: false
      }
    });
  })

  .factory('NavInfo', function($resource) {
    return $resource('https://www.kominexpres.cz/v1/app/nav', null, {
      query: {
        method: 'GET',
        isArray: false
      }
    });
  })

  .factory('OrdersList', function($resource) {
    return $resource('https://www.kominexpres.cz/v1/app/orders', null, {
      query: {
        method: 'GET',
        isArray: false
      }
    });
  });
