angular.module('app.notificationService', ['toaster'])
    .factory('Notification', ['toaster', function(toaster) {
        return {
            pop: function(options) {
                toaster.pop(options);
            },
            success: function(title, body) {
                toaster.pop({
                    type: 'success',
                    title: title || "Action completed succesfully",
                    body: body
                });
            },
            error: function(title, error) {
                var message;
                var multiple_errors;

                if (error.data) {
                    var error_list = error.data.errors;
                    if (error_list) {
                        if (_.isObject(error_list)) {
                            multiple_errors = error_list.full_messages || [];
                        } else {
                            message = error_list[0];
                        }
                    } else if (error.data.error) {
                        message = error.data.error;
                    }
                } else if (error.errors) {
                    message = error.errors[0];
                } else if (typeof error == 'string') {
                    message = error;
                } else {
                    message = error.statusText || "Could not connect to the server. Please check your connection and try again";
                }

                if (multiple_errors) {
                    _.each(multiple_errors, function(error) {
                        toaster.pop({
                            type: 'error',
                            title: error
                        });
                    })
                } else {
                    toaster.pop({
                        type: 'error',
                        title: title || "Action could not be perfomed",
                        body: message
                    });
                }
            },
            clear: function() {
                toaster.clear();
            }
        };
    }]);
