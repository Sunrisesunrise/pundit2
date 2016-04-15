var button = document.createElement("span"),
    attClass = document.createAttribute("class"),
    attAbout = document.createAttribute("about"),
    attClick = document.createAttribute("onclick");


chrome.runtime.sendMessage({action: "switchOnExt"});

//set attribute class for PIN button
attClass.value = "pnd-resource";
attAbout.value = document.URL;
attClick.value = "document.dispatchEvent(new CustomEvent('Pundit.showBootstrap'));";

button.setAttributeNode(attClass);
button.setAttributeNode(attAbout);
button.setAttributeNode(attClick);

setTimeout(function () {
    var title = document.getElementsByClassName("object-title")[0];

    //insert pin button
    title["children"][1].childNodes[1].appendChild(button);

    document.dispatchEvent(new CustomEvent('Pundit.loadAnnotations'));
    document.dispatchEvent(new CustomEvent('Pundit.forceCompileButton'));

}, 3000);

