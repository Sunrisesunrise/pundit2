angular.module('Pundit2.Core')

/**
 * @ngdoc directive
 * @name focusOn
 * @module Pundit2.Core
 * @description
 * directive for input focus
 */
.directive('focusOn', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind("blur", function(e) {
                $timeout(function() {
                    scope.$apply(attrs.focusOnChange + "=false");
                }, 0);
            });
            element.bind("focus", function(e) {
                $timeout(function() {
                    scope.$apply(attrs.focusOn);
                    scope.$apply(attrs.focusOnChange + "=true");
                }, 0);
            });
            scope.$watch(attrs.focusSet, function(value) {
                if (value) {
                    element[0].focus();
                }
            });

        }
    }
});