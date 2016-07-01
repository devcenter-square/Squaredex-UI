angular.module('ui.date', [])
    .factory('dateService', ['$stateParams', function($stateParams) {
        var range = {};
        return {
            calculate: function(from, to, period) {
                period = period || 'weekly';
                var allowed_periods = ['daily', 'weekly', 'monthly'];
                if (!_.contains(allowed_periods, period)) period = 'weekly';

                var today = moment();
                range = {
                    from: from || today.format('X'),
                    to: to || today.format('X'),
                    period: period
                }

                range.from = moment.unix(range.from);
                range.to = moment.unix(range.to);

                if (!moment(range.from).isValid()) range.from = today
                if (!moment(range.to).isValid()) range.to = today

                var period_format;
                switch (range.period) {
                    case 'daily':
                        period_format = 'day';
                        break;
                    case 'weekly':
                        period_format = 'week';
                        break;
                    case 'monthly':
                        period_format = 'month';
                        break;
                }

                range.from.startOf(period_format);
                range.to.endOf(period_format);

                return range
            },
            getParams: function(from, to, period) {
                var range = this.calculate(from, to, period);
                return {
                    from: range.from.format('X'),
                    to: range.to.format('X'),
                    period: range.period
                }
            },
            get: function() {
                return {
                    from: range.from,
                    to: range.to,
                    period: range.period
                }
            }
        }
    }])
    .directive('dateswitcher', ['$state', '$stateParams', 'dateService', function($state, $stateParams, dateService) {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="nav-tabs-alt inline w-full"><h4 class="font-bold pull-left title-sm"><a class="m-r-sm" ng-click="switchTo({prev: true})"><i class="icon-arrow-left"></i></a>{{rendered_date}}<a class="m-l-sm" ng-click="switchTo({next: true})" ng-class="{\'disabled\': !next_date}"><i class="icon-arrow-right"></i></a></h4><ul class="nav nav-tabs pull-right"> <li ng-click="filterDate(\'daily\')" ng-class="{\'active\': date_period == \'daily\'}"> <a> Daily </a> </li> <li ng-click="filterDate(null)" ng-class="{\'active\': date_period == \'weekly\'}"> <a> Weekly </a> </li> <li ng-click="filterDate(\'monthly\')" ng-class="{\'active\': date_period == \'monthly\'}"> <a> Monthly </a> </li> </ul></div>',
            link: function($scope, element, attrs, controller) {
                var date_range = dateService.get();
                var params = $stateParams;

                var render_format = 'MMM D';
                if (date_range.period == 'daily') {
                    $scope.rendered_date = date_range.to.format(render_format);
                } else {
                    $scope.rendered_date = date_range.from.format(render_format) + ' - ' + date_range.to.format(render_format);
                }

                $scope.next_date = date_range.to.isBefore(moment());
                $scope.date_period = date_range.period;

                $scope.switchTo = function(options) {
                    var period_format;
                    switch (date_range.period) {
                        case 'daily':
                            period_format = 'days';
                            break;
                        case 'weekly':
                            period_format = 'weeks';
                            break;
                        case 'monthly':
                            period_format = 'months';
                            break;
                    }

                    if (options.next) {
                        params.from = date_range.from.add(1, period_format).format('X');
                        params.to = date_range.to.add(1, period_format).format('X');
                    }

                    if (options.prev) {
                        params.from = date_range.from.subtract(1, period_format).format('X');
                        params.to = date_range.to.subtract(1, period_format).format('X');
                    }

                    reload();
                }

                $scope.filterDate = function(period) {
                    params.from = params.to = null;
                    params.period = period;
                    reload();
                }

                var reload = function() {
                    $state.transitionTo($state.current, params, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }
            }
        };
    }]);
