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

    chrome.tabs.insertCSS(tab.id, {
        file: 'inject/pundit2-ce.css',
        runAt: "document_start"
    });

    chrome.tabs.executeScript(tab.id, {
        file: 'inject/content_script.js',
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

var showOnIcon = function(tabId) {
    chrome.browserAction.setIcon({path: chrome.extension.getURL("icons/pundit-icon-19-close.png"), tabId: tabId});
};

var showOffIcon = function(tabId) {
    chrome.browserAction.setIcon({path: chrome.extension.getURL("icons/pundit-icon-19.png"), tabId: tabId});
};

var switchOn = function(tab) {
    injectScripts(tab);
    setTimeout(function(){
        chrome.tabs.sendMessage(tab.id, {action: 'switchOn'});
        state.tabs[tab.id] = true;
        state.tabsOnOff[tab.id] = true;
        showOnIcon(tab.id);
    }, 350);
};

var switchOff = function(tab) {
    chrome.tabs.sendMessage(tab.id, {action: 'switchOff'});
    chrome.browserAction.setBadgeText({text: "", tabId: tab.id});
    state.tabs[tab.id] = false;
    state.tabsOnOff[tab.id] = false;
    showOffIcon(tab.id);
};

var switchPundit = function(tab) {
    if (typeof state.tabs[tab.id] === 'undefined' || !state.tabs[tab.id]) {
        // Turn on.
        switchOn(tab);
    }
    else {
        switchOff(tab);
    }
};

var loadingInterval;
var isLoading = function() {
  return typeof loadingIconInterval !== 'undefined';
};
var setLoading = function(loading, tabId) {
    //window.clearInterval(loadingIconInterval);
    if (!loading) {
        window.clearInterval(loadingIconInterval);
        loadingIconInterval = undefined;
        chrome.browserAction.setBadgeText({text: "", tabId: tabId});
        return;
    }
    if (loading && isLoading()) {
        return;
    }
    var iconIndex = 0;
    loadingIconInterval = window.setInterval(function(){
        switch (iconIndex) {
            case 0:
                chrome.browserAction.setBadgeText({text: ".  ", tabId: tabId});
                break;
            case 1:
                chrome.browserAction.setBadgeText({text: ".. ", tabId: tabId});
                break;
            case 2:
                chrome.browserAction.setBadgeText({text: "...", tabId: tabId});
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
    chrome.browserAction.setBadgeText({text: "", tabId: activeInfo.tabId});
    if (state.tabsOnOff[activeInfo.tabId]) {
        chrome.tabs.sendMessage(activeInfo.tabId, {action: 'requestAnnotationsNumber'});
        showOnIcon(activeInfo.tabId);
    }
    else {
        showOffIcon(activeInfo.tabId);
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var doStuff;

    switch (request.action) {
        case 'updateAnnotationsNumber':
            if (isLoading()) {
                break;
            }
            doStuff = function() {
                chrome.browserAction.setBadgeText({text: "" + request.number, tabId: sender.tab.id});
            };
            break;

        case 'setLoading':
            doStuff = function() {
                setLoading(request.loading, sender.tab.id);
                if (!request.loading) {
                    chrome.tabs.sendMessage(sender.tab.id, {action: 'requestAnnotationsNumber'});
                }
            };
            break;
    }

    chrome.tabs.query({active: true}, function(tabs){
        if (typeof doStuff === 'undefined') {
            return;
        }
        for (var i in tabs) {
            if (sender.tab.id === tabs[i].id && sender.tab.windowId === tabs[i].windowId) {
                doStuff();
                break;
            }
        }
    });
});
