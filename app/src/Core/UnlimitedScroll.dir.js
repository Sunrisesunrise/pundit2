angular.module('Pundit2.Core')
    /**
     * @ngdoc directive
     * @name unlimitedScroll
     * @module Pundit2.Core
     * @description
     * directive for infinite scrolling
     */
    .directive('unlimitedScroll', function() {
        return function(scope, elm, attr) {
            var raw = elm[0];
            elm.bind('scroll', function() {
                if (raw.scrollTop + raw.offsetHeight>= 0.9*raw.scrollHeight) {
                    scope.$apply(attr.unlimitedScroll);
                }
            });
        }
    });