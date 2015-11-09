angular.module('Pundit2.FragmentPopover')

.service('FragmentPopover', function(BaseComponent, PndPopover) {
    var fragmentPopover = new BaseComponent('FragmentPopover');

    fragmentPopover.show = function(x, y, data) {
        var options = {
            templateUrl: 'src/FragmentPopover/FragmentPopover.tmpl.html',
            controller: 'FragmentPopoverCtrl',
            placement: 'bottom',
            lockPageScroll: true,
            needsValidSelection: false,
            scopeData: {
                annotations: [],
                hasLink: false
            }
        };
        for (var annId in data.annotations) {
            var ann = data.annotations[annId];
            options.scopeData.annotations.push({
                id: annId,
                entities: ann.entities,
                description: ann.firstConsolidableItem.description
            });
        }
        if (typeof data.link !== 'undefined') {
            options.scopeData.hasLink = true;
            options.scopeData.link = {
                url: data.link.url,
                target: data.link.target,
                title: data.link.element.text()
            };
        }

        var promise = PndPopover.show(x, y, options, data);
        if (promise !== false) {
            promise.then(function() {
                //PndPopover.getState().selection.removeAllRanges();
            }, function() {
                console.log(arguments);
            });
        }
        return promise;
    };

    return fragmentPopover;
});