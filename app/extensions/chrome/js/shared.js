function executeScriptFromURLInTab(tab, scriptURL) {
    chrome.tabs.executeScript(tab.id, {file: scriptURL});
}

function executeCSSFromURLInTab(tab, cssURL) {
    chrome.tabs.insertCSS(tab.id, {file: cssURL});
}