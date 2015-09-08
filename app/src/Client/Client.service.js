/*jshint -W051 */ //Only properties should be deleted

angular.module('Pundit2.Client')

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