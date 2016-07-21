angular.module('app.authService', [])
    .factory('Auth', ['$http', 'LocalService', 'Restangular', '$q', 'AccessLevel',
        function ($http, LocalService, Restangular, $q, AccessLevel) {
            return {
                 authorize: function (access) {
                    if (access === AccessLevel.user) {
                        return this.isAuthenticated();
                    } else {
                        return true;
                    }
                },
                isAuthenticated: function () {
                    return LocalService.get('auth_token');
                    
                },
                login: function () {
                    var deferred = $q.defer();
                    var userData = {
                        "token" : "lB7zIJmudd_iwbSv1-oBMQ",
                        "client_id" : "SS66i3uDHrKOYALbeoKHEA",
                        "expiry" : "1468705674",
                        "uid" : "U0G7M5M9S"
                    }
                    LocalService.set('auth_token', JSON.stringify(userData));
                    deferred.resolve(userData);
                    return deferred.promise;
                },
                logout: function () {
                    // The backend doesn't care about logouts, delete the token and you're good to go.
                    LocalService.unset('auth_token');
                },
                getUser: function () {
                    if (LocalService.get('auth_token')) {
                        return angular.fromJson(LocalService.get('auth_token')).uid;
                    } else {
                        return false;
                    }
                }
            }
        }
    ])
    .factory('AuthInterceptor', ['$q', '$injector', 'LocalService',
        function ($q, $injector, LocalService) {
            return {
                request: function (config) {
                    var token;
                    if (LocalService.get('auth_token')) {
                        token = angular.fromJson(LocalService.get('auth_token')).token;
                        // console.log(token)
                    }
                    if (token) {
                        config.headers = 'Bearer ' + token;
                    }
                    return config;
                },
                responseError: function (response) {
                    if (response.status === 401 || response.status === 403) {
                        LocalService.unset('auth_token');
                        $injector.get('$state').go('access.login');
                    }
                    return $q.reject(response);
                }
            }
        }
    ])
    .config(['$httpProvider',
        function ($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
        }
    ]);
