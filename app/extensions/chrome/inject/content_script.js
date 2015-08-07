/**
 * Created by Enrico Giusti on 06/08/15.
 */

var switchPundit = function(on) {
    var bodyStyle = document.body.style;
    var cssTransform = 'transform' in bodyStyle ? 'transform' : 'webkitTransform';

    if (on) {
        if (document.getElementById('pundit2') !== null) {
            angular.element(document).trigger('Pundit2.show');
            return;
        }
        // Turn on.
        var b = document.getElementsByTagName('body')[0],
        div = document.createElement('div');

        bodyStyle[cssTransform] = 'translateY(' + 30 + ')';

        div.setAttribute('data-ng-app', "Pundit2");
        div.setAttribute('id', "pundit2");
        b.appendChild(div);

        // Boot angular app.
        angular.bootstrap(div, ['Pundit2']);
    }
    else {
        // Turn off.
        if (typeof angular !== 'undefined') {
            //angular.element('div[data-ng-app="Pundit2"]').remove();
            angular.element(document).trigger('Pundit2.hide');
        }
        //bodyStyle[cssTransform] = 'translateY(' - 30 + ')';
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.action) {
        case "switchOn":
            switchPundit(true);
            break;
        case "switchOff":
            switchPundit(false);
            break;
        case "requestAnnotationsNumber":
            if (angular) {
                angular.element(document).trigger('Pundit2.requestAnnotationsNumber');
            }
            break;
    }
});

document.addEventListener("Pundit2.updateAnnotationsNumber", function(evt){
    chrome.runtime.sendMessage({action: "updateAnnotationsNumber", number: evt.details}, function(response) {
        /*NO OP*/
    });
});

document.addEventListener("Pundit2.loading", function(evt){
    chrome.runtime.sendMessage({action: "setLoading", loading: evt.details}, function(response) {
        if (response.action === 'updateAnnotationsNumber') {
            angular.element(document).trigger('Pundit2.requestAnnotationsNumber');
        }
    });
});
