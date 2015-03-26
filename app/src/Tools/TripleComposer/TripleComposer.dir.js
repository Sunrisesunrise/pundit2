angular.module('Pundit2.TripleComposer')

.directive('tripleComposer', function(EventDispatcher) {
    return {
        restrict: 'E',
        scope: {
            name: '=tcName'
        },
        templateUrl: "src/Tools/TripleComposer/TripleComposer.dir.tmpl.html",
        controller: "TripleComposerCtrl"

    };
});