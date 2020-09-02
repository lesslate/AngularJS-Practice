(function ()
{
        'use strict';

        angular
                .module('app')
                .factory('UserService', UserService); // factory는 서비스 객체를 제공하는 함수

        UserService.$inject = [ '$http' ];
        function UserService ($http)
        {

                var service = {};

                service.GetAll = GetAll;
                service.GetById = GetById;
                service.GetByUsername = GetByUsername;
                service.Create = Create;
                service.Update = Update;
                service.Delete = Delete;

                return service; // 서비스 객체 리턴

                function GetAll ()
                {
                        return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
                }

                function GetById (id)
                {
                        return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
                }

                function GetByUsername (username)
                {
                        return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
                }

                function Create (user)
                {
                        return $http({
                                url: 'http://localhost/angularjs-mysql/server.php',
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                data: user
                        }).then(function (response)
                        {
                                console.log(response.data);
                        })
                        //then(handleSuccess, handleError('Error creating user'));
                        //return $http.post('http://localhost/angularjs-mysql/server.php', user).then(handleSuccess, handleError('Error creating user'));
                }

                function Update (user)
                {
                        return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
                }

                function Delete (id)
                {
                        return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
                }

                // private functions

                function handleSuccess (res)
                {
                        console.log("handleSuccess Return " + res);
                        return res.data;
                }

                function handleError (error)
                {
                        return function ()
                        {
                                return { success: false, message: error };
                        };
                }
        }

})();
