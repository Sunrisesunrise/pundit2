angular.module('Pundit2.Core')

.service('Utils', function() {
    var utils = {};

    utils.deepExtend = function(destination, source) {
        for (var property in source) {
            if (source[property] && source[property].constructor && source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                arguments.callee(destination[property], source[property]);
            } else {
                destination[property] = angular.copy(source[property]);
            }
        }
        return destination;

        // N.B. in this deepExtend the destination property could be overwritten
        // by the source propery, so angular.merge can't be used here
        // return angular.merge(destination, source);
    };

    utils.getLabelFromURI = function(uri) {
        var label;

        // Freebase custom labels
        if (uri.match("http://www.freebase.com/schema/")) {
            label = uri
                .substring(31)
                .replace(/\//g, ': ')
                .replace(/_/g, ' ');
            return label;
        }

        // DBPedia custom labels
        // Special case for DBPedia Types
        if (uri.match("http://dbpedia.org/ontology/")) {
            label = uri
                .substring(28)
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, function(str) {
                    return str.toUpperCase();
                });
            return label;
        }

        // All other label types, take the last part
        label = uri.substring(uri.lastIndexOf('/') + 1);
        if (label.indexOf('#') !== -1) {
            label = label.substring(label.lastIndexOf('#') + 1);
        }

        return label;
    };

    utils.isValidDate = function(strDate) {
        if (typeof(strDate) !== 'string') {
            return;
        }

        var t = strDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (t !== null) {
            var d = +t[3],
                m = +t[2],
                y = +t[1];
            var date = new Date(y, m - 1, d);
            if (date.getFullYear() === y && date.getMonth() === m - 1) {
                return true;
            }
        }
        return false;
    };

    utils.generateUID = function(separator) {
        separator = separator || "-";

        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + separator + S4() + separator + S4() + separator + S4() + separator + S4() + S4() + S4());
    };

    return utils;
});