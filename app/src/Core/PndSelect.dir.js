angular.module('Pundit2.Core')

.directive('pndSelect', function($timeout, $document) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            optionList: '=options',
            optionSelectedValue: '=selectedValue',
            expanded: '=expanded',
            deferredAction: '=deferredAction',
            labelAction: '=labelAction',
            titleAction: '=titleAction',
            placeholderAction: '=placeholderAction'
        },
        templateUrl: 'src/Core/Templates/pndSelect.dir.tmpl.html',
        link: function(scope, element) {
            var inputElement = element.find('.creation-input').eq(0),
                fncAction,
                hasMouseDownHandler = false;

            scope.optionAction = false;

            if (angular.isArray(scope.optionList) === false &&
                scope.optionList <= 0) {
                return;
            }

            if (typeof scope.deferredAction === 'function') {
                var label = scope.labelAction ? scope.labelAction : 'Default action',
                    title = scope.titleAction ? scope.titleAction : 'Default title';
                scope.optionAction = {
                    label: label,
                    title: title,
                    value: scope.deferredAction
                };
            }

            var findOption = function(value) {
                if (typeof value === 'undefined') {
                    value = scope.optionSelectedValue;
                }
                var res = scope.optionList[0];
                for (var i in scope.optionList) {
                    if (scope.optionList[i].value === value) {
                        return scope.optionList[i];
                    }
                }
                return res;
            };

            var mouseHandler = function(evt) {
                var target = angular.element(evt.target);
                if (target.closest('.pnd-select').length > 0) {
                    return;
                }
                scope.collapse();
                scope.$$phase || scope.$digest();
            };


            scope.optionSelectedValue = scope.optionSelectedValue ? scope.optionSelectedValue : scope.optionList[0].value;
            scope.optionSelected = findOption();
            scope.expanded = scope.expanded ? scope.expanded : false;
            scope.placeholderAction = scope.placeholderAction ? scope.placeholderAction : 'Default placeholder';
            scope.actionInProgress = false;
            scope.savingInProgress = false;

            scope.runAction = function(input) {
                scope.savingInProgress = true;
                fncAction(input).then(function(option) {
                    if (typeof option !== 'undefined') {
                        if (typeof option !== 'object') {
                            option = findOption(option);
                        }
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
                if (!hasMouseDownHandler) {
                    $document.on('mousedown', mouseHandler);
                    hasMouseDownHandler = true;
                }
            };

            scope.collapse = function() {
                scope.expanded = false;
                if (hasMouseDownHandler) {
                    $document.off('mousedown', mouseHandler);
                    hasMouseDownHandler = false;
                }
            };

            scope.toggleExpand = function() {
                if (scope.expanded) {
                    scope.collapse();
                }
                else {
                    scope.expand();
                }
            };

            scope.showAction = function() {
                scope.expanded = false;
                fncAction = scope.optionAction.value;
                scope.inputAction = '';
                scope.actionInProgress = true;
                $timeout(function() {
                    inputElement.focus();
                });
            };

            scope.selectOption = function(option) {
                scope.optionSelected = option;

                if (scope.expanded) {
                    scope.collapse();
                }
            };

            scope.isOptionSelected = function(option) {
                if (typeof(scope.optionSelected) === 'undefined') {
                    return;
                }
                return scope.optionSelected.value === option.value;
            };

            scope.$on('$destroy', function() {
                if (hasMouseDownHandler) {
                    $document.off('mousedown', mouseHandler);
                    hasMouseDownHandler = false;
                }
            });
        }
    };
});