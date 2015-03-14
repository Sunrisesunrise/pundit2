angular.module('Pundit2.Annomatic')

.service('NameEntityRecognitionResource', function($resource, Config) {

    // TODO: find a better way to set a dynamic url in $resource
    var baseURL = Config.modules.Annomatic.sourceURL;
    console.log(baseURL);

    return $resource(baseURL, {}, {
        getAnnotations: {
            // params: {},
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function(obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        }
    });

});