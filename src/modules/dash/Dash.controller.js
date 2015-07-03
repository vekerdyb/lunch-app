(() => {

  let errors = {
    NO_MEAL: "No meal found for customer for toady",
    BAD_CONNECTION: "Could not connect to server."
  };

  class DashController {

    constructor($scope, $timeout, $cordovaBarcodeScanner, Customers) {
      this.$timeout = $timeout;
      this.$cordovaBarcodeScanner = $cordovaBarcodeScanner;
      this.Customers = Customers;
      this.running = false;
      this.error = false;
      $scope.$on('$destroy', this.stopScanning.bind(this));
    }

    stopScanning() {
      this.$timeout.cancel(this.countdown);
      this.running = false;
    }

    startScanning() {
      this.running = true;
      this.mealOption = null;
      this.vegetarian = null;
      this.$cordovaBarcodeScanner
        .scan()
        .then(
        this.scanSuccess.bind(this),
        this.scanError.bind(this)
      );
    }

    setOption(customer) {
      console.log(customer);
      this.mealOption = customer.meal_option;
      this.vegetarian = customer.extra_options.vegetarian;
      this.usedAt = customer.meal_used_at;
    }

    optionError(error) {
      if (error.status === 404) {
        this.error = errors.NO_MEAL;
      } else {
        this.error = errors.BAD_CONNECTION;
      }
    }

    scanSuccess(barcodeData) {
      this.barcode = barcodeData;
      this.Customers.getOption(barcodeData.text).then(
        this.setOption.bind(this),
        this.optionError.bind(this)
      );

      this.countdown = this.$timeout(
        this.startScanning.bind(this),
        4000
      )
    }

    scanError(error) {
      console.error(error);
      this.running = false;
    }

  }


  DashController.$inject = [
    '$scope',
    '$timeout',
    '$cordovaBarcodeScanner',
    'Customers'
  ];

  let dependencies = [
    'ionic',
    'ngCordova',
    'starter.customers.service'
  ];

  angular
    .module('starter.dash.controller', dependencies)
    .controller('DashController', DashController);
})();
