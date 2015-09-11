angular.module('Pundit2.Client')

.config(function($locationProvider) {
    // TODO: temporary fix: an error occurs if the server rewrites the base url,
    // there is a related open issue: https://github.com/angular/angular.js/issues/11091
    $locationProvider.html5Mode(false);
})

.run(function($injector, Config) {
    if (Config.isValid()) {
        if (Config.isModuleActive('Client')) {
            var client = $injector.get('Client');
            client.boot();
        }
    }
})

.service('Client', function(Config, $injector) {
    if (Config.clientMode === 'lite') {
        return $injector.get('ClientLite');
    } else {
        return $injector.get('ClientPro');
    }
});