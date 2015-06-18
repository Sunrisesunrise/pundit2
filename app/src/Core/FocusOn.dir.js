angular.module('Pundit2.Core')

/**
 * @ngdoc directive
 * @name focusOn
 * @module Pundit2.Core
 * @description
 * directive for infinite scrolling
 */
.directive('focusOn', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope.$watch(attrs.focusOn, function(value) {
                if (value) {
                    element[0].focus();
                }
            });
            element.bind("blur", function(e) {
                $timeout(function() {
                    scope.$apply(attrs.focusOn + "=false");
                }, 0);
            });
            element.bind("focus", function(e) {
                $timeout(function() {
                    scope.$apply(attrs.focusOn + "=true");
                }, 0);
            })
        }
    }
});