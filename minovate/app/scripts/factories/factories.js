'use strict';

app
  .factory('DashboardInfo', function($resource) {
    return $resource('https://www.kominexpres.cz/v1/app/dashboard/:from/:to', null, {
      get: {
        headers: {
          'Authorization': 'Basic YWRtaW4ta29taW5leHByZXM6czBtM2NSQTJZcGEkJHcwUm2='
        },
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
      get: {
        headers: {
          'Authorization': 'Basic YWRtaW4ta29taW5leHByZXM6czBtM2NSQTJZcGEkJHcwUmQ='
        },
        method: 'GET',
        isArray: false
      }
    });
  })

  .factory('OrdersFactr', function($resource) {
    return $resource('https://www.kominexpres.cz/v1/app/orders', null, {
      get: {
        method: 'GET',
        headers: {
          'Authorization': 'Basic YWRtaW4ta29taW5leHByZXM6czBtM2NSQTJZcGEkJHcwUmQ='
        },
        isArray: false
      },
      put: {
        headers: {
          'Content-Type':'application/json; charset=UTF-8',
          'Authorization': 'Basic YWRtaW4ta29taW5leHByZXM6czBtM2NSQTJZcGEkJHcwUmQ='
        },
        method: 'PUT',
        isArray: false
      }
    });
  });
