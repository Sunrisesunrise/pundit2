var developMode = true,
    useServerFile = false,
    serverUrl = 'http://localhost:9000/';

var cssInject = ['inject/css/pundit2.css', 'inject/css/korboee.css', 'inject/css/style.css'],
    scriptInject = [],
    libInject = [];

var _lib = serverUrl + 'app/examples/src/_libs.inc',
    _pundit = serverUrl + 'app/examples/src/_pundit.inc';

var incsScript = {},
    srcRegExp = /src="([^"']+)/g;

var updateCallback;

var fileRequest = function(url, callback, lastCall) {
    var xhttp = new XMLHttpRequest();
    var method = 'GET';

    xhttp.onload = function() {
        callback(url, xhttp.responseText);
        if (typeof lastCall !== 'undefined') {
            lastCall();
        }
    };
    xhttp.onerror = function() {
        console.log('Something wrong with the file request');
    };
    xhttp.open(method, url, true);
    if (method == 'POST') {
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    xhttp.send(null); // null || data

    return true;
}

var extractScript = function(url, script) {
    incsScript[url] = script;
}

var updateCurrentTab = function(url, script) {
    extractScript(url, script);

    if (typeof updateCallback !== 'undefined') {
        updateCallback();
        updateCallback = undefined;
    }

}

var extractUrl = function(file, text) {
    var referenceMatch = text.match(srcRegExp),
        baseUrl, currentUrl;

    if (file === _lib) {
        baseUrl = serverUrl;
        for (var i in referenceMatch) {
            currentUrl = referenceMatch[i].replace('src="../../', baseUrl);
            libInject.push(currentUrl);
            fileRequest(currentUrl, extractScript);
        }
    } else if (file === _pundit) {
        baseUrl = useServerFile ? serverUrl + 'app/' : 'inject/scripts/';
        scriptInject = scriptInject.concat(libInject);
        if (useServerFile) {
            for (var i in referenceMatch) {
                currentUrl = referenceMatch[i].replace('src="../', baseUrl);
                scriptInject.push(currentUrl);
                if (parseInt(i) === referenceMatch.length - 1) {
                    fileRequest(currentUrl, updateCurrentTab);
                } else {
                    fileRequest(currentUrl, extractScript);
                }
            }
        } else {
            for (var i in referenceMatch) {
                currentUrl = referenceMatch[i].replace('src="../src/', baseUrl);
                scriptInject.push(currentUrl);
            }
            if (typeof updateCallback !== 'undefined') {
                updateCallback();
                updateCallback = undefined;
            }
        }
    }
};

var updateScript = function(tabId, callback) {
    scriptInject = [];
    fileRequest(_pundit, extractUrl);

    if (typeof tabId !== 'undefined') {
        updateCallback = function() {
            callback(tabId)
        };
    }
};

fileRequest(_lib, extractUrl);
updateScript();