'use strict';

/* Controllers */

angular.module('app')
    .run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ])
    .controller('AppCtrl', ['$scope', '$localStorage', '$window', 'Auth', '$state', '$rootScope',
        function ($scope, $localStorage, $window, Auth, $state, $rootScope) {
            // add 'ie' classes to html
            var isIE = !! navigator.userAgent.match(/MSIE/i);
            isIE && angular.element($window.document.body).addClass('ie');
            isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

            // config
            $scope.app = {
                name: 'SquareDex',
                version: '1.0.0',
            }

            $scope.user = Auth.getUser();
            $scope.$on('fetchUserData', function (event, data) {
                $scope.user = Auth.getUser();
            });

            // // save settings to local storage
            // if (angular.isDefined($localStorage.settings)) {
            //     $scope.app.settings = $localStorage.settings;
            // } else {
            //     $localStorage.settings = $scope.app.settings;
            // }
            // $scope.$watch('app.settings', function () {
            //     if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
            //         // aside dock and fixed must set the header fixed.
            //         $scope.app.settings.headerFixed = true;
            //     }
            //     // save to local storage
            //     $localStorage.settings = $scope.app.settings;
            // }, true);

            $scope.logout = function () {
                Auth.logout();
                $state.go('access.login');
            }

            $scope.toggleSidebar = function() {
                $rootScope.showSidebar = !$rootScope.showSidebar;
            };

            function isSmartDevice($window) {
                // Adapted from http://www.detectmobilebrowsers.com
                var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            }

        }
    ]);
