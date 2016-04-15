/**
 *  Handle the browser action that get's executed if the user pushes
 *  the toolbar icon in Chrome
 */

var state = {
        tabs: {},
        tabsOnOff: {},
        injections: {},
        loading: {},
        stopLoading: {},
        analytics: false
    },
    //offIcon = devicePixelRatio !== 1 ? 'pundit-icon-38.png' : 'pundit-icon-19.png',
    //onIcon = devicePixelRatio !== 1 ? 'pundit-icon-38-close.png' : 'pundit-icon-19-close.png',
    offIcon = {
        '19': chrome.extension.getURL('icons/pundit-icon-19.png'),
        '38': chrome.extension.getURL('icons/pundit-icon-38.png')
    },
    onIcon = {
        '19': chrome.extension.getURL('icons/pundit-icon-19-close.png'),
        '38': chrome.extension.getURL('icons/pundit-icon-38-close.png')
    },
    defaultBadgeBackgroundColor = [127, 127, 127, 255], // [75, 112, 165, 255], //#1E2E43
    consolidationBadgeBackgroundColor = [255, 191, 0, 128], //#1E2E43
    loadingBadgeBackgroundColor = [127, 127, 127, 255]; // [72, 187, 88, 128];//[255, 191, 0, 128]; //#FFBF00

