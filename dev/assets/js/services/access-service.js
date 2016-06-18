angular.module('app.accessService', [])
  .constant('AccessLevel', {
    anon: 0,
    user: 1,
    admin: 2
  });