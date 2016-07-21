angular.module('app.access', ['ui.router'])

.config(['$stateProvider', 'AccessLevel',
    function($stateProvider, AccessLevel) {
        $stateProvider
        .state('access', {
            url: '/access',
            abstract: true,
            templateUrl: 'modules/access/base.html',
        }).state('access.login', {
            url: '/login',
            templateUrl: 'modules/access/login.html',
            controller: 'LoginCtrl',
            role: {
                    access: AccessLevel.anon
            },
        });
    }
])

.controller('LoginCtrl', ['$scope', '$rootScope', '$state', 'Notification', 'LocalService', 'Auth',
    function($scope, $rootScope, $state, Notification, LocalService, Auth) {

        $scope.login = function() {
            Notification.clear();
            Auth.login()
            .then(function(resp) {
                // console.log(resp)
                $scope.$emit('fetchUserData', 'true');
                $state.go('leaderboard.home');
            })
            .catch(function(error) {
                console.log(error)
                $scope.$broadcast('loggedIn', false);
                var title = error.data.response.message || "Could not login. Please try again";
                Notification.error(title, error);
            });
        };
    }
])

