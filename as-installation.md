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

5. Oauth configuration (for installation see next section).<br />
In `web.xml` you have to configure the following paramters:

        <context-param>
            <description>Endpoint for API rest</description>
            <param-name>eu.semlibproject.annotationserver.config.apiendpointurl</param-name>
            <param-value>http://{hostname}.oauth/annotationserver{-test}</param-value>
         </context-param>
         <context-param>
             <description>oAuth2 Token endpoint</description>
             <param-name>eu.semlibproject.annotationserver.config.oauth2.token_endpoint</param-name>
             <param-value>http://{hostname}.oauth/oauth/v2/token</param-value>
         </context-param>
         <context-param>
             <description>oAuth2 Authorization endpoint</description>
             <param-name>eu.semlibproject.annotationserver.config.oauth2.authz_endpoint</param-name>
             <param-value>http://{hostname}.oauth/oauth/v2/auth</param-value>
         </context-param>
         <context-param>
             <description>oAuth2 Client ID</description>
             <param-name>eu.semlibproject.annotationserver.config.oauth2.client_id</param-name>
             <param-value>client ID della app symfony creata nel passo precedente</param-value>
         </context-param>
         <context-param>
             <description>oAuth2 Client Secret</description>
             <param-name>eu.semlibproject.annotationserver.config.oauth2.client_secret</param-name>
             <param-value>client secret della app symfony creata nel passo precedente</param-value>
         </context-param>
         <context-param>
             <description>oAuth2 User Info</description>
             <param-name>eu.semlibproject.annotationserver.config.oauth2.user_info</param-name>
             <param-value>http://{hostname}.oauth/oauth/v2/auth/me</param-value>
         </context-param>
         <context-param>
            <description>oAuth2 User Modification</description>
            <param-name>eu.semlibproject.annotationserver.config.oauth2.user_edit</param-name>
            <param-value>http://{hostname}.oauth/pundit_login/edit_profile</param-value>
        </context-param>


6. Authentication.<br />
In `web.xml` property *eu.semlibproject.annotationserver.config.authentication.enabled*
 - **NO** is for testing in standalone mode (eg:running junit)
 - **YES** is for testing with pundit client

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

##6. Oauth symfony service installation

You have to install **apache** service.<br />
Prerequisite section of
https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-14-04-lts

1. Download `http://path/to/oauth-symphony.zip` and unzip into your `/var/www`.

2. Install composer:<br />
`cd oauth`<br />
`curl -sS https://getcomposer.org/installer | php`

3. Launch bundle installations `php composer.phar install`

4. If you get a language error, in your `php.ini` change `date.timezone=“Europe/Rome”`

5. You have to modify OAuth2.php `getClientCredentials` method into:


        protected function getClientCredentials(array $inputData, array $authHeaders)
         {
            // Basic Authentication is used
            //if (!empty($authHeaders['PHP_AUTH_USER'])) {
            //    return array($authHeaders['PHP_AUTH_USER'], $authHeaders['PHP_AUTH_PW']);
            //}
            if (empty($inputData['client_id'])) { // No credentials were specified
                throw new OAuth2ServerException(self::HTTP_BAD_REQUEST, self::ERROR_INVALID_CLIENT, 'Client id was not found in the headers or body');
            } else {
                // This method is not recommended, but is supported by specification
                $client_id = $inputData['client_id'];
                $client_secret = isset($inputData['client_secret']) ? $inputData['client_secret'] : null;
                return array($client_id, $client_secret);
            }
         }


6. Now we create a symfony ADMIN user:<br />
 `php app/console fos:user:create netseven  admin@example.com adminPa22word  --super-admin`

7. Then you create the virtual host e.g.: `mymachinehostanme.oauth` (substitute {hostname} with your hostname)

        <VirtualHost *:80>
            DocumentRoot "/var/www/oauth/web"
            ServerName {hostname}.oauth
            ErrorLog "/var/log/apache2/error.log"
            CustomLog "/var/log/apache2/access.log" common
            <Directory "/var/www/oauth/web">
                Options FollowSymLinks
                AllowOverride All
                Allow from All
            </Directory>
        </VirtualHost>

8. Reload apache server `service apache2 reload`.


9. Update oauth bundle in symfony:<br />
`php composer.phar update hwi/oauth-bundle`<br />
update your schema:<br />
`php app/console doctrine:schema:update --force`<br />
clear caching levels:<br />
`php app/console cache:clear --env=prod`<br />
reset permissions for cache and log directory<br />
`chmod -R 777 app/cache app/logs`

10. Oauth client creation:

        php app/console net7oauth:createClient
        --redirect-uri=http://{hostname}:{port}/annotationserver/oauthauthentication/login_return
        --grant-type="password"
        --grant-type="refresh_token"
        --grant-type="token"
        --grant-type="client_credentials"
        --grant-type="authorization_code"

11. In `./app/config/config.yml`

        net7_o_auth:
        #configure  with the ID of the OAuth Client, after you have created it (see README.md)
        as_client_id: 1_2qq1zol7i4yss8sgc8c880gccc0ws0wwk4sgw80wsos8scoswc
        # this is the Annotation Server login_return URL, configure it
        as_login_return: "http://{hostname}:{port}/annotationserver/oauthauthentication/login_return"


12. In `vim app/config/parameters.yml`

        facebook_app_id: XXXyour-FB-appIDXXXX
        facebook_app_secret: XXyour-FB-app-SECRETXXXX
        google_app_id: XXXyour-GOOGLE-appIDXXXX.apps.googleusercontent.com
        google_app_secret: XXyour-GOOGLE-app-SECRETXXXX
