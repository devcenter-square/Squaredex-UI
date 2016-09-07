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
                    return LocalService.get('authToken');
                    
                },
                login: function (credentials) {
                    var deferred = $q.defer();
                    LocalService.set('authToken', JSON.stringify(credentials));
                    console.log(credentials);
                    deferred.resolve(credentials);
                    return deferred.promise;
                },
                logout: function () {
                    // The backend doesn't care about logouts, delete the token and you're good to go.
                    LocalService.unset('authToken');
                },
                getUser: function () {
                    if (LocalService.get('authToken')) {
                        // console.log(LocalService.get('authToken'))
                        return angular.fromJson(LocalService.get('authToken')).uid;
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
                    if (LocalService.get('authToken')) {
                        token = angular.fromJson(LocalService.get('authToken')).auth_token;
                    }
                    if (token) {
                        config.headers.Authorization = 'Bearer ' + token;
                    }
                    return config;
                },
                responseError: function (response) {
                    if (response.status === 401 || response.status === 403) {
                        LocalService.unset('authToken');
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
