(() => {
  function Customers(Restangular) {
    let customers = [{
      id: 0,
      meal_option: 'A',
      meal_used_at: null,
      extra_options: {
        vegetarian: true
      }
    }, {
      id: 1,
      meal_option: 'B',
      meal_used_at: null,
      extra_options: {}
    }, {
      id: 2,
      meal_option: 'A',
      meal_used_at: null,
      extra_options: {}
    }, {
      id: 3,
      meal_option: 'B',
      meal_used_at: new Date(),
      extra_options: {
        vegetarian: true
      }
    }];

    let resource = 'customers';

    let domainObject = Restangular.all('customers');

    domainObject.getOption = (customerId) => {
      return domainObject.one(customerId).customGET('option');
    };

    return domainObject;
  }


  Customers.$inject = [
    'Restangular'
  ];

  let dependencies = [
    'restangular'
  ];

  angular
    .module('starter.customers.service', dependencies)
    .factory('Customers', Customers);
})();