angular.module('Pundit2.Core')

.directive('pndSelect', function($timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            optionList: '=options',
            optionSelected: '=selected',
            expanded: '=expanded',
            deferredAction: '=deferredAction',
            labelAction: '=labelAction',
            titleAction: '=titleAction'
        },
        templateUrl: 'src/Core/Templates/select.dir.tmpl.html',
        link: function(scope, element) {
            var fncAction;

            if (angular.isArray(scope.optionList) === false &&
                scope.optionList <= 0) {
                return;
            }

            if (typeof scope.deferredAction === 'function') {
                var label = scope.labelAction ? scope.labelAction : 'Default action',
                    title = scope.titleAction ? scope.titleAction : 'Default placeholder';
                scope.optionList.push({
                    label: label,
                    title: '',
                    value: scope.deferredAction
                });
                scope.placeholderAction = title;
            }

            scope.optionSelected = scope.optionSelected ? scope.optionSelected : scope.optionList[0];
            scope.expanded = scope.expanded ? scope.expanded : false;
            scope.actionInProgress = false;
            scope.savingInProgress = false;

            var setAction = function(option) {
                fncAction = option.value;
                scope.inputAction = '';
                scope.actionInProgress = true;
                $timeout(function() {
                    element.find('.creation-input')[0].focus();
                });
            };

            scope.runAction = function(input) {
                scope.savingInProgress = true;
                fncAction(input).then(function(option) {
                    if (typeof option !== 'undefined') {
                        var actionRef = scope.optionList.pop();
                        scope.optionList.push(option);
                        scope.optionList.push(actionRef);
                        scope.optionSelected = option;
                    }
                    scope.actionInProgress = false;
                    scope.savingInProgress = false;
                }, function() {
                    // TODO: handle errors during noteebook save, maybe Alert System is enough ?
                    scope.actionInProgress = false;
                    scope.savingInProgress = false;
                });
            };

            scope.abortAction = function() {
                scope.actionInProgress = false;
            };

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
                    setAction(option);
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