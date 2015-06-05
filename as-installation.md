---
layout: page
title: Annotation Server installation
---

#{{ page.title }}

##1. Prerequisites

  - **Tomcat 6** or **Tomcat 7** installed via zip.
  - **Sesame 2.7** (see *2. Sesame installation*).
  - **Apache** server.
  - **Facebook** and **Google** application (you need Facebook and/or Google applications for Facebook and Google Sign-in feature).

---

##2. Annotation server installation

1. Download the <a href="https://net7.codebasehq.com/upload/68f95571-ebde-8988-679d-863f7efb7ea9/show/original">Annotation Server Zip</a> and unzip it.
1. Copy `./web/WEB-INF/web-example.xml` in `./web/WEB-INF/web.xml`.
2. Substitute *{hostname}:{port}* with your hostname and port (tomcat service) in `./web/WEB-INF/web.xml`.
3. Install and check check RDBMS connection in **DATABASE Repository Configurations**:
    - in order to create DB Schema and Tables run:<br />
   `mysql -u user -ppassword < ./database/annotationserver.sql`<br />
    the database name will be **annotationserver**.

4. Install and Check check SESAME connection  in **SESAME Repository Configurations**
 - Download and untar sesame from http://www.openrdf.org/download.jsp and copy `openrdf-sesame.war`
 and `openrdf-workbench.war` in ${TOMCAT_HOME}/webapps/.
 - Create sesame home directory `mkdir -p /usr/share/tomcat7/.aduna`.
 - Give permissions to it `chown -R tomcat7:tomcat7 /usr/share/tomcat7/`.
 - Relaunch tomcat: `service tomcat7 restart`
 - Go to *http://{hostanme}:{port}/openrdf-workbench* and create new repository called *pundit*. the name MUST be the same of *eu.semlibproject.annotationserver.config.db.id* of your *web.xml*.


6. Authentication.<br />
  6.1 In `web.xml` property *eu.semlibproject.annotationserver.config.authentication.enabled*
    - **NO** is for testing in standalone mode (eg:running junit)
    - **YES** is for testing with pundit client
    
  6.2 Then in **./src/java/eu/semlibproject/annotationserver/servlets/login_authentication.properties** set the credentials


---

##3. Build & create package

First open file `nbproject/project.properties` and modify following properties with your local tomcat installation:


    j2ee.server.type=Tomcat
    j2ee.server.home={TOMCAT_HOME}
    j2ee.server.instance=tomcat70:home={TOMCAT_HOME}


then into the main directory run `ant dist`.

---

##4. Deploy Annotation Server

Copy `./dist/annotationserver.war]` into `{TOMCAT_HOME}/webapps/` and run tomcat `{TOMCAT_HOME}/bin/startup.sh`.

---

##5. Check running application

Go to `http://{hostname}:{port}/annotationserver` to see welcome page with some configurations form `web.xml`.

---
