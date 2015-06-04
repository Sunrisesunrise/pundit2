---
layout: page
title: Annotation Server REST API
---

#{{ page.title }}

##1. Support for Cross-domain Requests

The Annotation Server support cross-domain requests using **CORS** and **JSONP**.
CORS is completely transparent to the client and can be used in recent Web browsers for
HTTP requests with methods: **HEAD**, **GET**, **PUT**, **POST**, **DELETE** and **OPTIONS**.
Following, the list of Web browsers that support CORS natively:

* Internet Explorer 8+ (partial support via the XDomainRequest object)
* Mozilla Firefox 3.5+
* Apple Safari 4+
* Google Chrome 3+

Differently to CORS, JSONP can be also used in old Web browsers but only for HTTP GET requests.
To use JSONP for GET requests, a callback function must be specified adding the parameter `“jsonp=”` as shown in the following example.

    GET /annotationserver/api/notebooks/current?jsonp=processData

---

##2. Consuming API

This set of API allow users to get all data and metadata about Notebooks and Annotations in different
formats like: **plain text** (that can also be rendered in HTML pages using stylesheets), **JSON**, **RDF+XML** and **RDF+N3**.

Base URL:  `http://{WEBSERVER ADDRESS}/annotationserver/api`

---

###GET /notebooks/current

Returns the ID of the Notebook where the active user writes annotations by default (current notebook).

####Output Data Formats

  * application/json

####Output Payload Formats

  * `{ "NotebookID": "ID" }`

####Note

For the prototype version of the Annotation Server, all users write on the same notebook.

####Returned Status Code

  * **200 OK**, in case of success
  * **204 No Content**, if there is no active Notebook
  * **400 Bad Request**, if the request is not correct
  * **500 Internal Server Error**, if some internal server errors have occurred


----

###GET /notebooks/public/*{Notebook-ID}*

Check if a specified Notebook is public or not.

####Output Data Formats

* application/json

####Output Payload Formats

* `{ "NotebookPublic": "1|0" }`: 1: the specified Notebooks is Public; 0: the specified Notebook is Private

####Returned Status Code

* **200 OK**, in case of success
* **400 Bad Request**, if the request is not correct
* **403 Forbidden**, if the current logged user has not the correct rights to access to the specified Notebook
* **404 Not Found**, if the specified Notbook does not exist
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /notebooks/private/*{Notebook-ID}*

Check if a specified Notebook is private or not.

####Output Data Formats

* application/json

####Output Payload Formats

* `{ "NotebookPrivate": "1|0" }`: 1: the specified Notebooks is Private; 0: the specified Notebook is Public

####Returned Status Code

* **200 OK**, in case of success
* **400 Bad Request**, if the request is not correct
* **403 Forbidden**, if the current logged user has not the correct rights to access to the specified Notebook
* **404 Not Found**, if the specified Notbook does not exist
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /notebooks/owned

Return the list of all Notebooks owned by the current logged user.

####Output Data Formats

* application/json

####Output Payload Formats

* `{ "NotebookIDs": ["11111111", "22222222"] }`

####Returned Status Code

* **"200 OK"**, in case of success
* **"204 No Content"**, if the current logged user does not own any Notebooks
* **"400 Bad Request"**, if the request is not correct
* **"403 Forbidden"**, if no users is logged or if the current logged user has not the correct rights to access to this API
* **"500 Internal Server Error"**, for internal server error

----

###GET /notebooks/active/*{Notebook-ID}*

Check if a specified Notebook is active or not.

####Output Data Formats

* application/json

####Output Payload Formats

* `{ "NotebookActive": "1|0" }`: 1: the specified Notebooks is set as "active"; 0: the specified Notebook is set as "not active"

####Returned Status Code

* **200 OK**, in case of success
* **400 Bad Request**, if the request is not correct
* **403 Forbidden**, if the current logged user has not the correct rights to access to the specified Notebook
* **404 Not Found**, if the specified Notbook does not exist
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /notebooks/active

Return the list of all active Notebooks for the current logged user.

####Output Data Formats

* application/json

####Output Payload Formats

* `{ "NotebookIDs": ["11111111", "22222222"] }`

####Returned Status Code

* **"200 OK"**, in case of success
* **"204 No Content"**, if there are no active Notebooks for the current logged user
* **"400 Bad Request"**, if the request is not correct
* **"403 Forbidden"**, if no users is logged or if the current logged user has not the correct rights to access to this API
* **"500 Internal Server Error"**, for internal server error

----

###GET /notebooks/*{Notebook-ID}*/metadata

Get all metadata about a specified Notebooks.

####Parameters

* **Notebook-ID**, a valid notebook ID

####Output Data Formats

* application/json
* application/rdf+xml
* text/rdf+n3

The output data format must be specified setting the *Accept* HTTP header.

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no metadata about the specified Notebooks
* **400 Bad Request**, if the notebook ID is not specified or if it is not valid
* **403 Forbidden**, if the current logged user has not the correct right to access the specified Notebook
* **404 Not Found**, if the specified notebook does not exists
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /notebooks/*{Notebook-ID}*/annotations/metadata?limit=*limit*&offset=*offset*&orderby=*orderby*&orderingMode=*1|0*

