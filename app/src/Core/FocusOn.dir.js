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
            element.bind("blur", function(e) {
                $timeout(function() {
                    scope.$apply(attrs.focus + "=false");
                }, 0);
            });
            element.bind("focus", function(e) {
                $timeout(function() {
                    scope.$apply(attrs.focusOn);
                    scope.$apply(attrs.focus + "=true");
                }, 0);
            })
        }
    }
});