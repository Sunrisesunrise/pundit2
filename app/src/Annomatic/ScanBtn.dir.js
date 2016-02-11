angular.module('Pundit2.Annomatic')

.directive('scanBtn', function(Annomatic) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'src/Annomatic/ScanBtn.dir.tmpl.html',
        link: function(scope, element) {
            console.log('init');
            Annomatic.addScanBtnRef(scope);
        }, // link()
        replace: true
    };
});