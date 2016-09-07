angular.module('app.leaderboard', ['ui.router'])

.config(['$stateProvider', 'AccessLevel',
    function ($stateProvider, AccessLevel) {
        $stateProvider
            .state('leaderboard', {
                abstract: true,
                url: '',
                templateUrl: 'components/layout/base.html',
                role: AccessLevel.user
            })
            .state('leaderboard.home', {
                url: '/leaderboard',
                templateUrl: 'modules/leaderboard/index.html',
                controller: 'DashboardCtrl',
                role: AccessLevel.user,
                // resolve: {
                //     leaderboard: ['API', function(API) {
                //         return API.all('leaderboard').getList({});
                //     }]
                // }
            })
    }
])

.controller('DashboardCtrl', ['$scope', '$state', 'API', 'ngDialog', 'LocalService',
    function ($scope, $state, API, ngDialog, LocalService) {
        var credentials = angular.fromJson(LocalService.get('authToken'));
        console.log(credentials)

        // API.all('leaderboard').getList().then(function (response) {

        // })

        $scope.requestKarma = function() {
            // $scope.user = user;
            ngDialog.open({ 
                template: 'request-karma', 
                scope: $scope,
                controller: 'KarmaCtrl',
                resolve: {
                    user: function() {
                        return $scope.user;
                    },
                },
            });
        }
    }
])

.controller('KarmaCtrl', ['$scope', '$state', 'API', 'user', 'ngDialog',
    function ($scope, $state, API, user, ngDialog) {
        
    }
])