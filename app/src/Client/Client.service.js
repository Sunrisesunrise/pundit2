angular.module('Pundit2.Client')

.config(function($provide) {
    // This is useful to aviod url with hash modifications 
    $provide.decorator('$browser', function($delegate) {
        $delegate.onUrlChange = function() {};
        $delegate.url = function() {
            return '';
        };
        return $delegate;
    });
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