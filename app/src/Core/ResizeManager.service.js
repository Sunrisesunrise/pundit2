angular.module('Pundit2.Core')

.constant("RESIZEMANAGERDEFAULTS", {
    debug: false
})

.config(['resizeProvider', function(resizeProvider) {
    resizeProvider.throttle = 500;
}])

.service('ResizeManager', function(BaseComponent, EventDispatcher, resize, $timeout, $rootScope, RESIZEMANAGERDEFAULTS) {
    var resizeManager = new BaseComponent('ResizeManager', RESIZEMANAGERDEFAULTS);

    var firstTime = true;
    var timerPromise;

    $rootScope.$on('resize', function() {
        if (typeof timerPromise !== 'undefined') {
            $timeout.cancel(timerPromise);
        }

        timerPromise = $timeout(function() {
            if (firstTime === false) {
                EventDispatcher.sendEvent('ResizeManager.resize');
            } else {
                firstTime = false;
            }
            $timeout.cancel(timerPromise);
        }, 700);
    });

    resizeManager.log('Service running');

    return resizeManager;
});