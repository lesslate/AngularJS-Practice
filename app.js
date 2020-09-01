(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    // $routeProvider 라우트 객체에 따른 연결 설정 정보 등록
    function config($routeProvider, $locationProvider) {  
        $routeProvider
            .when('/', {
                controller: 'HomeController',   // 컨트롤러 함수명
                templateUrl: 'home/home.view.html', // ng-view가 사용할 템플릿요청 url
                controllerAs: 'vm'  // 컨트롤러 이름 지정
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1; // 해당되는 요소가 없을경우 -1 반환되어 true
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) { // login, register 외에 페이지, 로그인 되있지 않다면
                $location.path('/login');
            }
        });
    }

})();