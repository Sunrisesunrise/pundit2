angular.module('Pundit2.TripleComposer')

.directive('tripleComposer', function(/*EventDispatcher, TripleComposer*/) {
    return {
        restrict: 'E',
        scope: {
            name: '=tcName'
        },
        templateUrl: "src/Tools/TripleComposer/TripleComposer.dir.tmpl.html",
        controller: "TripleComposerCtrl",
        link: function (scope, element/* attr, transclusion*/) {
            element.on('$destroy', function() {
                scope.removeEventListeners();
            });
        }

    };
});