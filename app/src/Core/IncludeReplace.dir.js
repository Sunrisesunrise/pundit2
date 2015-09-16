angular.module('Pundit2.Core')

/**
 * @ngdoc directive
 * @name includeReplace
 * @module Pundit2.Core
 * @description
 * directive for replace the node content
 */
.directive('includeReplace', function() {
    return {
        require: 'ngInclude',
        link: function(scope, el, attrs) {
            el.replaceWith(el.children());
        }
    };
});