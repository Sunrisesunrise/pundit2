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
    //offIcon = devicePixelRatio !== 1 ? 'pundit-icon-38.png' : 'pundit-icon-19.png',
    //onIcon = devicePixelRatio !== 1 ? 'pundit-icon-38-close.png' : 'pundit-icon-19-close.png',
    offIcon = {
        "19": chrome.extension.getURL("icons/pundit-icon-19.png"),
        "38": chrome.extension.getURL("icons/pundit-icon-38.png")
    },
    onIcon = {
        "19": chrome.extension.getURL("icons/pundit-icon-19-close.png"),
        "38": chrome.extension.getURL("icons/pundit-icon-38-close.png")
    },
    defaultBadgeBackgroundColor = [127, 127, 127, 255], // [75, 112, 165, 255], //#1E2E43
    consolidationBadgeBackgroundColor = [255, 191, 0, 128], //#1E2E43
    loadingBadgeBackgroundColor = [127, 127, 127, 255]; // [72, 187, 88, 128];//[255, 191, 0, 128]; //#FFBF00

var injectScripts = function(tabId, force, callback) {
    if (typeof state.injections[tabId] !== 'undefined') {
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
        state.injections[tabId] = true;

        if (includeContentScript) {
            chrome.tabs.insertCSS(tabId, {
                file: 'inject/pundit2-ce.css',
                runAt: "document_start"
            });
        }

        // Run the css.
        for (var c in cssInject) {
            chrome.tabs.insertCSS(tabId, {
                file: cssInject[c],
                runAt: "document_start"
            });
        }

        // Run the JavaScript with a specific configuration.
        chrome.tabs.executeScript(tabId, {
            file: 'inject/extension_conf.js',
            runAt: "document_start"
        });

        for (var s in scriptInject) {
            var currentUrl = scriptInject[s],
                details = currentUrl.indexOf('http://') !== -1 ? {
                    code: incsScript[currentUrl],
                    runAt: "document_start"
                } : {
                    file: currentUrl,
                    runAt: "document_start"
                };

            // Execute le callback after the last script injection
            if (parseInt(s) === scriptInject.length - 1) {
                chrome.tabs.executeScript(tabId, details,
                    function() {
                        if (executeCallback && typeof callback !== 'undefined') {
                            callback();
                        }
                    }
                );
            } else {
                chrome.tabs.executeScript(tabId, details);
            }
        }

        if (includeContentScript) {
            chrome.tabs.executeScript(tabId, {
                file: 'inject/content_script.js',
                runAt: "document_start"
            });
        }
    };

    var doCheck = function() {
        chrome.tabs.sendMessage(tabId, {
            action: 'checkPundit'
        }, function(response) {
            if (response) {
                if (response.isPresent) {
                    console.log("already present, just set flag");
                    state.injections[tabId] = true;
                    state.tabsOnOff[tabId] = true;
                    state.tabs[tabId] = true;
                    showOnIcon(tabId);
                    setLoading(false, tabId);
                    chrome.tabs.sendMessage(tabId, {
                        action: 'requestAnnotationsNumber'
                    });
                } else {
                    doInjection(false, true);
                }
            } else {
                chrome.tabs.insertCSS(tabId, {
                    file: 'inject/pundit2-ce.css',
                    runAt: "document_start"
                });
                chrome.tabs.executeScript(tabId, {
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
    } else {
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
    chrome.browserAction.setBadgeBackgroundColor({
        tabId: tabId,
        color: backgroundColor
    });
    chrome.browserAction.setBadgeText({
        tabId: tabId,
        text: text
    });
};

var showOnIcon = function(tabId) {
    chrome.browserAction.setIcon({
        path: onIcon,
        tabId: tabId
    });
};

var showOffIcon = function(tabId) {
    setBadgeText(tabId, '');
    chrome.browserAction.setIcon({
        path: offIcon,
        tabId: tabId
    });
};

var switchOn = function(tabId) {
    showOnIcon(tabId);
    setLoading(true, tabId);
    injectScripts(tabId, false, function() {
        setTimeout(function() {
            chrome.tabs.sendMessage(tabId, {
                action: 'switchOn'
            });
            state.tabs[tabId] = true;
            state.tabsOnOff[tabId] = true;

            if (developMode) {
                if (useLivereload) {
                    chrome.tabs.sendMessage(tabId, {
                        action: 'livereload'
                    });
                }
            }
        }, 350);
    });
};

var switchOff = function(tabId) {
    chrome.tabs.sendMessage(tabId, {
        action: 'switchOff'
    });
    setBadgeText(tabId, '');
    state.tabs[tabId] = false;
    state.tabsOnOff[tabId] = false;
    showOffIcon(tabId);
    setLoading(false, tabId);
};

var switchPundit = function(tab) {
    var tabId = tab.id;
    if (isLoading(tabId)) {
        return;
    }
    if (typeof state.tabs[tabId] === 'undefined' || !state.tabs[tabId]) {
        // Turn on.
        switchOn(tabId);
    } else {
        // Turn off.
        switchOff(tabId);
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
    state.loading[tabId] = window.setInterval(function() {
        var dots = Array(2 + iconIndex % 3);
        var spaces = Array(3 - dots.length + 2);
        var text = dots.join('.') + spaces.join(' ');
        setBadgeText(tabId, text, loadingBadgeBackgroundColor);
        iconIndex++;
        iconIndex = iconIndex % 3;
    }, 250);
};

var onUpdate = function(tabId) {
    delete state.tabs[tabId];
    delete state.injections[tabId];
    setLoading(false, tabId);

    if (state.tabsOnOff[tabId]) {
        switchOn(tabId);
    }
};

chrome.browserAction.onClicked.addListener(switchPundit);

chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId) {
    console.log("chrome.tabs.onReplaced");
    for (var i in state) {
        if (typeof state[i][removedTabId] !== 'undefined') {
            state[i][addedTabId] = state[i][removedTabId];
            delete state[i][removedTabId];
        }
    }
    onUpdate(addedTabId);
});

chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    if (info.status == "complete") {
        if (tab.url === "chrome://newtab/") {
            return;
        }

        if (developMode) {
            updateScript(tabId, onUpdate);
        } else {
            onUpdate(tabId);
        }
    }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    console.log("chrome.tabs.onActivated");
    if (state.tabsOnOff[activeInfo.tabId]) {
        chrome.tabs.sendMessage(activeInfo.tabId, {
            action: 'requestAnnotationsNumber'
        });
        showOnIcon(activeInfo.tabId);
    } else {
        showOffIcon(activeInfo.tabId);
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var tabId;
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
                chrome.tabs.sendMessage(sender.tab.id, {
                    action: 'requestAnnotationsNumber'
                });
            } else {
                setLoading(request.loading, sender.tab.id);
            }
            break;

        case 'userProfileUpdated':
            for (var i in state.tabsOnOff) {
                tabId = parseInt(i);
                if (tabId === sender.tab.id) {
                    continue;
                }
                chrome.tabs.sendMessage(tabId, {
                    action: 'requestUserProfileUpdate'
                });
            }
            break;

        case 'userLoggedStatusChanged':
            for (var j in state.tabsOnOff) {
                tabId = parseInt(j);
                if (tabId === sender.tab.id) {
                    continue;
                }
                chrome.tabs.sendMessage(tabId, {
                    action: 'requestUserLoggedStatus'
                });
            }
            break;

        case 'consolidation':
            //chrome.browserAction.setBadgeBackgroundColor({color: request.active ? consolidationBadgeBackgroundColor : defaultBadgeBackgroundColor, tabId: sender.tab.id});
            break;
    }
});