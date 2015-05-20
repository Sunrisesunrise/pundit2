angular.module('Pundit2.Core')
    .directive('unlimitedScroll', function() {
        return function(scope, elm, attr) {
            var raw = elm[0];
            console.log('ciao da scroll test');
            elm.bind('scroll', function() {
                if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                    scope.$apply(attr.unlimitedScroll);
                }
            });
        }
    });