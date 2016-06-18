angular.module('app.history', ['ui.router'])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
        .state('history', {
                abstract: true,
                url: '',
                templateUrl: 'components/layout/base.html',
        })
        .state('history.home', {
            url: '/history',
            templateUrl: 'modules/history/index.html',
            controller: 'HistoryCtrl',
        })
    }
])

.controller('HistoryCtrl', ['$state', '$scope', '$stateParams',  'API', 'Notification', 'ngDialog',
    function($state, $scope, $stateParams, API, Notification, ngDialog) {

    }
])


