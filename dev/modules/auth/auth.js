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
                url: '/auth-return',
                templateUrl: 'modules/auth/index.html',
                controller: 'SlackCtrl',
                // resolve: {
                //     leaderboard: ['API', function(API) {
                //         return API.all('leaderboard').getList();
                //     }]
                // }
            })
    }
])

.controller('SlackCtrl', ['$scope', '$rootScope', '$state', 'Notification', 'LocalService', 'Auth', '$stateParams',
    function($scope, $rootScope, $state, Notification, LocalService, Auth, $stateParams) {
        console.log($stateParams)
        
        $scope.userId = $stateParams.client_id;
        $scope.token = $stateParams.auth_token;
    }
]);