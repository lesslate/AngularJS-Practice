(function ()
{
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController); //컨트롤러이름, 실행함수

    // 서비스 객체만 주입
    RegisterController.$inject = [ 'UserService', '$location', '$rootScope', 'FlashService' ];
    function RegisterController (UserService, $location, $rootScope, FlashService)
    {
        var vm = this;

        vm.register = register;

        function register ()
        {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response)
                {
                    if (response.success)
                    {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else
                    {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
