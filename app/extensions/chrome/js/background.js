/**
 *  Handle the browser action that get's executed if the user pushes
 *  the toolbar icon in Chrome
 */


chrome.browserAction.onClicked.addListener(function(tab, url) {

    // chrome.browserAction.setIcon({
    //     path: {
    //         19: chrome.extension.getURL("icons/close-icon19.png")
    //     }
    // }) 

    executeScriptFromURLInTab(tab, 'inject/init.js');


    executeCSSFromURLInTab(tab, 'inject/css/pundit.css');

    executeScriptFromURLInTab(tab, 'inject/extension_conf.js');
    executeScriptFromURLInTab(tab, 'inject/scripts/libs.js');
    executeScriptFromURLInTab(tab, 'inject/scripts/pundit2.js');

});