Get the list of all annotation contained within a Notebook with related metadata.

####Parameters

* **Notebook-ID**, a valid notebook ID
* **limit**, (optional) specify the maximum number of annotations to retrieve. Default: -1 (all annotations)
* **offset**, (optional) specify the starting point from which the annotations will be retrieved. Default: -1 (start from the first annotation)
* **orderby**, (optional) specify the RDF property used to order the annotations. Default: *dc:created*
* **desc**, (optional) specify if the results should be sorted using a descending order (desc=1) or an ascending order (desc=0). Default: 0

####Output Data Formats

* application/json
* application/rdf+xml
* text/rdf+n3

The output data format must be specified setting the *Accept* HTTP header.

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no annotations or triples in the specified notebooks
* **400 Bad Request**, if the notebook ID is not specified or if it is not valid
* **403 Forbidden**, if the current logged user has not the correct right to access the specified Notebook
* **404 Not Found**, if the specified notebook does not exists
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /notebooks/current/graph

For each annotation contained in the current Notebook for the current logged User, return all triples without Annotation’s metadata.

####Parameters

* **Notebook-ID**, a valid notebook ID

####Output Data Formats

* application/json
* application/rdf+xml
* text/rdf+n3

The output data format must be specified setting the *Accept* HTTP header.

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no annotations or triples in the specified notebooks
* **400 Bad Request**, if the notebook ID is not specified or if it is not valid
* **403 Forbidden**, if the current logged user has not the correct right to access the specified Notebook
* **404 Not Found**, if the specified notebook does not exists
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /notebooks/*{Notebook-ID}*/graph

For each annotation contained in the specified Notebook, return all triples without Annotation’s metadata.

####Parameters

* **Notebook-ID**, a valid notebook ID

####Output Data Formats

* application/json
* application/rdf+xml
* text/rdf+n3

The output data format must be specified setting the *Accept* HTTP header.

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no annotations or triples in the specified notebooks
* **400 Bad Request**, if the notebook ID is not specified or if it is not valid
* **403 Forbidden**, if the current logged user has not the correct right to access the specified Notebook
* **404 Not Found**, if the specified notebook does not exists
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /annotations/*{Annotation-ID}*

Return all data about a specified Annotation (metadata + graph + items)

####Parameters

* **Annotation-ID**, a valid Annotation ID

####Output Data Formats

* application/json

The output data format must be specified setting the *Accept* HTTP header. Output example:

        {
            "metadata": {
                // Annotation's metadata
                *JSON/RDF*
            },
            "graph": {
                // Annotation's triples
                *JSON/RDF*
            },
            "items": {
                // Annotation's items
                *JSON/RDF*
            }
        }

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no annotations with the specified Annotation-ID
* **400 Bad Request**, if the Annotation-ID is not specified or if it is not valid
* **403 Forbidden**, if the current logged User has not the correct rights to access to the Notebook that contains the specified Annotation
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /annotations/*{Annotation-ID}*/metadata

Return all metadata about the specified Annotation.

####Parameters

* **Annotation-ID**, a valid Annotation ID

####Output Data Formats

* application/json
* application/rdf+xml
* text/rdf+n3

The output data format must be specified setting the *Accept* HTTP header.

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no annotations with the specified Annotation-ID
* **400 Bad Request**, if the Annotation-ID is not specified or if it is not valid
* **403 Forbidden**, if the current logged User has not the correct rights to access to the Notebook that contains the specified Annotation
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /annotations/*{Annotation-ID}*/graph

Returns all data triples (without metadata) about the specified Annotation.

####Parameters

* **Annotation-ID**, a valid Annotation ID

####Output Data Formats

* application/json
* application/rdf+xml
* text/rdf+n3

The output data format must be specified setting the *Accept* HTTP header.

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no annotations with the specified Annotation-ID
* **400 Bad Request**, if the Annotation-ID is not specified or if it is not valid
* **403 Forbidden**, if the current logged User has not the correct rights to access to the Notebook that contains the specified Annotation
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /annotations/*{Annotation-ID}*/items

Return all Items associated to a given annotation.

####Parameters

* **Annotation-ID**, a valid Annotation ID

####Output Data Formats

* application/json
* application/rdf+xml
* text/rdf+n3

The output data format must be specified setting the *Accept* HTTP header.

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no annotations with the specified Annotation-ID
* **400 Bad Request**, if the Annotation-ID is not specified or if it is not valid
* **403 Forbidden**, if the current logged User has not the correct rights to access to the Notebook that contains the specified Annotation
* **500 Internal Server Error**, if some internal server errors have occurred

---

##3. Open API

This set of API are consuming API that rely on public data and thus they do not require any authentication process.

Base URL: `http://{WEBSERVER ADDRESS}/annotationserver/api/open`

###GET /notebooks/public

Return a list of all public Notebooks.

