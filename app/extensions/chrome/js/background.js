/**
 *  Handle the browser action that get's executed if the user pushes
 *  the toolbar icon in Chrome
 */

var tabs = {},
    injections = {};

var init = function(tab) {
    // Add Pundit element to DOM
    executeScriptFromURLInTab(tab, 'inject/init.js');

    // Run the css
    executeCSSFromURLInTab(tab, 'inject/css/pundit.css');

    // Run the JavaScript with a specific configuration
    executeScriptFromURLInTab(tab, 'inject/extension_conf.js');
    executeScriptFromURLInTab(tab, 'inject/scripts/libs.js');
    executeScriptFromURLInTab(tab, 'inject/scripts/pundit2.js');
};

var turnOn = function(tab) {
    tabs[tab.id] = tab;
    chrome.browserAction.setIcon({
        path: chrome.extension.getURL("icons/close-icon19.png"),
        tabId: tab.id
    });
};

var turnOff = function(tab) {
    for (var id in tabs) {
        if (id == tab.id) {
            delete tabs[id];
        }
    }

    chrome.browserAction.setIcon({
        path: chrome.extension.getURL("icons/icon19.png"),
        tabId: tab.id
    });
};

var switchPundit = function(tab) {
    var doInit = true;

    if (!injections[tab.id]) {
        injections[tab.id] = {};
    }

    if (!tabs[tab.id]) {
        turnOn(tab);
        if (injections[tab.id].refresh) {
            chrome.tabs.reload(tab.id);
            doInit = false;
        }
    } else {
        executeScriptFromURLInTab(tab, 'inject/quit.js');
        injections[tab.id].refresh = true;
        turnOff(tab);
        doInit = false;
    }

    if (doInit) {
        init(tab);
    }
};

var updateLocation = function(tabId, changeInfo, tab) {
    if (tabs[tabId]) {
        turnOn(tab);
        init(tab);
    }
    if (injections[tab.id]) {
        injections[tab.id].refresh = false;
    }
};

// Browser actions
chrome.browserAction.onClicked.addListener(switchPundit);

chrome.tabs.onUpdated.addListener(updateLocation);