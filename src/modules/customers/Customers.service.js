(() => {

  function Customers($q) {
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
    let counter = 0;

    let nextMealOption = () => {
      let i = counter % customers.length;
      counter++;
      return customers[i];
    };

    return {
      all() {
        return customers;
      },
      getOption() {
        let deferred = $q.defer();
        deferred.resolve(nextMealOption());
        return deferred.promise;
      }
    };
  }

  Customers.$inject = [
    '$q'
  ];

  let dependencies = [];

  angular
    .module('starter.customers.service', dependencies)
    .factory('Customers', Customers);
})();