####Output Data Formats

* application/json

####Output Payload Formats

* `{ "NotebookIDs": ["11111111", "22222222"] }`

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no public Notebooks
* **400 Bad Request**, if the request is not valid
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /notebooks/*{Notebook-ID}*

Return the list of all annotations contained within a Notebook with related metadata.

####Output Data Formats

* application/json

The output data format must be specified setting the *Accept* HTTP header. Output example:

        {
            "metadata": {
                // Notebook's metadata
               *JSON/RDF*
            },
           "annotations": [
               {
                   "metadata": {
                   // Annotation's metadata
                   *JSON/RDF*
               },
               "graph": {
                   // Annotation's triples
                   *JSON/RDF*
               },
               "items": {
                   // Annotation's items
                   *JSON/RDF*
               }
           },
           {
               "metadata": {
                   // Annotation's metadata
                   *JSON/RDF*
               },
               "graph": {
                   // Annotation's triples
                   *JSON/RDF*
               },
               "items": {
                   // Annotation's items
                   *JSON/RDF*
               }
           },
           .......
           ]
        }

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no annotations with the specified Annotation-ID
* **400 Bad Request**, if the request is not valid
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /notebooks/*{Notebook-ID}*/metadata

Get all metadata about a specified Notebooks.

####Parameters

* **Notebook-ID**, a valid notebook ID

####Output Data Formats

* application/json
* application/rdf+xml
* text/rdf+n3

The output data format must be specified setting the *Accept* HTTP header.

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no metadata about the specified Notebooks
* **400 Bad Request**, if the notebook ID is not specified or if it is not valid
* **404 Not Found**, if the specified notebook does not exists
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /notebooks/*{Notebook-ID}*/annotations/metadata?limit=*limit*&offset=*offset*&orderby=*orderby*&orderingMode=*1|0*

Get the list of all annotation contained within a Notebook with related metadata.

####Parameters

* **Notebook-ID**, a valid notebook ID
* **limit**, (optional) specify the maximum number of annotations to retrieve. Default: -1 (all annotations)
* **offset**, (optional) specify the starting point from which the annotations will be retrieved. Default: -1 (start from the first annotation)
* **orderby**, (optional) specify the RDF property used to order the annotations. Default: *dc:created*
* **desc**, (optional) specify if the results should be sorted using a descending order (desc=1) or an ascending order (desc=0). Default: 0

####Output Data Formats

* application/json
* application/rdf+xml
* text/rdf+n3

The output data format must be specified setting the *Accept* HTTP header.

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no annotations or triples in the specified notebooks
* **400 Bad Request**, if the notebook ID is not specified or if it is not valid
* **404 Not Found**, if the specified notebook does not exists
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /notebooks/*{Notebook-ID}*/graph

For each annotation contained in the specified Notebook, return all triples without Annotation’s metadata.

####Parameters

* **Notebook-ID**, a valid notebook ID

####Output Data Formats

* application/json
* application/rdf+xml
* text/rdf+n3

The output data format must be specified setting the *Accept* HTTP header.

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no annotations or triples in the specified notebooks
* **400 Bad Request**, if the notebook ID is not specified or if it is not valid
* **404 Not Found**, if the specified notebook does not exists
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /annotations/*{Annotation-ID}*/metadata

Return all metadata about the specified Annotation.

####Parameters

* **Annotation-ID**, a valid Annotation ID

####Output Data Formats

* application/json
* application/rdf+xml
* text/rdf+n3

The output data format must be specified setting the *Accept* HTTP header.

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no annotations with the specified Annotation-ID
* **400 Bad Request**, if the Annotation-ID is not specified or if it is not valid
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /annotations/*{Annotation-ID}*/graph

Returns all data triples (without metadata) about the specified Annotation.

####Parameters

* **Annotation-ID**, a valid Annotation ID

####Output Data Formats

* application/json
* application/rdf+xml
* text/rdf+n3

The output data format must be specified setting the *Accept* HTTP header.

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no annotations with the specified Annotation-ID
* **400 Bad Request**, if the Annotation-ID is not specified or if it is not valid
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /annotations/*{Annotation-ID}*/items

Return all Items associated to a given annotation.

####Parameters

* **Annotation-ID**, a valid Annotation ID

####Output Data Formats

* application/json
* application/rdf+xml
* text/rdf+n3

The output data format must be specified setting the *Accept* HTTP header.

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no annotations with the specified Annotation-ID
* **400 Bad Request**, if the Annotation-ID is not specified or if it is not valid
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /metadata/search?query=*query*

Searches for all Annotation’s metadata according to the specified parameters. In the current version, the only supported searching parameter is *resources*. Specifying one or more resources, this API return all metadata of Annotations that have one of the specified resource as *hasTarget* and *hasPageContext*. In addition, this API returns all metadata of Annotations that have as *hasTarget* a resource that *isPartOf* of one of the specified resources.

####Parameters

* **query**, specify the searching parameters. These parameters must be in JSON format. Example of searching parameters: `{ ”resources”: [”URL1”, ”URL2”, ...] }`

