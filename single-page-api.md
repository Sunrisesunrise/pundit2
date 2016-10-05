---
layout: page
title: Single page API
---

# {{ page.title }}

There are four main events that you can use to interact with Pundit from your application:
    
    - 'Pundit.hide': hides the client
    - 'Pundit.show': shows the client
    - 'Pundit.loadAnnotations': refreshes annotations immediately
    - 'Pundit.delayedLoadAnnotations': refreshes annotations with about 500ms of delay

loadAnnotations and delayedLoadAnnotations can be useful for single page applications if you want to reload Pundit annotations.

This is an example of how you can use it:

```javascript
var dispatchDocumentEvent = function(eventName, details){
    var evt;
    if (document.createEventObject) {
        // dispatch for IE
        evt = document.createEventObject();
        evt.detail = details;
        document.fireEvent(eventName, evt);
    } else {
        // dispatch for firefox + others
        evt = new CustomEvent(eventName, {
            detail: details
        });
        document.dispatchEvent(evt);
    }
};

// i.e. when the url change, reload the annotations in the new context
dispatchDocumentEvent('Pundit.delayedLoadAnnotations');
```