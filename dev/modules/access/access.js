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
        }).state('access.auth', {
            url: '/auth-return?auth_token&client_id&config&expiry',
            templateUrl: '',
            controller: 'SlackCtrl',
            role: {
                    access: AccessLevel.anon
            },
        });
    }
])

.controller('LoginCtrl', ['$scope', '$rootScope', '$state', 'Notification', 'LocalService', 'Auth',
    function($scope, $rootScope, $state, Notification, LocalService, Auth) {
        $scope.credentials = {};

        $scope.login = function() {
            
        };
    }
])

.controller('SlackCtrl', ['$scope', '$rootScope', '$state', 'Notification', 'LocalService', 'Auth', '$stateParams',
    function($scope, $rootScope, $state, Notification, LocalService, Auth, $stateParams) {

        $scope.userId = $stateParams.client_id;
        $scope.token = $stateParams.auth_token;
        console.log($stateParams)
    }
]);
