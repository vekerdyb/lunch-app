(() => {

  class DashController {

    constructor($scope, $timeout, $cordovaBarcodeScanner) {
      this.$scope = $scope;
      this.$timeout = $timeout;
      this.$cordovaBarcodeScanner = $cordovaBarcodeScanner;
      ionic.Platform.ready(this.startScanning.bind(this));
    }

    startScanning() {
      this.$cordovaBarcodeScanner
        .scan()
        .then(
        this.scanSuccess.bind(this),
        this.scanError.bind(this)
      );
    }

    scanSuccess(barcodeData) {
      console.log(barcodeData);
      this.barcode = barcodeData;
      this.$timeout(
        this.startScanning.bind(this),
        2000
      )
    }

    scanError(error) {
      console.error(error);
    }

  }


  DashController.$inject = [
    '$scope',
    '$timeout',
    '$cordovaBarcodeScanner',
  ];

  let dependencies = [
    'ionic',
    'ngCordova'
  ];

  angular
    .module('starter.dash.controller', dependencies)
    .controller('DashController', DashController);
})();
