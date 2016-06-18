angular.module('app.leaderboard', ['ui.router'])

.config(['$stateProvider', 'AccessLevel',
    function ($stateProvider, AccessLevel) {
        $stateProvider
            .state('leaderboard', {
                abstract: true,
                url: '',
                templateUrl: 'components/layout/base.html',
            })
            .state('leaderboard.home', {
                url: '/leaderboard',
                templateUrl: 'modules/leaderboard/index.html',
            })
    }
])

.controller('DashboardCtrl', ['$scope', '$state', 'API',
    function ($scope, $state, API) {
    }
]);