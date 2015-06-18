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

            scope.mode = 'date';
            scope.focus = 'year';

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
            };


            // console.log(scope.model);
        }
    };
});