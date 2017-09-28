!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angular 1.5.x is required' );
  
  angular.module( 'app' )
    .config( routeProvider );

  function routeProvider( $routeProvider ) {
    $routeProvider
      .when( '/user/form', {
        templateUrl: '../src/partials/user/user-form.html',
        controller: 'newUserController',
        controllerAs: 'vm'
      })
      .when( '/user/list', {
        templateUrl: '../src/partials/user/user-table.html',
        controller: 'listUserController',
        controllerAs: 'vm'
      })
      .when( '/user/settings/:_id', {
        templateUrl: '../src/partials/user/user-settings.html',
        controller: 'updateUserController',
        controllerAs: 'vm'
      })
      .when( '/user/settings/:_id/reset', {
        templateUrl: '../src/partials/user/user-settings-reset.html',
        controller: 'resetUserPasswordController',
        controllerAs: 'vm'
      })
      .when( '/news/form', {
        templateUrl: '../src/partials/news/news-form.html',
        controller: 'formNewsController',
        controllerAs: 'vm'
      })
      .when( '/news/list', {
        templateUrl: '../src/partials/news/news-table.html',
        controller: 'listNewsController',
        controllerAs: 'vm'
      })
      .when( '/news/list/preview/:_id', {
        templateUrl: '../src/partials/news/news-preview.html',
        controller: 'previewNewsController',
        controllerAs: 'vm'
      })
      .when( '/news/update/:_id', {
        templateUrl: '../src/partials/news/news-form.html',
        controller: 'formNewsController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})( angular );