var _gaq = _gaq || [];

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
        console.log('doing injection');
        state.injections[tabId] = true;

        if (includeContentScript) {
            chrome.tabs.insertCSS(tabId, {
                file: 'inject/pundit2-ce.css',
                runAt: 'document_start'
            });
        }

        // Run the css.
        for (var c in cssInject) {
            chrome.tabs.insertCSS(tabId, {
                file: cssInject[c],
                runAt: 'document_start'
            });
        }

        // Run the JavaScript with a specific configuration.
        chrome.tabs.executeScript(tabId, {
            file: 'inject/extension_conf.js',
            runAt: 'document_start'
        });

        for (var s in scriptInject) {
            var currentUrl = scriptInject[s],
                details = currentUrl.indexOf('http://') !== -1 ? {
                    code: incsScript[currentUrl],
                    runAt: 'document_start'
                } : {
                    file: currentUrl,
                    runAt: 'document_start'
                };

            // Execute the callback after the last script injection
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
                runAt: 'document_start'
            });
        }
    };

    var doCheck = function() {
        chrome.tabs.sendMessage(tabId, {
            action: 'checkPundit'
        }, function(response) {
            if (response) {
                if (response.isPresent) {
                    //console.log('already present, just set flag');
                    state.injections[tabId] = true;
                    state.tabsOnOff[tabId] = true;
                    state.tabs[tabId] = true;
                    showOnIcon(tabId);
                    setLoading(false, tabId);

                    // Check if it's same c.e.
                    if (typeof response.cid !== 'undefined' && response.cid != null && response.cid !== chrome.runtime.id) {
                        chrome.runtime.sendMessage(response.cid, {
                            action: 'forceClose',
                            cid: response.cid,
                            tabId: tabId
                        }, function(innerResponse) {
                            if (innerResponse.reload) {
                                console.log('reload tab');
                                chrome.tabs.reload(tabId);
                            }
                        });
                    } else {
                        chrome.tabs.sendMessage(tabId, {
                            action: 'requestAnnotationsNumber'
                        });
                    }
                } else {
                    doInjection(false, true);
                }
            } else {
                chrome.tabs.insertCSS(tabId, {
                    file: 'inject/pundit2-ce.css',
                    runAt: 'document_start'
                });
                chrome.tabs.executeScript(tabId, {
                        file: 'inject/content_script.js',
                        runAt: 'document_start'
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
    //chrome.browserAction.setBadgeBackgroundColor({
    //    tabId: tabId,
    //    color: backgroundColor
    //});
    //chrome.browserAction.setBadgeText({
    //    tabId: tabId,
    //    text: text
    //});
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
    injectScripts(tabId, true, function() {
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
        if (developMode) {
            if (useServerFile) {
                updateScript(tabId, switchOn);
                return;
            }
        }
        switchOn(tabId);
    }
};

//chrome.browserAction.onClicked.addListener(switchPundit);

chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId) {
    console.log('chrome.tabs.onReplaced');
    for (var i in state) {
        if (typeof state[i][removedTabId] !== 'undefined') {
            state[i][addedTabId] = state[i][removedTabId];
            delete state[i][removedTabId];
        }
    }
    onUpdate(addedTabId);
});

chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    if (info.status == 'complete') {
        if (tab.url === 'chrome://newtab/') {
            return;
        }

    }
    if (tab.url.indexOf("http://europeana.eu/portal/record/")<0) {
        return;
    }else{
        //remove tab
        window.clearInterval(state.loading[tabId]);
        delete state.loading[tabId];
        delete state.injections[tabId];
        delete state.stopLoading[tabId];
        delete state.tabs[tabId];
        delete state.tabsOnOff[tabId];
    }
    onUpdate(tabId);

});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    console.log('chrome.tabs.onActivated');
    if (state.tabsOnOff[activeInfo.tabId]) {
        chrome.tabs.sendMessage(activeInfo.tabId, {
            action: 'requestAnnotationsNumber'
        });
        showOnIcon(activeInfo.tabId);
    } else {
        showOffIcon(activeInfo.tabId);
    }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    window.clearInterval(state.loading[tabId]);
    delete state.loading[tabId];
    delete state.injections[tabId];
    delete state.stopLoading[tabId];
    delete state.tabs[tabId];
    delete state.tabsOnOff[tabId];
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var tabId;
    switch (request.action) {
        case 'switchOnExt':
            chrome.browserAction.disable(sender.tab.id);
            switchOn(sender.tab.id);
            break;

        case 'updateAnnotationsNumber':
            if (isLoading(sender.tab.id)) {
                if (typeof state.stopLoading[sender.tab.id] !== 'undefined' && state.stopLoading[sender.tab.id]) {
                    setLoading(false, sender.tab.id, '' + request.number);
                }
                break;
            }
            if (state.tabsOnOff[sender.tab.id]) {
                setBadgeText(sender.tab.id, '' + request.number);
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

        case 'analyticsSettings':
            var options = request.number;
            if (state.analytics === false && options.chromeExtMode) {
                // Google Analytics code
                if (options.doTracking) {
                    _gaq.push(['_setAccount', options.trackingCode]);
                    (function() {
                        var ga = document.createElement('script');
                        ga.type = 'text/javascript';
                        ga.async = true;
                        ga.src = 'https://ssl.google-analytics.com/ga.js';
                        var s = document.getElementsByTagName('script')[0];
                        s.parentNode.insertBefore(ga, s);
                    })();
                }
                // Mixpanel code
                if (options.doMixpanel) {
                    (function(f, b) {
                        if (!b.__SV) {
                            var a, e, i, g;
                            window.mixpanel = b;
                            b._i = [];
                            b.init = function(a, e, d) {
                                function f(b, h) {
                                    var a = h.split('.');
                                    2 == a.length && (b = b[a[0]], h = a[1]);
                                    b[h] = function() {
                                        b.push([h].concat(Array.prototype.slice.call(arguments, 0)))
                                    }
                                }
                                var c = b;
                                'undefined' !== typeof d ? c = b[d] = [] : d = 'mixpanel';
                                c.people = c.people || [];
                                c.toString = function(b) {
                                    var a = 'mixpanel';
                                    'mixpanel' !== d && (a += '.' + d);
                                    b || (a += ' (stub)');
                                    return a
                                };
                                c.people.toString = function() {
                                    return c.toString(1) + '.people (stub)'
                                };
                                i = 'disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user'.split(' ');
                                for (g = 0; g < i.length; g++) f(c, i[g]);
                                b._i.push([a, e, d])
                            };
                            b.__SV = 1.2;
                            a = f.createElement('script');
                            a.type = 'text/javascript';
                            a.async = !0;
                            a.src = 'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js';
                            e = f.getElementsByTagName('script')[0];
                            e.parentNode.insertBefore(a, e)
                        }
                    })(document, window.mixpanel || []);
                    mixpanel.init(options.trackingCodeMixpanel);
                }
                state.analytics = true;
            }
            break;

        case 'analyticsUserData':
            var data = request.number,
                options = data.options,
                user = data.details;

            if (options.doMixpanel) {
                mixpanel.identify(user.id);
                mixpanel.people.set({
                    '$email': user.email,
                    '$last_login': new Date(),
                    '$first_name': user.firstName,
                    '$last_name': user.lastName,
                });
            }

            break;

        case 'analyticsTrack':
            var data = request.number,
                event;

            if (data.type === 'ga') {
                event = [];
                event.push('_trackEvent');
                for (var i in data.properties) {
                    event.push(data.properties[i]);
                }
                _gaq.push(event);
            } else if (data.type === 'mixpanel') {
                event = data.properties;
                event.realUrl = data.url;
                event.canonicalUrl = data.canonical;
                event.clientMode = data.clientMode;

                mixpanel.track(event.eventLabel, event);
            }
            break;
    }
});

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    switch (request.action) {
        case 'forceClose':
            window.clearInterval(request.tabId);
            delete state.loading[request.tabId];
            delete state.injections[request.tabId];
            delete state.stopLoading[request.tabId];
            delete state.tabs[request.tabId];
            delete state.tabsOnOff[request.tabId];
            showOffIcon(request.tabId);
            sendResponse({
                reload: true
            });
            break;
    }
});