(() => {

  let DashRouting = ($stateProvider) => {
    $stateProvider
      .state('dash', {
        parent: 'tab',
        url: '/dash',
        views: {
          'menuContent': {
            templateUrl: 'modules/dash/Dash.html',
            controller: 'DashController as dash'
          }
        }
      })
      .state('preview', {
        parent: 'tab',
        url: '/preview',
        views: {
          'menuContent': {
            templateUrl: 'modules/dash/Preview.html'
          }
        }
      })
    ;
  };

  DashRouting.$inject = ['$stateProvider'];
  let dependencies = [
    'ionic'
  ];

  angular.module('starter.dash.routing', dependencies)
    .config(DashRouting)
})();
