/**
 *  Handle the browser action that get's executed if the user pushes
 *  the toolbar icon in Chrome
 */

var state = {
        tabs: {},
        tabsOnOff: {},
        injections: {},
        loading: {},
        stopLoading: {}
    },
    offIcon = devicePixelRatio !== 1 ? 'pundit-icon-38.png' : 'pundit-icon-19.png',
    onIcon = devicePixelRatio !== 1 ? 'pundit-icon-38-close.png' : 'pundit-icon-19-close.png',
    defaultBadgeBackgroundColor = [75, 112, 165, 255], //#1E2E43
    consolidationBadgeBackgroundColor = [255, 191, 0, 128], //#1E2E43
    loadingBadgeBackgroundColor = [72, 187, 88, 128];//[255, 191, 0, 128]; //#FFBF00

var injectScripts = function(tab, force, callback) {
    if (typeof state.injections[tab.id] !== 'undefined') {
        if (typeof callback !== 'undefined') {
            callback();
        }
        return;
    }

    if (typeof force === 'undefined') {
        force = false;
    }

    var doInjection = function(includeContentScript, executeCallback) {
        console.log("doing injection");
        state.injections[tab.id] = true;

        if (includeContentScript) {
            chrome.tabs.insertCSS(tab.id, {
                file: 'inject/pundit2-ce.css',
                runAt: "document_start"
            });
        }

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
            },
            function() {
                if (executeCallback && typeof callback !== 'undefined') {
                    callback();
                }
            }
        );

        if (includeContentScript) {
            chrome.tabs.executeScript(tab.id, {
                file: 'inject/content_script.js',
                runAt: "document_start"
            });
        }
    };

    var doCheck = function() {
        chrome.tabs.sendMessage(tab.id, {action: 'checkPundit'}, function(response) {
            if (response) {
                if (response.isPresent) {
                    console.log("already present, just set flag");
                    state.injections[tab.id] = true;
                    state.tabsOnOff[tab.id] = true;
                    state.tabs[tab.id] = true;
                    showOnIcon(tab.id);
                    setLoading(false, tab.id);
                    chrome.tabs.sendMessage(tab.id, {action: 'requestAnnotationsNumber'});
                }
                else {
                    doInjection(false, true);
                }
            }
            else {
                chrome.tabs.insertCSS(tab.id, {
                    file: 'inject/pundit2-ce.css',
                    runAt: "document_start"
                });
                chrome.tabs.executeScript(tab.id, {
                        file: 'inject/content_script.js',
                        runAt: "document_start"
                    },
                    function() {
                        doCheck();
                    }
                );
            }
        });
    };

    if (!force) {
        doCheck();
    }
    else {
        doInjection(true, true);
    }
};

var setBadgeText = function(tabId, text, backgroundColor) {
    if (!state.tabsOnOff[tabId]) {
        text = '';
    }
    if (typeof backgroundColor === 'undefined') {
        backgroundColor = defaultBadgeBackgroundColor;
    }
    chrome.browserAction.setBadgeBackgroundColor({tabId: tabId, color: backgroundColor});
    chrome.browserAction.setBadgeText({tabId: tabId, text: text});
};

var showOnIcon = function(tabId) {
    chrome.browserAction.setIcon({path: chrome.extension.getURL("icons/" + onIcon), tabId: tabId});
};

var showOffIcon = function(tabId) {
    setBadgeText(tabId, '');
    chrome.browserAction.setIcon({path: chrome.extension.getURL("icons/" + offIcon), tabId: tabId});
};

var switchOn = function(tab) {
    showOnIcon(tab.id);
    setLoading(true, tab.id);
    injectScripts(tab, false, function() {
        setTimeout(function(){
            chrome.tabs.sendMessage(tab.id, {action: 'switchOn'});
            state.tabs[tab.id] = true;
            state.tabsOnOff[tab.id] = true;
        }, 350);
    });
};

var switchOff = function(tab) {
    chrome.tabs.sendMessage(tab.id, {action: 'switchOff'});
    setBadgeText(tab.id, '');
    state.tabs[tab.id] = false;
    state.tabsOnOff[tab.id] = false;
    showOffIcon(tab.id);
    setLoading(false, tab.id);
};

var switchPundit = function(tab) {
    if (isLoading(tab.id)) {
        return;
    }
    if (typeof state.tabs[tab.id] === 'undefined' || !state.tabs[tab.id]) {
        // Turn on.
        switchOn(tab);
    }
    else {
        switchOff(tab);
    }
};

var isLoading = function(tabId) {
    return typeof state.loading[tabId] !== 'undefined';
};

var setLoading = function(loading, tabId, stopLoadingText) {
    if (!loading) {
        if (isLoading(tabId)) {
            window.clearInterval(state.loading[tabId]);
            delete state.loading[tabId];
        }
        delete state.stopLoading[tabId];
        setBadgeText(tabId, typeof stopLoadingText === 'undefined' ? '' : stopLoadingText);
        return;
    }
    if (loading && isLoading(tabId)) {
        return;
    }
    var iconIndex = 0;
    state.loading[tabId] = window.setInterval(function(){
        var dots = Array(2 + iconIndex % 3);
        var spaces = Array(3 - dots.length + 2);
        var text = dots.join('.')+spaces.join(' ');
        setBadgeText(tabId, text, loadingBadgeBackgroundColor);
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
        setLoading(false, tab.id);

        if (state.tabsOnOff[tabId]) {
            switchOn(tab);
        }
    }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    if (state.tabsOnOff[activeInfo.tabId]) {
        chrome.tabs.sendMessage(activeInfo.tabId, {action: 'requestAnnotationsNumber'});
        showOnIcon(activeInfo.tabId);
    }
    else {
        showOffIcon(activeInfo.tabId);
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.action) {
        case 'updateAnnotationsNumber':
            if (isLoading(sender.tab.id)) {
                if (typeof state.stopLoading[sender.tab.id] !== 'undefined' && state.stopLoading[sender.tab.id]) {
                    setLoading(false, sender.tab.id, "" + request.number);
                }
                break;
            }
            if (state.tabsOnOff[sender.tab.id]) {
                setBadgeText(sender.tab.id, "" + request.number);
            }
            break;

        case 'setLoading':
            if (!request.loading) {
                state.stopLoading[sender.tab.id] = true;
                chrome.tabs.sendMessage(sender.tab.id, {action: 'requestAnnotationsNumber'});
            }
            else {
                setLoading(request.loading, sender.tab.id);
            }
            break;

        case 'consolidation':
            //chrome.browserAction.setBadgeBackgroundColor({color: request.active ? consolidationBadgeBackgroundColor : defaultBadgeBackgroundColor, tabId: sender.tab.id});
            break;
    }
});
