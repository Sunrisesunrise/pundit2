var developMode = true;

var cssInject = ['inject/css/pundit2.css', 'inject/css/korboee.css', 'inject/css/style.css'],
    scriptInject = [];

var _lib = 'http://localhost:9000/app/examples/src/_libs.inc',
    _pundit = 'http://localhost:9000/app/examples/src/_pundit.inc';

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
        currentUrl;

    if (file === _lib) {
        for (var i in referenceMatch) {
            currentUrl = referenceMatch[i].replace('src="../../', 'http://localhost:9000/');
            scriptInject.push(currentUrl);
            fileRequest(currentUrl, extractScript);
        }
    } else if (file === _pundit) {
        for (var i in referenceMatch) {
            currentUrl = referenceMatch[i].replace('src="../', 'http://localhost:9000/app/');
            scriptInject.push(currentUrl);
            if (parseInt(i) === referenceMatch.length - 1) {
                fileRequest(currentUrl, updateCurrentTab);
            } else {
                fileRequest(currentUrl, extractScript);
            }
        }
    }
};

var updateScript = function(tabId, callback) {
    scriptInject = [];
    incsScript = {};
    
    fileRequest(_lib, extractUrl);
    fileRequest(_pundit, extractUrl);

    if (typeof tabId !== 'undefined') {
        updateCallback = function() {
            callback(tabId)
        };
    }
};

updateScript();