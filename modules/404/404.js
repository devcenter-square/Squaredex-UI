angular.module('app.404',['ui.router'])

.config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.state('404', {
            url: '/404',
            templateUrl: 'modules/404/index.html'
        })
	}
])