####Request Headers and Output Data Formats

* **Accept*** (mandatory), specify the encoding format of the output payload. Possible values: *application/json*, *application/rdf+xml*, *text/rdf+n3*

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no metadata according to the specified searching parameters
* **400 Bad Request**, if the request is not correct or if the searching parameters are not correct
* **500 Internal Server Error**, if some internal server errors have occurred

---

###GET /count/search?query=*query*&scope=all

Retrieves all resources whose URL matches the query and that are involved in at lest one annotation. For each resource returns its URL and the corresponding number of annotations.
For example the query "mywebsite.org" could match the following URLs: "http://mywebsite.org/index.html", "http://mywebsite.org/blog/posts/1.php", "http://mywebsite.org/imgs/picture_1.jpg".

A resource is involved in an annotation when:
 - It is the target of the annotation (using oa:hasTarget RDF property). ;
 - Is the page context of the annotation, which is the web page containing some target of the annotation, e.g. a picture is contained in a we page, or even in different ones at the same time. (using pundit:hasPageContext RDF property)
 - The target of the annotation is a part of the resource. For example an annotation could target a fragment of text contained in a web page or in a named-content. A named-content is simply an HTML content marked with a stable URL (see http://www.thepund.it/documentation/play-nice-with-pundit/).

Note: An annotation can involve more that one resource (e.g. two distinct images from the same web page).

####Parameters

* **query**, specify the searching parameters. These parameters must be in JSON format.

examples:

`{ ”resources”: [”REGEX1”, ”REGEX2”, ...]}`

OR

`{ ”resources”: [”REGEX1”, ”REGEX2”, ...], "startDate":"date-in-xsd-format","endDate":"date-in-xsd-format" }`
**startDate** and  **endDate** are optional parameters that delimitate research to Annotation created after  startDate value or before endDate value

####Output Data Formats

Return  *application/json*, file

      {  "URI3_MATCHING_REGEX1":5,
         "URI2_MATCHING_REGEX2":12,
         "URI1_MATCHING_REGEX1":2,
         ...
       }

The first element rapresent the url that match at least one regular expression passed as argument, the second one instead the number of Annotations that contain the uri as  *hasTarget* and *hasPageContext* property

####Returned Status Code

* **200 OK**, in case of success
* **400 Bad Request**, if the request is not correct or if the searching parameters are not correct
* **500 Internal Server Error**, if some internal server errors have occurred


---

##4. Authoring API

This set of API allow user to create new notebooks and annotations as well as edit or delete existing ones and modify their metadata.

Base URL:  `http://{WEBSERVER ADDRESS}/annotationserver/api`

####PUT /notebooks/public/*{Notebook-ID}*

Set the specified Notebook as Public.

####Returned Status Code

* **200 OK**, in case of success
* **400 Bad Request**, if the request is not correct
* **403 Forbidden**, if the current logged user has not the correct rights to access to the specified Notebook
* **404 Not Found**, if the specified Notbook does not exist
* **500 Internal Server Error**, if some internal server errors have occurred

----

###PUT /notebooks/private/*{Notebook-ID}*

Set the specified Notebook as Private.

####Returned Status Code

* **200 OK**, in case of success
* **400 Bad Request**, if the request is not correct
* **403 Forbidden**, if the current logged user has not the correct rights to access to the specified Notebook
* **404 Not Found**, if the specified Notbook does not exist
* **500 Internal Server Error**, if some internal server errors have occurred

----

###DELETE /notebooks/private/*{Notebook-ID}*

Set the specified Notebook as Public. This API is an alias of the API `PUT /notebooks/*{Notebook-ID}*/public

####Returned Status Code

* **200 OK**, in case of success
* **400 Bad Request**, if the request is not correct
* **403 Forbidden**, if the current logged user has not the correct rights to access to the specified Notebook
* **404 Not Found**, if the specified Notbook does not exist
* **500 Internal Server Error**, if some internal server errors have occurred

----

###DELETE /notebooks/public/*{Notebook-ID}*

Set the specified Notebook as Private. This API is an alias of the API `PUT /notebooks/*{Notebook-ID}*/private

####Returned Status Code

* **200 OK**, in case of success
* **400 Bad Request**, if the request is not correct
* **403 Forbidden**, if the current logged user has not the correct rights to access to the specified Notebook
* **404 Not Found**, if the specified Notbook does not exist
* **500 Internal Server Error**, if some internal server errors have occurred

----

###PUT /notebooks/current/*{Notebook-ID}*

Set the specified Notebooks as "current". If another Notebook is already set as "current", this API set it as "not current".

####Returned Status Code

* **200 OK**, in case of success
* **400 Bad Request**, if the request is not correct
* **403 Forbidden**, if the current logged user has not the correct rights to access to the specified Notebook
* **404 Not Found**, if the specified Notbook does not exist
* **500 Internal Server Error**, if some internal server errors have occurred

----

###PUT /notebooks/active/*{Notebook-ID}*

Activate a specified Notebook

####Returned Status Code

* **200 OK**, in case of success
* **400 Bad Request**, if the request or the specified Notebooks ID is not correct
* **403 Forbidden**, if the current logged user has not the correct rights to access to the specified Notebook
* **404 Not Found**, if the specified Notbook does not exist
* **500 Internal Server Error**, if some internal server errors have occurred

----

###DELETE /notebooks/active/*{Notebook-ID}*

Deactivate a specified Notebook. By default a Notebook set as current can not be deactivated. If a user try to deactivate a Notebook that is set as current, this API return a 403 HTTP error.

####Returned Status Code

* **200 OK**, in case of success
* **400 Bad Request**, if the request or the specified Notebooks ID is not correct
* **403 Forbidden**, if the current logged user has not the correct rights to access to the specified Notebook
* **404 Not Found**, if the specified Notbook does not exist
* **500 Internal Server Error**, if some internal server errors have occurred

----

###POST /notebooks/

Creates a new Notebook. This API return the ID of the created Notebook in response’s payload in JSON format and the full URL of the Notebook adding a *Location* header into the HTTP response. The name of the new Notebook can be specified sending a specific payload.

####Request Payload

* Payload must be encoded in JSON format and it is optional. If the Notebook’s name is not specified, the Annotation Server will create a new Notebook with a default name (e.g. Notebook 27-09-2011). Payload format: `{ ”NotebookName”: ”My new Notebook” }`

####Request Headers

* **Content-Type**, required if the request includes the payload to specify the notebook’s name. Possible values: *application/json*

####Otuput Data Formats

* **Data format**: application/json, the ID of the new Notebooks. Response example: `{ ”NotebookID”: ”4C82F27D” }`

####Returned Status Code

* **201 Created**, in case of success
* **400 Bad Request**, if the request is not correct or if the request’s payload is not valid
* **500 Internal Server Error**, if some internal server errors have occurred

----

###POST /notebooks/*{Notebook-ID}*?context=*{JSON-DATA}*

Creates a new Annotation with a unique ID in the specified Notebooks. The Annotation’s triples must be sent in JSON format in the request’s payload. The payload must contains the Annotation's triples and optionally the Annotation's items. The ID of the new Annotation is returned to the client in the response’s payload. This API also returns the full URL of the created Annotation adding a *Location* header into the HTTP response. This is the API that should always used to create new Annotations.

####Parameters

* **Notebook-ID**, a valid Notebook ID
* **JSON-DATA** (optional), additional annotation metadata in JSON format. The JSON data must be URL encoded. Example of JSON-DATA: `{ ”targets”: [ ”URL1”, ”URL2”, ..], ”pageContext”: ”URL3” }`

####Request Payload

* Request’s payload must contains the Annotation’s triples encoded in JSON/RDF and optionally the Annotation's items in JSON/RDF format. Example:

        {
            "graph": {
                // Annotation's triples
                *JSON/RDF*
            },
            "items": {
                // Annotation's items
                *JSON/RDF*
            }
        }

####Request Headers and Input Data Formats

* **Content-Type**, specify the encoding of the input payload. Possible values: *application/json*

####Output Format and Data

* **Data format**: *application/json*, the ID of the new Annotation. Response example: `{ ”AnnotationID”: ”AF82E22D”}`

####Returned Status Code

* **201 Created**, in case of success
* **400 Bad Request**, if the request is not correct or if the request’s payload is not valid
* **403 Forbidden**, if the current logged user has not the correct right to create a new Annotation into the specified Notebook
* **500 Internal Server Error**, if some internal server errors have occurred

----

###POST /notebooks/graph/*{Notebook-ID}*?context=*{JSON-DATA}*

Creates a new Annotation with a unique ID in the specified Notebooks. The Annotation’s triples must be sent in the request’s payload. The ID of the new Annotation is returned to the client in the response’s payload. This API also returns the full URL of the created Annotation adding a *Location* header into the HTTP response.

####Parameters

* **Notebook-ID**, a valid Notebook ID
* **JSON-DATA** (optional), additional annotation metadata in JSON format. The JSON data must be URL encoded. Example of JSON-DATA: `{ ”targets”: [ ”URL1”, ”URL2”, ..], ”pageContext”: ”URL3” }`

####Request Payload

* Request’s payload must contains the Annotation’s triples encoded using one of the supported data formats, which must be specified by the *Content-Type* header of the HTTP request.

####Request Headers and Input Data Formats

* **Content-Type**, specify the encoding of the input payload. Possible values: *application/json*, *application/rdf+xml*, *text/rdf+n3*

####Output Format and Data

* **Data format**: *application/json*, the ID of the new Annotation. Response example: `{ ”AnnotationID”: ”AF82E22D”}`

####Returned Status Code

* **201 Created**, in case of success
* **400 Bad Request**, if the request is not correct or if the request’s payload is not valid
* **403 Forbidden**, if the current logged user has not the correct right to create a new Annotation into the specified Notebook
* **500 Internal Server Error**, if some internal server errors have occurred

----

###POST /notebooks/current

Create a new Annotation e put it into the default Notebooks of the current active user. The Annotation’s triples must be sent in the request’s payload. The ID of the new Annotation is returned to the client in the response’s payload. This API also returns the full URL of the created Annotation adding a *Location* header into the HTTP response.

####Request Payload

Request’s payload must contains the Annotation’s triples encoded using one of the supported data formats, which must be specified by the *Content-Type* header of the HTTP request.

####Request Headers and Input Data Formats

* **Content-Type**, specify the encoding of the input payload. Possible values: *application/json*, *application/rdf+xml*, *text/rdf+n3*

####Output Format and Data

* **Data format**: *application/json*, the ID of the new Annotation. Response example: `{ ”AnnotationID”: ”AF82E22D”}`

####Returned Status Code

* **201 Created**, in case of success
* **400 Bad Request**, if the request is not correct or if the request’s payload is not valid
* **403 Forbidden**, if the current logged User has not the correct rights to create a new Annotation into the current Notebook
* **500 Internal Server Error**, if some internal server errors have occurred

----

###POST /annotations/*{Annotation-ID}*

Add new triples to an already existing Annotations. This API does not duplicate already existing triples. The new triples must be sent in the request’s payload and must be encoded in one of the supported data formats.

####Parameters

* **Annotation-ID**, the ID of an existing Annotation

####Request Payload

* Request’s payload must contains the Annotation’s triples encoded using one of the supported data formats, which must be specified by the **Content-Type** header of the HTTP request

####Request Headers and Input Data Formats

* **Content-Type**, specify the encoding of the input payload. Possible values: *application/json*, *application/rdf+xml*, *text/rdf+n3*

####Returned Status Code

* **200 Ok**, in case of success
* **400 Bad Request**, if the request is not correct, if the request’s payload or if the Annotation ID is not valid
* **403 Forbidden**, if the current logged User has not the correct right to edit the specified Annotation
* **404 Not Found**, if the specified Annotation does not exists
* **500 Internal Server Error**, if some internal server errors have occurred

----

###PUT /notebooks/*{Notebook-ID}*

Modify the metadata of an existing Notebook. In the current version, this API can be used only to change the Notebook’s name. The new Notebook’s name must be sent as request’s payload and must be encoded in JSON format.

####Parameters

* **Notebook-ID**, the ID of an existing Notebook

####Request Payload

* Payload must be encoded in JSON format. Payload format: `{ ”NotebookName”: ”My new Notebook” }`

####Request Headers

* **Content-Type**, specify the payload data type. Possible values: *application/json*

####Returned Status Code

* **200 Ok**, in case of success
* **400 Bad Request**, if the request is not correct, if the request’s payload or if the Notebook ID is not valid
* **403 Forbidden**, if the current logged User has not the correct rights to edit the specified Notebook
* **404 Not Found**, if the specified Annotation does not exists
* **500 Internal Server Error**, if some internal server errors have occurred

----

###PUT /annotations/*{Annotation-ID}*/content

Overwrites the triples of an existing Annotation and modifies the related metadata (e.g. modified date). The new triples must be sent in the request’s payload and must be encoded in one of the supported data formats.

####Parameters

* **Annotation-ID**, the ID of an existing Annotation

####Request Payload

* Request’s payload must contains the Annotation’s triples encoded using one of the supported data formats, which must be specified by the *Content-Type* header of the HTTP request

####Request Headers

* **Content-Type**, specify the payload data type. Possible values: *application/json*, *application/rdf+xml*, *text/rdf+n3*

####Returned Status Code

* **200 OK**, in case of success
* **400 Bad Request**, if the request is not correct, if the request’s payload or if the Annotation ID is not valid
* **403 Forbidden**, if the current logged User has not the correct rights to edit the specified Annotation
* **404 Not Found**, if the specified Annotation does not exists
* **500 Internal Server Error**, if some internal server errors have occurred

----

###POST /annotations/*{Annotation-ID}*/items

Add new Items to an existig annotation specified by the annotation ID.

####Parameters

* **Annotation-ID**, the ID of an existing Annotation

####Request Payload

* Request’s payload must contains the Annotation’s Items encoded using one of the supported data formats, which must be specified by the *Content-Type* header of the HTTP request

####Request Headers

* **Content-Type**, specify the payload data type. Possible values: *application/json*, *application/rdf+xml*, *text/rdf+n3*

####Returned Status Code

* **200 OK**, in case of success
* **400 Bad Request**, if the request is not correct, if the request’s payload or if the Annotation ID is not valid
* **403 Forbidden**, if the current logged User has not the correct rights to edit the specified Annotation
* **404 Not Found**, if the specified Annotation does not exists
* **500 Internal Server Error**, if some internal server errors have occurred

----

###PUT  /annotations/*{Annotation-ID}*/items

Overwrite triples of an existig annotation specified by the annotation ID.

####Parameters

* **Annotation-ID**, the ID of an existing Annotation

####Request Payload

* Request’s payload must contains the Annotation’s Items encoded using one of the supported data formats, which must be specified by the *Content-Type* header of the HTTP request

####Request Headers

* **Content-Type**, specify the payload data type. Possible values: *application/json*, *application/rdf+xml*, *text/rdf+n3*

####Returned Status Code

* **200 OK**, in case of success
* **400 Bad Request**, if the request is not correct, if the request’s payload or if the Annotation ID is not valid
* **403 Forbidden**, if the current logged User has not the correct rights to edit the specified Annotation
* **404 Not Found**, if the specified Annotation does not exists
* **500 Internal Server Error**, if some internal server errors have occurred

----

###DELETE /notebooks/*{Notebook-ID}*

Delete the Notebook with the specified ID. If the notebook contains some Annotations, this API also deletes all Annotations contained within it.

####Parameters

* **Notebook-ID**, the ID of an existing Notebook

####Returned Status Code

* **204 No Content**, in case of success
* **400 Bad Request**, if the request is not correct or if the Notebook ID is not valid
* **403 Forbidden**, if the current logged User has not the correct rights to delete the specified Notebooks
* **404 Not Found**, if the specified Notebook does not exists
* **500 Internal Server Error**, if some internal server errors have occurred

----

###DELETE /annotations/*{Annotation-ID}*

Delete the Annotation with the specified ID.

####Parameters

* **Annotation-ID**, the ID of an existing Annotation

####Returned Status Code

* **204 No Content**, in case of success
* **400 Bad Request**, if the request is not correct or if the Annotation ID is not valid
* **403 Forbidden**, if the current logged User has not the correct rights to edit the specified Annotation
* **404 Not Found**, if the specified Annotation does not exists
* **500 Internal Server Error**, if some internal server error will occur

---

##5. Searching API

This set of API allow users to search for Notebooks and Annotations basing on specific searching parameters. The prototype version of the Annotation Server provides only a single searching API with simple searching parameters.

Base URL:  `http://{WEBSERVER ADDRESS}/annotationserver/api`

###GET /notebooks/*{Notebook-ID}*/search?query=**query**

Searches for all Annotation’s metadata in a specified Notebook according to the specified parameters. In the current version, the only supported searching parameter is *resources*. Specifying one or more resources, this API return all metadata of Annotations that have one of the specified resource as *hasTarget* and *hasPageContext*. In addition, this API returns all metadata of Annotations that have as *hasTarget* a resource that *isPartOf* of one of the specified resources.

####Parameters

* **query**, specify the searching parameters. These parameters must be in JSON format.

####Request Headers and Output Data Formats

* **Accept*** (mandatory), specify the encoding format of the output payload. Possible values: *application/json*, *application/rdf+xml*, *text/rdf+n3*

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no metadata according to the specified searching parameters
* **400 Bad Request**, if the request is not correct or if the searching parameters are not correct
* **403 Forbidden**, if the current logged User has not the correct rights to read the specified Notebooks
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /annotations/metadata/search?query=*query*

Searches for all Annotation’s metadata according to the specified parameters. In the current version, the only supported searching parameter is *resources*. Specifying one or more resources, this API return all metadata of Annotations that have one of the specified resource as *hasTarget* and *hasPageContext*. In addition, this API returns all metadata of Annotations that have as *hasTarget* a resource that *isPartOf* of one of the specified resources.

####Parameters

* **query**, specify the searching parameters. These parameters must be in JSON format. Example of searching parameters: `{ ”resources”: [”URL1”, ”URL2”, ...] }`
* **scope**, possible values: **all** (default), search in all public Notebooks; **active**, search in all Notebook set as "active" by the current logged user

####Request Headers and Output Data Formats

* **Accept*** (mandatory), specify the encoding format of the output payload. Possible values: *application/json*, *application/rdf+xml*, *text/rdf+n3*

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no metadata according to the specified searching parameters
* **400 Bad Request**, if the request is not correct or if the searching parameters are not correct
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /annotations/*{Annotation-ID}*/items/search

Search for all annotation's Items basing on specific searching parameters.

####Parameters

* **Annotation-ID**, a valid Annotation ID
* **query**,  specify the searching parameters. These parameters must be in JSON format.

####Output Data Formats

* application/json
* application/rdf+xml
* text/rdf+n3

The output data format must be specified setting the *Accept* HTTP header.

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if there are no annotations with the specified Annotation-ID
* **400 Bad Request**, if the Annotation-ID is not specified or if it is not valid
* **403 Forbidden**, if the current logged User has not the correct rights to access to the Notebook that contains the specified Annotation
* **500 Internal Server Error**, if some internal server errors have occurred

---

##6. Users API

This set of API can be used to obtain all information about a registered user of the AnnotationServer or to perform specific operations regarding users management.

Base URL:  `http://{WEBSERVER ADDRESS}/annotationserver/api/`

###GET /users/current

Return all information about the current logged user in JSON format. The API can return different results basing on the login status of the current user (see Output Data Model section for more information).

####Output Data Formats

* application/json

####Output Data Model

1. For logged users

        { “loginStatus”: 1,
          "id": "USER_ID",
          "uri": "USER_ID_URI",
          "openID": "USER_OPENID",
          “firstName”: “FIRST_NAME”,
          “lastName”: “LAST_NAME”,
          “fullName”: “FULLNAME”,
          "email": "EMAIL_ADDRESS" }

2. Not logged user

        { “loginStatus”: 0,
          “loginServer”:  “URL_TO_LOGIN_SERVER”}

About the returned JSON for logged users: `USER_ID` is a value that is independent from the user's openID (example: 3C9AFF08); `USER_ID_URI` is the URI generated starting from the `USER_ID` (example: `http://swickynotes.org/notebook/resource/3c9aff08`); `USER_OPRNID` is the user's OpenID URI. Other fields such as `firstName`, `lastName`, `fullName`, `email` are optional.


####Returned Status Code

* **200 Ok**, in case of success
* **500 Internal Server Error***, if some internal server errors have occurred

----

###GET /users/logout

Logout the current logged user and return the results of the logout operation as JSON data (see Output Data Model for more information).

####Output Data Formats

* application/json

####Output Data Model

1. If this API is called when the user is not logged yet, it returns this JSON data: `{ “logout”: 0 }`
2. if this API is called when the user is logged and the logout process is correctly performed, it returns this JSON data: `{ “logout”: 1 }`

####Returned Status Code

* **200 Ok**, in case of success
* **500 Internal Server Error***, if some internal server errors have occurred

----

###GET /users/*{USER-ID}*

Return all information about a specified user in different data formats.

####Parameters

* **user-id**, a valid user ID

####Output Data Formats

* application/json
* application/rdf+xml
* text/rdf+n3

The output data format must be specified setting the *Accept* HTTP header.

####Returned Status Code

* **200 OK**, in case of success
* **400 Bad Request**, if the user ID is not specified or if it is not valid
* **404 Not Found**, if the specified user does not exist
* **500 Internal Server Error***, if some internal server errors have occurred

---

##5. Services API

This set of API contains the implementation of useful services for the AnnotationServer.

Base URL:  `http://{WEBSERVER ADDRESS}/annotationserver/api/services/`

###GET /proxy?url=*ENCODED_URL*

This API implement an HTTP transparent proxy. In can be used to download any textual contents or files that is hosted in third party servers in order to overcome the limits imposed by *the same-origin-policy*. This API return the same *Content-Type* and the same  HTTP response code returned by the original request (same *Content-Type* and same HTTP response code returned if the user request the *ENCODED_URL* without using the proxy). If the server the hosted the resource identified by the *ENCODED_URL* supports different output data formats, it is possible to specify the preferred data format specifying the *Accept* header before sending the request to the proxy.

####Parameters

* **ENCODED_URL**, the encoded absolute URL of the resource to download

####Returned Status Code

* **400 Bad Request**, if the request is not correct or if the requested resource is hosted in a server that does not support the HTTP protocol (e.g. FTP server)
* **403 Forbidden**, if the current logged user has not the correct rights to use the proxy service
* **406 Not Acceptable**, if the type (mime-type) of the requested resource is not supported by the proxy (e.g. binary file. See also the proxy configuration parameters.
* **500 Internal Server Error**, if some internal server errors have occurred
* Other HTTP status codes returned by the server that host the resource identified by the specified *ENCODED_URL* parameter

---

###POST /favorites

This API provides a storage for general data mapping the data itself with a key called *favorites*. The data must be sent as payload. The API is independent from the sent data format.

####Request Payload

* Data to store

####Returned Status Code

* **200 OK**, in case of success
* **400 Bad Request**, if the payload is not specified or is not valid
* **403 Forbidden**, if the current logged User has not the correct rights to use the general storage service
* **503 Forbidden**, if the user is not logged and the authentication in the Annotation Server is enabled
* **500 Internal Server Error**, if some internal server errors have occurred

----

###GET /favorites

This API return all stored data mapped with the key *favorites* related to the current logged user (if the authentication is enabled) or to the anonymous user.

####Output Data Formats

* Any (the client have to interpret the data)

####Returned Status Code

* **200 OK**, in case of success
* **204 No Content**, if no data has been mapped with the key *favorites*
* **403 Forbidden**, if the current logged User has not the correct rights to use the general storage service
* **503 Forbidden**, if the user is not logged and the authentication in the Annotation Server is enabled
* **500 Internal Server Error**, if some internal server errors have occurred

----

###POST /email

Given a Subject, Text, Name, Email and Identifier it creates an email  and send it to all receivers listed into 'identifier' field stored into  DB table 'emails'

####Parameters

* **SUBJECT**, the email subject
* **TEXT**, the email text
* **NAME**, the sender's name
* **EMAIL**, the sender's email
* **IDENTIFIER**, the identifier list for receivers

####Output Data Formats

* None

####Returned Status Code

* **200 OK**, in case of success
* **400 Bad Request**, if the payload is not specified or is not valid
* **500 Internal Server Error**, if some internal server errors have occurred or identifier not found