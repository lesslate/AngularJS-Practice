(function ()
{
    'use strict';

    angular // AngularJS 기본 객체
        .module('app', [ 'ngRoute', 'ngCookies' ]) // 모듈이름, 참조하는 다른 모듈 배열
        .config(config) // 프로바이더의 초기화를 위한 함수
        .run(run); // 실행단계에서 실행되는 함수


    // 서비스 객체를 생산하는것이 프로바이더 객체
    config.$inject = [ '$routeProvider', '$locationProvider' ]; // 프로바이더 초기화를 위해 프로바이더 객체만 주입받음
    // $routeProvider 라우트 객체에 따른 연결 설정 정보 등록
    function config ($routeProvider, $locationProvider)
    {
        $routeProvider // config에서 Provider 설정 수행후 실행 단계에서 $route 실행됨
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

    // run은 실행 단계에 진입시 가장 먼저 호출되는데 초기화가 필요하다면 사용(서비스 객체만 주입가능)
    run.$inject = [ '$rootScope', '$location', '$cookies', '$http' ];
    function run ($rootScope, $location, $cookies, $http,)
    {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) //
        {
            $http.defaults.headers.common[ 'Authorization' ] = "Bearer " + $rootScope.globals.currentUser.authdata;
            // $http.get('http://localhost:3000/restricted')
            //     .then(function (response)
            //     {
            //         console.log("data : " + response.data.status)
            //     });
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current)
        {
            // 로그인 되지않았거나 해당되는 요소가 없을경우 -1 반환되어 true 가되어 로그인 페이지 redirect
            var restrictedPage = $.inArray($location.path(), [ '/login', '/register' ]) === -1;
            var loggedIn = $rootScope.globals.currentUser;

            if (restrictedPage && !loggedIn)
            { // login, register 외에 페이지나, 로그인 돼있지 않다면
                $location.path('/login');
            }
        });


    }

})();