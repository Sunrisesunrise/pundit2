/**
 *  Handle the browser action that get's executed if the user pushes
 *  the toolbar icon in Chrome
 */

var state = {
    tabs: {},
    tabsOnOff: {},
    injections: {}
};

var injectScripts = function(tab) {
    if (typeof state.injections[tab.id] !== 'undefined') {
        return;
    }

    state.injections[tab.id] = true;

    // On Off handler
    chrome.tabs.executeScript(tab.id, {
        file: 'inject/on_off_handler.js',
        runAt: "document_start"
    });

    // Run the css.
    chrome.tabs.insertCSS(tab.id, {
        file: 'inject/css/pundit.css',
        runAt: "document_start"
    });

    // Run the JavaScript with a specific configuration.
    chrome.tabs.executeScript(tab.id, {
        file: 'inject/extension_conf.js',
        runAt: "document_start"
    });
    chrome.tabs.executeScript(tab.id, {
        file: 'inject/scripts/libs.js',
        runAt: "document_start"
    });
    chrome.tabs.executeScript(tab.id, {
        file: 'inject/scripts/pundit2.js',
        runAt: "document_start"
    });

};

var showOnIcon = function() {
    chrome.browserAction.setIcon({path: chrome.extension.getURL("icons/close-icon19.png")});
};

var showOffIcon = function() {
    chrome.browserAction.setIcon({path: chrome.extension.getURL("icons/icon19.png")});
};

var switchOn = function(tab) {
    injectScripts(tab);
    setTimeout(function(){
        chrome.tabs.sendMessage(tab.id, {action: 'switchOn'});
        state.tabs[tab.id] = true;
        state.tabsOnOff[tab.id] = true;
        showOnIcon();
    }, 350);
};

var switchPundit = function(tab) {
    if (typeof state.tabs[tab.id] === 'undefined' || !state.tabs[tab.id]) {
        // Turn on.
        switchOn(tab);
    }
    else {
        chrome.tabs.sendMessage(tab.id, {action: 'switchOff'});
        state.tabs[tab.id] = false;
        state.tabsOnOff[tab.id] = false;
        showOffIcon();
    }
};

var loadingInterval;
var setLoading = function(loading) {
    //window.clearInterval(loadingIconInterval);
    if (!loading) {
        window.clearInterval(loadingIconInterval);
        loadingIconInterval = undefined;
        chrome.browserAction.setBadgeText({text: ""});
        return;
    }
    if (loading && typeof loadingIconInterval !== 'undefined') {
        return;
    }
    var iconIndex = 0;
    loadingIconInterval = window.setInterval(function(){
        switch (iconIndex) {
            case 0:
                chrome.browserAction.setBadgeText({text: ".  "});
                break;
            case 1:
                chrome.browserAction.setBadgeText({text: ".. "});
                break;
            case 2:
                chrome.browserAction.setBadgeText({text: "..."});
                break;
        }
        iconIndex ++;
        iconIndex = iconIndex % 3;
    }, 250);
}

chrome.browserAction.onClicked.addListener(switchPundit);

chrome.tabs.onUpdated.addListener(function(tabId , info, tab) {
    if (info.status == "complete") {
        if (tab.url === "chrome://newtab/") {
            return;
        }

        delete state.tabs[tabId];
        delete state.injections[tabId];

        if (state.tabsOnOff[tabId]) {
            switchOn(tab);
        }
    }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    if (state.tabsOnOff[activeInfo.tabId]) {
        chrome.tabs.sendMessage(activeInfo.tabId, {action: 'requestAnnotationsNumber'});
        showOnIcon();
    }
    else {
        chrome.browserAction.setBadgeText({text: "" });
        showOffIcon();
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.action) {
        case 'updateAnnotationsNumber':
            chrome.browserAction.setBadgeText({text: "" + request.number});
            break;

        case 'setLoading':
            setLoading(request.loading);
            if (!request.loading) {
                sendResponse({action: 'updateAnnotationsNumber', request: request});
            }
            break;
    }
});
