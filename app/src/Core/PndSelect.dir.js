angular.module('Pundit2.Core')

.directive('pndSelect', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            optionList: '=options',
            optionSelected: '=selected',
            expanded: '=expanded',
            action: '=action',
            actionLabel: '=actionLabel'
        },
        templateUrl: 'src/Core/Templates/select.dir.tmpl.html',
        link: function(scope) {
            if (angular.isArray(scope.optionList) === false && 
                scope.optionList <= 0) {
                return;
            }

            if (typeof scope.action === 'function') {
                var label = scope.actionLabel ? scope.actionLabel : 'Default action';
                scope.optionList.push({
                    label: label,
                    title: label,
                    value: scope.action
                })
            }

            scope.optionSelected = scope.optionSelected ? scope.optionSelected : scope.optionList[0];
            scope.expanded = scope.expanded ? scope.expanded : false;

            scope.expand = function() {
                scope.expanded = true;
            };

            scope.collapse = function() {
                scope.expanded = false;
            };

            scope.toggleExpand = function() {
                scope.expanded = !scope.expanded;
            };

            scope.selectOption = function(option) {
                if (typeof option.value === 'function') {
                    console.log('tada');
                    option.value();
                } else {
                    scope.optionSelected = option;
                }

                if (scope.expanded) {
                    scope.toggleExpand();
                }
            };

            scope.isOptionSelected = function(option) {
                if (typeof(scope.optionSelected) === 'undefined') {
                    return;
                }
                return scope.optionSelected.value === option.value;
            };
        }
    };
});