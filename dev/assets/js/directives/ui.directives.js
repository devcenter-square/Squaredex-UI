angular.module('ui.directives', [])
    .config([
        '$compileProvider',
        function($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:application\//);
        }
    ])
    .directive('badge', function() {
        return {
            restrict: 'E',
            replace: true,
            template: '<span class="badge text-white text-capitalize" ng-class="label_class">{{status}}</span>',
            link: function($scope, element, attrs, controller) {
                $scope.status = attrs["status"] ? attrs["status"].toLowerCase() : "Unknown";
                $scope.label_class = attrs["class"] || "";

                var success_states = ['verified', 'paid', 'active', 'success', 'successful', 'subscribed', 'approved'];
                var failure_states = ['failed', 'unpaid', 'inactive', 'unverified', 'unsubscribed', 'expired'];

                if (_.contains(success_states, $scope.status)) {
                    $scope.label_class += " btn-success"
                } else if (_.contains(failure_states, $scope.status)) {
                    $scope.label_class += " btn-danger"
                } else {
                    $scope.label_class += " btn-info"
                }
            }
        };
    }).directive('avatar', function() {
        return {
            restrict: 'E',
            replace: true,
            template: '<span class="user-avatar" ng-style="style">{{initials}}</span>',
            link: function($scope, element, attrs, controller) {
                var colors = ['#3676C8', '#3676C8', '#2c3e50', '#27ae60', '#16a085'];
                var name = attrs["name"] || "--";
                if (name.length > 1) _name = name.split(" ")[0].charAt(0) + name.split(" ")[1].charAt(0);
                else _name = name.substring(0, 2);
                $scope.initials = _name;
                $scope.style = {
                    'background-color': _.sample(colors)
                };
            }
        };
    }).directive('ngLoading', [function() {
        //directive to show loading state
        return {
            restrict: 'AE',
            scope: true,
            compile: function(tElem, attrs) {
                //Add the controls to element
                tElem.addClass('loading-button');
                var buttonContent = tElem.html();
                tElem.html("<span class=\"default-state\">" + buttonContent + "</span>");
                tElem.append("<span class=\"loading-state loader\"><span class=\"dot dot1\"><\/span><span class=\"dot dot2\"><\/span><span class=\"dot dot3\"><\/span><span class=\"dot dot4\"><\/span><\/span><span class=\"loading-success\"><i class=\"fa fa-check animated fadeInUp\"><\/i><\/span><span class=\"loading-failure\"><i class=\"fa fa-times animated fadeInUp\"><\/i><\/span>");
                return function(scope, element, attrs) {
                    var watching;
                    var load = function(val) {
                        element.addClass('ng-loading');
                        element.attr('disabled', true);
                        watching = true;
                    };
                    scope.$on(attrs.ngLoading, function(event, val) {
                        if (!watching) return;
                        watching = false;
                        element.removeClass('ng-loading');
                        if (val === true) element.addClass('ng-loading-success');
                        else element.addClass('ng-loading-failure');
                        setTimeout(function() {
                            element.removeClass('ng-loading-success ng-loading-failure ng-loading');
                            element.attr('disabled', false);
                        }, 700);
                    });
                    element.on('click', function() {
                        element.addClass('ng-loading');
                        load();
                    });
                };
            }
        };
    }]).directive('focus', ['$timeout',
        function($timeout) {
            //directive to focus on on input
            return {
                scope: {
                    trigger: '@focus'
                },
                link: function(scope, element) {
                    scope.$watch('trigger', function(value) {
                        if (value === "true") {
                            $timeout(function() {
                                element[0].focus();
                            });
                        }
                    });
                }
            };
        }
    ]).directive('insertText', ['$rootScope', function($rootScope) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                scope.$on('insert-text', function(e, val) {
                    var domElement = element[0];
                    if (document.selection) {
                        domElement.focus();
                        var sel = document.selection.createRange();
                        sel.text = val;
                        domElement.focus();
                    } else if (domElement.selectionStart || domElement.selectionStart === 0) {
                        var startPos = domElement.selectionStart;
                        var endPos = domElement.selectionEnd;
                        var scrollTop = domElement.scrollTop;
                        domElement.value = domElement.value.substring(0, startPos) + val + domElement.value.substring(endPos, domElement.value.length);
                        domElement.focus();
                        domElement.selectionStart = startPos + val.length;
                        domElement.selectionEnd = startPos + val.length;
                        domElement.scrollTop = scrollTop;
                    } else {
                        domElement.value += val;
                        domElement.focus();
                    }

                    ngModel.$setViewValue(domElement.value);
                    ngModel.$render();
                });
            }
        };
    }])
    .directive('searchField', ['$state', '$stateParams', function($state, $stateParams) {
        return {
            restrict: 'A',
            compile: function(tElem, attrs) {
                return function(scope, element, attrs) {
                    var params = $stateParams;
                    element[0].value = params.search || "";

                    element.on('keypress', function(e) {
                        if (e.keyCode != 13) return;
                        params.search = element[0].value;
                        $state.transitionTo($state.current, params, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    });
                }
            }
        }
    }])
    .directive('variation', function() {
        return {
            restrict: 'E',
            replace: true,
            template: '<span class="m-l-sm"><small class="text-{{variation_value > 0 ? "success":"muted"}}" ng-if="variation_increase"><i class="fa fa-caret-up m-r-xs"></i>{{variation_value}}%</small><small class="text-danger" ng-if="!variation_increase"><i class="fa fa-caret-down m-r-xs"></i>{{variation_value}}%</small></span>',
            link: function($scope, element, attrs, controller) {
                variation_value = attrs["value"] || 0;
                if (isNaN(variation_value)) variation_value = 0;
                $scope.variation_value = variation_value;
                $scope.variation_increase = $scope.variation_value >= 0;
            }
        };
    }).directive('exportToCsv', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $timeout(function() {
                    var table = document.getElementById('export-table');
                    var csvString = '';
                    for (var i = 0; i < table.rows.length; i++) {
                        var rowData = table.rows[i].cells;
                        for (var j = 0; j < rowData.length; j++) {
                            csvString = csvString + rowData[j].innerHTML + ",";
                        }
                        csvString = csvString.substring(0, csvString.length - 1);
                        csvString = csvString + "\n";
                    }
                    csvString = csvString.substring(0, csvString.length - 1);
                    scope.csv_export = 'data:application/octet-stream;base64,' + btoa(csvString);
                });
            }
        }
    }]);
