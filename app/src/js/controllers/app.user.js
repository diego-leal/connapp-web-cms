!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angular 1.5.x is required' );

  'use strict';
  angular.module( 'app' )
    .controller(  'newUserController', newUser  )
    .controller( 'listUserController', listUser )
    .controller( 'updateUserController', updateUserController )
    .controller( 'resetUserPasswordController', resetUserPasswordController );
  
  /**
  * Controller para criar novos usuários
  * @memberof app.user
  */
  function newUser( $log, $scope, $location, userResource) {
    const vm = this;
    
    // ===# View Model #=== //
    vm.user = {};
    vm.submitForm = submitForm;

    function submitForm( user ) {
      if ( $scope.userForm.$invalid ) return vm.formSubmitted = true;

      userResource.save( user )
        .then( () => {
          $location.path( '/user/list' );
        })
        .catch( $log.error );
    }
  }
  /**
   * 
   */
  function updateUserController( $scope, $log, $routeParams, userResource ) {
    const
      vm = this,
      { _id } = $routeParams;
    
    // ===# View Model #=== //
    vm.user = {};
    vm.submitChanges = submitChanges;

    // ===# Carga inicial #=== //
    vm.user = userResource.get( _id );

    /**
     * 
     * @param {Object} user 
     */
    function submitChanges( user ) {
      if ( $scope.userChanges.$invalid ) return vm.formSubmitted = true;

      userResource.update( user )
        .then( $log.info )
        .catch( $log.error );
    }
  }
  /**
   * 
   */
  function resetUserPasswordController( $log, $scope, $routeParams, $timeout, userResource ) {
    const vm = this;

    // ===# View Models #=== //
    vm.user = {};
    vm.user._id = $routeParams._id;
    vm.submitChanges = submitChanges;
    vm.comparePasswordFields = comparePasswordFields;

    // ===# Set form validation # === //
    $timeout( () => {
      $scope.resetPassword.confirmPassword.$validators.isEqual = comparePasswordFields;
    });
    
    function comparePasswordFields( modelValue, viewValue ) {
      const password = modelValue || viewValue;
      return password === vm.user.password;
    }

    // ===# Setup #=== //
    function submitChanges( user ) {
      if ( $scope.resetPassword.$invalid ) return;

      userResource.update( user )
        .then( $log.info )
        .catch( $log.error );
    }

  }
  /**
   * Controller para listar todos os usuários ativos.
   * @memberof app.user
   */
  function listUser( $log, $location, userResource ) {
    const 
      vm = this,
      user = {};
    
    // ===# View models #=== //
    vm.orderBy = 'firstName';
    vm.setCurrentUser = setCurrentUser;
    vm.redirectToForm = redirectToForm;

    // ===# Carga inicial #=== //
    vm.users = userResource.query();

    /**
     * Função define um usuário global.
     * @type {Function}
     * @param {Object} user
     */
    function setCurrentUser( _user ) {
      angular.merge( user, _user );
    }
    /**
     * Função retorna um usuário
     * @type {Function}
     * @private
     * @return {Object} vm.user
     */
    function getCurrentUser() {
      return user;
    }
    /**
     * Função redireciona para o formulário de usuários.
     * @type {Function} 
     */
    function redirectToForm() {
      const { _id } = getCurrentUser();
      $location.path( `/user/form/${ _id }` );
    }
  }

})( angular );

