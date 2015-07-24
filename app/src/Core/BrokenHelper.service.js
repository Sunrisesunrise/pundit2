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
    };

    brokenHelper.resetQueques = function() {
        brokenAnnotationsQueque = [];
        fixedAnnotationsQueque = [];
    };    

    brokenHelper.getBrokenAnnotations = function() {
        return brokenAnnotationsQueque;
    };

    brokenHelper.getFixedAnnotations = function() {
        return fixedAnnotationsQueque;
    };

    return brokenHelper;
});