---
layout: page
title: Feed the Pundit
---

# {{ page.title }}

**Feed** is a tool that allows to use Pundit on pages of custom digital libraries, custom projects or on any HTML web page.
Feeds receives two parameters as GET variables:

 1. **The resource to be loaded in Feed:** this is usually an HTML page URL but can also be an **RDF URL** that contains some metadata and a reference to the text to be annotated that responds as HTML.
 It could also be an **Image URL**.
 2. **The configuration file**: a file that’s used to configure some important aspects of the application
 (the Annotation Server URL, external predicates vocabularies URL,
 internal predicates vocabularies, information of selectors of data provider like DBPedia, etc).

You can <a href="http://dev.thepund.it/download/client/last-beta/docs/index.html#!/api/punditConfig" target="_blank">check here</a> an overview of the configurations available for Pundit.

## How does Feed works?
The content to be annotated is **pasted inside the body of the HTML page of Feed** and there it can be annotated.
In the case of an HTML page all the content inside the *<body>* is copied and then pasted inside Feed.

Moreover Feed allow us to insert some unique identifiers **(“pundit-content”)** inside the HTML code and these
are used as **Target** for the annotations anchoring: this is very useful because the anchoring of the annotation
is then made with an XPointer “starting” from the unique identifier and everything that changes before and after the
element doesn’t impact the anchoring. This is also used if we want to preserve the annotations on the same text shown
in different pages: if we have a **“pundit-content”** unique identifier for a paragraph, this paragraph can be shown
in two different pages (e.g. the backend and the frontend of an archive) and all annotations are correctly in the same position.

On the <a href="http://thepund.it/try-pundit/" target="_blank">Pundit Try it now</a> page there are two examples Pundit working with Feed.
