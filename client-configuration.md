---
layout: page
title: Pundit Annotator configuration
---

# {{ page.title }}

## 1 Create a configuration file

To overwrite Pundit’s defaults just edit the configuration file included in the page.

Using javascript syntax create an object called **"punditConfig"** and set the desired properties:

    var punditConfig = {
        debugAllModules: true,
        useBasicRelations: false,
        vocabularies: [
            'http://my_site.com/my_taxonomy.jsonp'
        ],
    }

The guidelines for creating a Pundit configuration file can be found <a href="http://dev.thepund.it/download/client/last-beta/docs/index.html#!/api/punditConfig" target="_blank">here</a>.

## 2 Relations vocabulary

A relations set is a vocabulary of type **"predicates"**, it is similar to a taxonomy,
but items are expected to have the **“rdftype”** attribute equal to **rdf:Property**.
Specifies relations vocabularies that will be available to Pundit users
(defines a list of relations with domain and ranges).
Each vocabulary definition is a JSONP file available on the Web and is loaded by resolving an absolute URL.
The following code (<a href="http://dev.thepund.it/download/client/last-beta/docs/index.html#!/api/punditConfig/object/vocabularies" target="_blank">see pundit 2.0 configuration</a>) shows an example.

    result: {
         items: [
             "value": "http://purl.org/dc/terms/creator",
             "rdftype":["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
             "label":"has creator",
             "description":"The selected text fragment has been created by a specific Person",
             "domain":[
                 "http://xmlns.com/foaf/0.1/Image",
                 "http://purl.org/pundit/ont/ao#fragment-image",
                 "http://purl.org/pundit/ont/ao#fragment-text"
              ],
              "range":[
                 "http://dbpedia.org/ontology/Person",
                 "http://xmlns.com/foaf/0.1/Person",
                 "http://www.freebase.com/schema/people/person"
              ],
            ...other items...
             ]
        }
    }

![Pundit resource panel](img/resource-panel.png)

The Relation vocabulary is then used by the Pundit Client in the **Resource Panel** to show the predicates
available to the user to build triples.