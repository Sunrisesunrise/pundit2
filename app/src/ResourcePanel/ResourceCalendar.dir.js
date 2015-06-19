angular.module('Pundit2.ResourcePanel')

.directive('resourceCalendar', function() {
    return {
        restrict: 'E',
        scope: {
            model: '=date'
        },
        templateUrl: "src/ResourcePanel/resourceCalendar.dir.tmpl.html",
        link: function(scope, element, attrs) {
            if (typeof(scope.model) === 'undefined') {
                scope.model = {};
            }

            scope.mode = 'day';
            scope.focus = 'year';

            scope.activeFocus = false;

            scope.year = {
                focus: false,
                editable: true
            };
            scope.month = {
                focus: false,
                editable: false
            };
            scope.day = {
                focus: false,
                editable: false
            };
            scope.time = {
                focus: false,
                editable: false
            };

            scope.switchFocus = function(focus) {
                scope.focus = focus;
            };

            // scope.model.value = new Date();
            // scope.model.valid = true;

            scope.switchMode = function(mode) {
                scope.mode = mode;
                scope.focus = mode;
            };

            scope.$watch('currentDate', function(value) {
                if (!scope.activeFocus && !isNaN(scope.currentDate)) {
                    switch (scope.mode) {
                        case 'month':
                            if (scope.focus === 'year') {
                                // if (isValidDate )
                                scope.switchFocus('month');
                            }
                            break;
                        case 'day':
                            if (scope.focus === 'year') {
                                scope.switchFocus('month');
                            } else if (scope.focus === 'month') {
                                scope.switchFocus('day')
                            }
                            break;
                        case 'time':
                            if (scope.focus === 'year') {
                                // if (isValidDate )
                                scope.switchFocus('month');
                            } else if (scope.focus === 'month') {
                                // if (isValidDate)
                                scope.switchFocus('day')
                            } else if (scope.focus === 'day') {
                                // if (isValidDate)
                                scope.switchFocus('time')
                            }
                            break;
                    }
                }
            });


            // console.log(scope.model);
        }
    };
});