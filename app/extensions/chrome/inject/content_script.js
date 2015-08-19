/**
 * Created by Enrico Giusti on 06/08/15.
 */

var switchPundit = function(on) {
    var bodyStyle = document.body.style;
    var cssTransform = 'transform' in bodyStyle ? 'transform' : 'webkitTransform';

    if (on) {
        if (document.getElementById('pundit2') !== null) {
            angular.element(document).trigger('Pundit2.show');
            angular.element(document).trigger('Pundit2.requestAnnotationsNumber');
            angular.element('span[text-fragment-bit]').addClass('pnd-cons');
            angular.element('span.pnd-text-fragment-icon').removeClass('pnd-text-fragment-icon-hidden');
            return;
        }
        // Turn on.
        var b = document.getElementsByTagName('body')[0],
            div = document.createElement('div'),
            preloadDiv = document.createElement('div');

        bodyStyle[cssTransform] = 'translateY(' + 30 + ')';
        bodyStyle.position = 'static';
        bodyStyle.marginTop = '30px';

        preloadDiv.setAttribute('id', "pundit2_preload");

        div.setAttribute('data-ng-app', "Pundit2");
        div.setAttribute('id', "pundit2");
        div.setAttribute('class', "pnd-wrp");
        b.appendChild(div);
        div.appendChild(preloadDiv);

        var innerHtml = '';
        innerHtml += '<div class="navbar navbar-inverse navbar-fixed-top pnd-toolbar-navbar pnd-ignore">';
        innerHtml += '  <div class="container-fluid pnd-toolbar-navbar-container">';
        innerHtml += '      <div class="pnd-toolbar-navbar-collapse">';
        innerHtml += '          <ul class="nav navbar-nav pnd-toolbar-navbar-left">';
        innerHtml += '              <li class="pnd-toolbar-user-button  pnd-toolbar-button-active">';
        innerHtml += '                  <a href="javascript:void(0)" id="pundit2_preload_message">';
        innerHtml += '                      Pundit is loading, please wait ...';
        innerHtml += '                  </a>';
        innerHtml += '              </li>';
        innerHtml += '          </ul> <!-- pnd-navbar-left -->';
        innerHtml += '      </div><!-- pnd-toolbar-navbar-collapse -->';
        innerHtml += '  </div><!-- pnd-toolbar-navbar-container -->';
        innerHtml += '</div><!-- navbar-inverse navbar-fixed-top -->';

        preloadDiv.innerHTML = innerHtml;

        chrome.runtime.sendMessage({action: "setLoading", loading: true});

        // Boot angular app.
        setTimeout(function() {
            angular.bootstrap(div, ['Pundit2']);
        }, 92);
    }
    else {
        // Turn off.
        if (typeof angular !== 'undefined') {
            //angular.element('div[data-ng-app="Pundit2"]').remove();
            angular.element(document).trigger('Pundit2.hide');
            angular.element('span[text-fragment-bit]').removeClass('pnd-cons');
            angular.element('span.pnd-text-fragment-icon').addClass('pnd-text-fragment-icon-hidden');
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
