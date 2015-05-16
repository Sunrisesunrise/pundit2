angular.module('Pundit2.Vocabularies')

.service('SelectorsManager', function(BaseComponent, ItemsExchange, $injector, $q) {

    var selectorsManager = new BaseComponent('SelectorsManager');

    // registered selectors
    var selectors = {};
    // active selectors factory instances
    var selectorInstances = [];
    // object that contain the actual pending research
    // the key is the term searched and the value is an
    // array of promise. when all promise are resolve the
    // result of research is no longer necessary and the 
    // relative itemsExchange container is wiped
    var researching = {};

    // wipe and remove all items container that match str
    // a container match if contain in its name the passed string
    var wipeContainersByName = function(str) {
        selectorsManager.log('Wipe all containers that match ' + str);

        for (var j in selectorInstances) {
            var name = selectorInstances[j].config.container + str;
            ItemsExchange.wipeContainer(name);
        }
    };

    // term to search inside selectors
    // promise resolved when the result is no longer needed
    selectorsManager.getItems = function(term, promise) {

        if (typeof(term) === 'undefined') {
            return;
        }

        // a promise resolved when all selectors complete
        // the http query request
        var compleatedPromise = $q.defer(),
            pendingRequest = selectorInstances.length,
            // replace space with $ and use as container name
            // with selector instace container name
            termName = term.split(' ').join('$');

        if (typeof(researching[termName]) === 'undefined') {
            researching[termName] = [promise];
        } else {
            researching[termName].push(promise);
        }

        // when the promise is resolved no longer need the items
        promise.then(function() {
            var self = promise;
            // search the resolved promise
            var index = researching[termName].indexOf(self);

            if (index > -1) {
                // remove promise from the array
                researching[termName].splice(index, 1);
                // if we not have pending request wipe items and remove container
                if (researching[termName].length === 0) {
                    wipeContainersByName(termName);
                    delete researching[termName];
                }
            }
        });

        // get items from actives selectors
        for (var j in selectorInstances) {
            // selector always resolve the promise 
            // when http call return (even in case of error)
            selectorInstances[j].getItems(term).then(function() {
                pendingRequest--;
                if (pendingRequest <= 0 && compleatedPromise !== null) {
                    compleatedPromise.resolve();
                    compleatedPromise = null;
                }
            });
        }

        return compleatedPromise.promise;

    };

    // inject all selector factory then read config 
    // and instantiate the various instance of the selectors
    // when the init run others factory must to be call the "addSelector" method
    selectorsManager.init = function() {

        selectorInstances = [];

        for (var key in selectors) {

            // selector factory constructor
            var Factory = $injector.get(selectors[key].name);

            // initialize one selector instance
            // for each element in the array
            for (var j in selectors[key].options.instances) {
                var sel = new Factory(selectors[key].options.instances[j]);
                selectorInstances.push(sel);
            }
        }
        selectorsManager.log('Init, add selectors instances', selectorInstances);
    };

    // when the selector factory is load run this method
    // another component (client) should inject the singles selector factory 
    // to start the initialization process
    selectorsManager.addSelector = function(selector) {
        selectors[selector.name] = selector;
        selectorsManager.log("Add selector ", selector.name);
    };

    // return all active selectors instances
    selectorsManager.getActiveSelectors = function() {
        return selectorInstances;
    };

    return selectorsManager;

});