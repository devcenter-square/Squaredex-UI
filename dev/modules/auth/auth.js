angular.module('app.auth', ['ui.router'])

.config(['$stateProvider', 'AccessLevel',
    function ($stateProvider, AccessLevel) {
        $stateProvider
            .state('auth', {
                abstract: true,
                url: '',
                templateUrl: 'components/layout/base.html',
            })
            .state('auth.home', {
                url: '/auth-return?auth_token&client_id&expiry&uid',
                templateUrl: 'modules/auth/index.html',
                controller: 'SlackCtrl',
            })
    }
])

.controller('SlackCtrl', ['$scope', '$rootScope', '$state', 'Notification', 'LocalService', 'Auth', '$stateParams',
    function($scope, $rootScope, $state, Notification, LocalService, Auth, $stateParams) {

        console.log($stateParams)
        var credentials = $stateParams;
        
       	$scope.login = function() {
            Auth.login(credentials)
                .then(function(resp) {
                    // $scope.$emit('fetchUserData', 'true');
                    $state.go('leaderboard.home');
                })
                .catch(function(error) {
                    console.log(error)
                    $scope.$broadcast('loggedIn', false);
                    var title = error.data.response.message || "Could not login. Please try again";
                    Notification.error(title, error);
                });
        };

        $scope.login();
    }
]);