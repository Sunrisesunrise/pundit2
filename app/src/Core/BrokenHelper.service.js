angular.module('Pundit2.Core')

.constant("BROKENHELPERDEFAULTS", {
    debug: false
})

.service('BrokenHelper', function(BaseComponent, EventDispatcher, BROKENHELPERDEFAULTS) {

    var brokenHelper = new BaseComponent('BrokenHelper', BROKENHELPERDEFAULTS);

    var brokenAnnotationsQueque = [];
    var fixedAnnotationsQueque = [];

    brokenHelper.addAnnotation = function(id, broken) {
        if (broken) {
            brokenAnnotationsQueque.push(id);
        } else {
            fixedAnnotationsQueque.push(id);
        }

        brokenHelper.log('Added annotation ' + id + ' with broken value: ' + broken);
    };

    brokenHelper.resetQueques = function() {
        brokenAnnotationsQueque = [];
        fixedAnnotationsQueque = [];
    };

    brokenHelper.resetBrokenQueque = function() {
        brokenAnnotationsQueque = [];
    };

    brokenHelper.resetFixedQueque = function() {
        fixedAnnotationsQueque = [];
    };

    brokenHelper.getBrokenAnnotations = function() {
        return brokenAnnotationsQueque;
    };

    brokenHelper.getFixedAnnotations = function() {
        return fixedAnnotationsQueque;
    };

    brokenHelper.sendQueques = function() {
        if (brokenAnnotationsQueque.length > 0) {
            EventDispatcher.sendEvent('BrokenHelper.sendBroken', brokenAnnotationsQueque).then(function() {
                brokenHelper.log('Annotations ' + brokenAnnotationsQueque + ' set broken on the server');
                brokenAnnotationsQueque = [];
            }, function() {
                brokenHelper.err('Something wrong with broken annotations');
            });
        }
        if (fixedAnnotationsQueque.length > 0) {
            EventDispatcher.sendEvent('BrokenHelper.sendFixed', fixedAnnotationsQueque).then(function() {
                brokenHelper.log('Annotations ' + fixedAnnotationsQueque + ' set fixed on the server');
                fixedAnnotationsQueque = [];
            }, function() {
                brokenHelper.err('Something wrong with fixed annotations');
            });;
        }
    };

    return brokenHelper;
});