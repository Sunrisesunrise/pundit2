var button = document.createElement('span'),
    attClass = document.createAttribute('class'),
    attAbout = document.createAttribute('about'),
    attClick = document.createAttribute('onclick'),
    uri = '';

//set attribute class for PIN button
attClass.value = 'pnd-resource';
attClick.value = 'document.dispatchEvent(new CustomEvent("Pundit.showBootstrap"));';
//set target
uri = document.URL;
uri = 'http://data.europeana.eu/item' + uri.split("http://www.europeana.eu/portal/record")[1];
attAbout.value = uri.split('.html')[0];

button.setAttributeNode(attClass);
button.setAttributeNode(attAbout);
button.setAttributeNode(attClick);

setTimeout(function () {
    chrome.runtime.sendMessage({action: 'switchOnExt'});

    var title = document.getElementsByClassName('object-title')[0];

    //insert pin button
    title['children'][1].childNodes[1].appendChild(button);

    document.dispatchEvent(new CustomEvent('Pundit.loadAnnotations'));
    document.dispatchEvent(new CustomEvent('Pundit.forceCompileButton'));
}, 3000);

