---
layout: page
title: Pundit Resource annotation
---

# {{ page.title }}

## 1. What is Resource annotation

Besides text fragment and page annotation, Pundit allows you to create annotations **related to a unique resource or entity** identified by an URI. In this case the **target** of the annotation is the resource and the related annotations will be displayed in any page where the resource is included.

The **data model** for this use case extends the [W3C Web Annotation Working Group](https://www.w3.org/annotation/) guidelines and you can find full details of the model here: [Pundit Web Annotation Data Model 1.1](https://docs.google.com/spreadsheets/d/10XXQ5KrFZbFqKxiFhuVBQrWdSxbXd85cCYYmrXE23QQ/edit#gid=292399002).

This use case was originally developed for the [Europeana Sounds](http://www.europeanasounds.eu/) project.

## 2. How to implement Resource annotation

Resource annotation can be easily achieved by adding a snippet of code in your HTML that includes the URI of the resource.

The code you have to include is this:

	<!--PUNDIT PIN-->
	<span about="http://your-resource-unique-identifier/123456" class="pnd-resource"></span>
	<!--END PUNDIT PIN-->

You have to replace the demo URL **"http://your-resource-unique-identifier/123456"** with your own URI for the resource.

Then Pundit will replace this snippet of code with a button that allows users to annotate the resource, leaving a comment or using it as subject or object of a semantic annotation.

## 3. Configuration parameters

These are the configuration parameters for this feature:

### ResourceAnnotator.annotationButton

Allows to add a label to the button with a custom string. Requires a *boolean* value.

### ResourceAnnotator.annotationButtonLabel

Defines the custom string that will be added to the button. Requires a *string*.

This is an example snippet of the configuration file:

	modules: {
		...,
		'ResourceAnnotator': {
    		annotationButton: true,
    		annotationButtonLabel: "Annotate"
    	 },
    	 ...
    }
