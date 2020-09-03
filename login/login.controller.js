(function ()
{
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = [ '$http', '$location', 'AuthenticationService', 'FlashService' ];
    function LoginController ($http, $location, AuthenticationService, FlashService)
    {
        var vm = this;

        vm.login = login;

        (function initController ()
        {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login ()
        {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response)
            {
                if (response.data.token)
                {
                    AuthenticationService.SetCredentials(vm.username, vm.password, response.data.token);
                    $location.path('/');
                } else
                {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
