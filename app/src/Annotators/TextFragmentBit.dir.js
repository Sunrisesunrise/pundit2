angular.module('Pundit2.Annotators')

.directive('textFragmentBit', function(TextFragmentAnnotator) {
    return {
        restrict: 'A',
        scope: {
            fragments: '@'
        },
        link: function(scope, element /*, attrs */ ) {
                var numberOfTextFragments = scope.fragments.split(",").length;

                TextFragmentAnnotator.addFragmentBit(scope);

                element.addClass('pnd-textfragment-numbers-' + numberOfTextFragments);

                scope.isHigh = false;
                scope.high = function() {
                    element.addClass('pnd-textfragment-highlight');
                };
                scope.clear = function() {
                    element.removeClass('pnd-textfragment-highlight');
                };

                scope.hide = function() {
                    element.addClass('pnd-textfragment-hidden');
                };
                scope.show = function() {
                    element.removeClass('pnd-textfragment-hidden');
                };

                scope.ghost = function() {
                    element.addClass('pnd-textfragment-ghosted');
                };
                scope.expo = function() {
                    element.removeClass('pnd-textfragment-ghosted');
                };

            } // link()
    };
});