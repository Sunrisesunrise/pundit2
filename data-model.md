---
layout: page
title: Pundit RDF annotation data model
---

#{{ page.title }}

In this page we shortly describe the **RDF data model**, based on Open Annotatation
(http://www.openannotation.org/spec/core/), used in Pundit to represent annotations. We do this by showing some basic examples.

The **Notebook** contains all annotations created by an user during his session.
Annotations are connected to a Notebook by the relation `isIncludedIn` (or viceversa by `ao:includes`).
Moreover the are notebook metadata such like `dcterms:created` or `ao:id` in order to describe itself.

Every Annotation contains directly metadata (similar to notebook’s metadata such like `dcterms:creator` or `ao:id`).

**Triples** created by the annotator are kept in a separate named graph. This is linked to the annotation via
the `oa:hasBody` property. Targets of the annotation can be, as in this example, one or more text fragments
(identified by an XPointer).

Resources mentioned in the Body named graph have additional triples specifying their basic metadata,
as label, description, pictures and types.
These triples are spread in a separate named graph connected to the annotation via the `:items property`.


##Example of a Pundit notebook represented in RDF

    @prefix foaf:<http://xmlns.com/foaf/0.1/> .
    @prefix : <http://purl.org/pundit/ont/ao#> .
    @prefix dcterms: <http://purl.org/dc/terms/> .
    @prefix oa: <http://www.openannotation.org/ns/> .
    @prefix dc: <http://purl.org/dc/elements/1.1/> .
    @prefix dcterms: <http://purl.org/dc/terms/> .
    @prefix fn: <http://www.w3.org/2005/xpath-functions#> .
    @prefix owl: <http://www.w3.org/2002/07/owl#> .
    @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
    @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
    @prefix xml: <http://www.w3.org/XML/1998/namespace> .
    @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

    <http://purl.org/pundit/as/notebook/89f0d845>  rdf:type
    <http://purl.org/pundit/as/notebook/89f0d845>  rdfs:label	"Notebook 2013-01-14 16:42:05"
    <http://purl.org/pundit/as/notebook/89f0d845>  <http://purl.org/pundit/ont/ao#id>	"89f0d845"
    <http://purl.org/pundit/as/notebook/89f0d845>  dcterms:created	2013-01-14T16:42:05
    <http://purl.org/pundit/as/notebook/89f0d845>  dcterms:creator
    <http://purl.org/pundit/as/notebook/89f0d845>  <http://purl.org/pundit/ont/ao#includes>
        <http://purl.org/pundit/as/annotation/ed57b7a9>
    <http://purl.org/pundit/as/notebook/89f0d845>  <http://purl.org/pundit/ont/ao#includes>
        <http://purl.org/pundit/as/annotation/33024dda>
    <http://purl.org/pundit/as/notebook/89f0d845>  <http://purl.org/pundit/ont/ao#public>	true

##Example of a Pundit annotation represented in RDF

    <http://purl.org/pundit/as/annotation/9713e5ed> a oa:Annotation ;
        dcterms:created "2013-01-14T15:39:12"^^xsd:dateTime ;
        dcterms:creator <http://purl.org/pundit/as/user/6087c731> ;
        dcterms:modified "2013-01-14T15:39:13"^^xsd:dateTime ;
        :hasPageContext <http://localhost:8180/SEMLIB-Client/examples/cortona-example.html> ;
        :id "9713e5ed" ;
        :isIncludedIn <http://purl.org/pundit/as/notebook/969c4157> ;
        :items <http://purl.org/pundit/as/graph/itemsGraph-9713e5ed> ;
        oa:hasBody <http://purl.org/pundit/as/graph/annotationGraph-9713e5ed> ;
        oa:hasTarget
            <http://metasound.dibet.univpm.it/release_bot/build/examples/Battle_of_Montaperti-1.html
                #xpointer(start-point(string-range(... ... )))>,
            <http://metasound.dibet.univpm.it/release_bot/build/examples/AnOtherPage.html
                #xpointer(start-point(string-range(... ... ))> .

    <http://purl.org/pundit/as/notebook/969c4157> :includes <http://purl.org/pundit/as/annotation/9713e5ed>

##Example of a Body named graph

    <http://purl.org/pundit/as/graph/annotationGraph-9713e5ed> {
    <http://metasound.dibet.univpm.it/release_bot/build/examples/Battle_of_Montaperti-1.html
                #xpointer(start-point(string-range(... ... )))>
        :similarTo
            <http://metasound.dibet.univpm.it/release_bot/build/examples/AnOtherPage.html
                #xpointer(start-point(string-range(... ... ))> .

    <http://metasound.dibet.univpm.it/release_bot/build/examples/Battle_of_Montaperti-1.html
                #xpointer(start-point(string-range(... ... )))>
        foaf:Topic http://it.wikipedia.org/wiki/Battaglia_di_Montaperti.

    }

##Example Items named graph

    <http://purl.org/pundit/as/graph/itemsGraph-9713e5ed> {
    foaf:Person	rdfs:label	"Person".
    rdf:Property	rdfs:label	"RDF Property".
    owl:Thing       rdfs:label      "Thing".
    <http://purl.org/pundit/ont/ao#fragment-text>	rdfs:label	"Text Fragment".
    <http://purl.org/net7/korbo/item/73667>	rdf:type	rdf:Property.
    <http://purl.org/net7/korbo/item/73667>	rdfs:label	"identifies person".
    <http://purl.org/net7/korbo/item/73667>	skos:altLabel	"identifies person".
    <http://purl.org/net7/korbo/item/73667>	dc:description	"".
    <http://dbpedia.org/ontology/Artist<	rdfs:label	"Artist".
    <http://dbpedia.org/ontology/Person>	rdfs:label	"Person".
    <http://dbpedia.org/ontology/Agent>	rdfs:label	"Agent".
    <http://schema.org/Person>	        rdfs:label	"Person".
    <http://burckhardtsource.org/[@about='[...]',56)))>
        rdf:type	<http://purl.org/pundit/ont/ao#fragment-text>.
    <http://burckhardtsource.org/[@about='[...]',56)))> rdfs:label	"Holbein".
    <http://burckhardtsource.org/[@about='[...]',56)))> skos:altLabel	"Holbein".
    <http://burckhardtsource.org/[@about='[...]',56)))>
        <http://purl.org/pundit/ont/ao#hasPageContext>
              <http://feed.thepund.it/?url=http://../myurl.rdf&conf=burckhardt.js>.
    <http://burckhardtsource.org/[@about='[...]',56)))> dcterms:isPartOf	<http://../myurl>.

    }