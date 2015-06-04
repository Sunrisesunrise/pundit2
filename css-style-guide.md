---
layout: page
title: CSS Style Guide
---

#{{ page.title }}


## 1. Introduction

To keep the CSS code written for the project consistent and maintainable we provide CSS guidelines to
follow during the implementation.

### 1.1	Preprocessor

The CSS code for Pundit will be written using **LESS preprocessor**.
(These guidelines also applies for projects based on **SCSS** and also pure CSS.)

### 1.2	Tabs and spaces

For the indentation and formatting of the code **we don’t use tabs but spaces**.

Please set up your code editor:

 - with **no tabs**;
 - **tab size = 4**;
 - **indent size = 4**.

Spaces are the only way to guarantee code renders the same in any person's environment.

### 1.3	Anatomy of a Ruleset

Before we discuss how we write out our rulesets, let’s first familiarise ourselves with the relevant terminology:

    [selector] {
        [property]: [value];
        [<--declaration--->]
    }

### 1.4	HTML inline styles

We must **never** write inline style in the HTML code.
Inline styles generate critical **<a href="http://www.smashingmagazine.com/2007/07/27/css-specificity-things-you-should-know/" target="_blank">specificity problems</a>**
that might be very difficult to fix and impose the usage of **!important**.


### 1.5	Temporary css

Sometimes is necessary to write a CSS declaration very fast and it might not be possible to compile the LESS files.
**It is mandatory not to write in the style.css compiled by LESS**: these modifications will be lost the
next time a developer compiles it again.

<table bgcolor="#e7edf8">
  <tr>
    <td>For this reason we provide a <strong>static temporary.css</strong> files that is linked by the HTML right after the
    style.css: in this file is possible to write CSS declarations when it is not possible to compile LESS file.
    This must be used only for critical situations and urgent bug fixings. Then the declarations in this file must
    be moved to the LESS files. The temporary css file must be empty most of the time.</td>
  </tr>
</table>


### 1.6	80 characters wide

Where possible, limit CSS files’ width to 80 characters. Reasons for this include:

  - the ability to have multiple files open side by side;
  - viewing CSS on sites like GitHub, or in terminal windows;
  - providing a comfortable line length for comments.

---


## 2. LESS file organization

### 2.1 Main files

The LESS file organization is quite complex due to the complexity of the Pundit project itself.
Into the *pundit2/app/styles/* folder in the project you fill find all LESS files you'll be working on.
These files are grouped in these folders:

###*pundit*

This is the main folder for the Pundit application. The files structure allows to develop
more than one application: the modularity both of the LESS and AngularJS files
offer the possibility of reusing all the components to build different applications, like using a framework.
If you need to create a new application (like Pundit or Korbo) you have to create a new folder with a similar structure.

These are the main files in this folder:

  - *pundit2.less:* imports all the LESS files that are used by the application;
  - *pundit-variables.less:* custom variables used **only** by Pundit (not by other applications). This file is
  currently empty but it might be useful in the future.

###*korbo*

Korbo is another application like Pundit (more info about Korbo <a href="http://korbo.muruca.org/" target="_blank">here</a>).
The files structure is similar to the one that we've seen in Pundit.

  - *korboee.less:* imports all the LESS files that are used by the Korbo application;
  - *korboee-variables.less:* custom variables used **only** by Korbo (not by other applications).
  - *korboee-styles.less*: custom styles for the Korbo application. It's advisable to have as little as
  possible CSS code here: the code should be divided into components.

###*global*

Collection of LESS files that don't refer to a specific component or application (e.g. *variables*, *normalization*).

###*components*

In this folder you will find all reusable components of the interface.
When writing Pundit CSS we follow the OOCSS philosophy and so we try to keep each component independent from the
others and reusable in any context or application. The components are reusable elements.

Some of there LESS files have a corresponding component in the source files.

###*bootstrap*

Pundit is based on <a href="http://getbootstrap.com/" target="_blank">Bootstrap</a>
and <a href="http://mgcrea.github.io/angular-strap/" target="_blank">AngularStrap</a>.
For this reason we need to overwrite the basic style of these two frameworks to achieve a custom style.
In this folder you'll find all files used for customizing the original Bootstrap style:

  - *bootstrap-variables.less:* will overwrite basic Bootstrap variables. It's a good practice to keep here
  **only** the variables that are really overwritten (please don't include all Bootstrap variables
  when these are the same as the default value);
  - *bootstrap-theme.less:* this style is used **only** to override styles for Bootstrap elements and
  it's **common** for all applications and components. Please don't add here generic
  styles for the application other than styling for basic Bootstrap elements.

###*img*

Images referred by CSS declarations.

### 2.2 External files

There are also LESS files imported from <a href="http://bower.io/" target="_blank">Bower</a>. These are in the folder *bower_components* of the project
and ignored by git.

These files must be imported from the main LESS (e.g. *pundit2.less*). You should never modify these files.

### 2.3 Grunt

Please be aware that the LESS files are compiled by the **Gruntfile.js** in the root of the project.
Grunt also takes care of the minification of the CSS files.

---

## 3 Avoiding CSS conficts

Pundit is an application built to be launched into third parties web pages and CSS interferences are a real problem:

  - the Pundit CSS can interfere with the style of the page thus producing some unwanted styles in the page we want to annotate;
  - the page CSS can interfere with Pundit style thus modifying the style of the Pundit interface.

Let's what we can do to avoid these problems.

### 3.1 Wrapping Pundit

All the Pundit DOM elements are always wrapped into an element with the class *.pnd-wrp*. Let's see an example:

    <div data-ng-app="Pundit2" class="pnd-wrp ng-scope">
        <div class="pnd-dropdown-contextual-menu-anchor">
            ....
        </div>
    </div>

Most of the imports in the *pundit2.less* are then wrapped in the same class in this way:

    .pnd-wrp {
        @import "../global/normalize.less";
        @import "../components/annotation-sidebar";
        @import "../components/login.less";
        ...
    }

With this solution all the CSS selectors have our custom class as parent selector and an higher level of specificity:
in this way we are sure that our CSS declarations **cannot** influence the style of the web page.

### 3.2 Normalization

Sometimes we discover new CSS declarations of the annotated web page that influence the Pundit CSS style modifying the
layout of the interface (this mostly happens to HTML tags).

To fix this problem we have a **normalize.less** where we overwrite conflicting declarations. We chose not to use a
third party normalization file but to have our own adding new declarations when needed.

---


## 4. Naming conventions

Naming conventions in CSS are hugely useful in making your code more strict, more transparent, and more informative.

The naming convention we follow is very simple: **hyphen (-) delimited strings**.

### 4.1 HTML elements

All strings in classes are delimited with a hyphen (-), like so:

    .page-head {}
    .sub-content {}

**Camel case and underscores are not used for regular classes**.

### 4.2 Variables

Also variables use the **hyphen (-) as string separator**.

The string will be composed by parts ordered in a **hierarchy starting from higher level going into more detail**.

Some examples:

    @color-text-link-hover: #0071bc;
    @color-header-border-top: #ff00cc;
    @footer-margin-bottom: 20px;

We see that the variable name starts from a higher level and each following part of the string defines a
more detailed level.

Variables must be grouped into logical groups that must be introduced by a comment like:

    // ------------------------------------ //
    //  COLORS
    // ------------------------------------ //

and variables whose name is not completely explaining its meaning must be preceded by a comment like:

    // Sets the margin between the content and the footer
    @content-margin-bottom: 20px;

Sometimes it can be useful to define variables with values relative to other variables.
This allows to change LESS values when we need to make some modifications.
This is clear with colors: we can have a main color for links and a hover color which is the **same color but lighter**.
If we write something like this:

    @color-text-link: #0071bc;
    @color-text-link-hover: lighten(@color-text-link, 25);

if we change the color of link we must **change only one value** and the second one is changed automatically.


---


## 5. Formatting

    [selector] {
        [property]: [value];
        [<--declaration--->]
    }

Here are some formatting guidelines:

  - a **space before** the opening brace **({)**;
  - the opening brace **({)** on the **same line as the last selector**;
  - the first declaration **on a new line after the opening brace** **({)**;
  - **properties and values always on the same line**;
  - a **space after** the property–value delimiting colon **(:)**;
  - each **declaration on its own new line** (line breaks between declarations);
  - the **closing brace** **(})** on its own **new line**;
  - each **declaration indented** by four (4) spaces.

Let’s see an example:

    .footer, .footer-bar {
        display: block;
        background-color: @color-page-background;
        color: @color-footer-text;
    }

Avoid specifying **units for zero values**:

    margin: 0; /* Good */

instead of

    margin: 0px; /* No good */

For nested ruleset we also leave a blank line before the nested ruleset. Here’s an example:

    .footer {
        color: @color-footer-text;

        .bar {
            color: @color-footer-bar-text;
        }
    }

Nesting in LESS should be avoided wherever possible and used only when necessary to have the desired specificity.

### 5.1 Whitespaces

As well as indentation, we can provide a lot of information through liberal
and judicious use of whitespace between rulesets.
We usually have one (1) empty line between rulesets and two (2) empty lines at
the end of each main section of code.

### 5.2 Colors

We prefer using hex color codes (#000000).

### 5.3 Declarations order

Also declarations inside a ruleset can be organized following this order:

1. **Box model:**

        display: block;
        float: right;
        box-sizing; border-box;
        width: 100px;
        height: 100px;
        margin: 0;
        padding: 0;

2. **Positioning:**

        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100;

3. **Visual** (Borders & Background):

        background-color: #f5f5f5;
        border: 1px solid #e5e5e5;
        border-radius: 3px;

4. **Typography:**

        font-weight: 100;
        font-size: 13px;
        font-family: Helvetica;
        line-height: 1.5;
        color: #333;
        text-align: center;
        text-transform: uppercase;

5. **Misc:**

        animations, transforms, etc.



---


## 6. Comments and code sections

CSS is not telling its own story very well, **it is a language that really does benefit from being heavily commented**.

As a rule, you should comment anything that isn’t immediately obvious from the code alone.
That is to say, there is no need to tell someone that **color: red;** will make something red,
but if you’re using **overflow: hidden;** to clear floats—as opposed to clipping an element’s overflow—this
is probably something worth documenting.

In LESS we can use comments with two different syntax:

    /* */

and

    //

The main difference is that the **first will be processed and included in the resulting .css file** while the
second **will be ignored by the preprocessor**.
For this reason we must use the /* */ syntax for comments we want to include in the .css file while we use // for
comments we don’t need to be compiled.
This will make no difference when we compile a **minified** and no-comments version of the file for production,
but while we’re developing we’ll probably have a not-minified CSS file and comments can be very useful.

E clear example is the **variables.less**: this will be transparent in the compiled CSS file so it’s a
good practice to insert all comments using // otherwise there will be comments floating around with no related code.

We identify **four** different types of commenting.

### 6.1 Document level comments

These comments are **mandatory** and must explain what the current LESS document is about:
we place them at the beginning of each LESS file.

    /**
     * DOCUMENT TITLE
     *
     * Text describing in detail what this file is doing...
     */

If we want to write the same comment but this must not be compiled by the preprocessor, please write it this way:

    //
    // DOCUMENT TITLE (COMMENT HIDDEN FROM COMPILER)
    //
    // Text describing in detail what this file is doing...
    //

### 6.2 Section level comments

The css declarations inside each file must be divided and organized in logical sections.
These sections must be introduced by a **mandatory** comment with a title of the section.
Only if the content is extremely hard to understand reading the code please provide some additional lines of text.

    /* ------------------------------------ *\
       #SECTION-TITLE
    \* ------------------------------------ */

If we want to write the same comment but this must not be compiled by the preprocessor, please write it this way:

    // ------------------------------------ //
    // #SECTION-TITLE
    // ------------------------------------ //

### 6.3 Selector level comments

This is not mandatory but needed when writing css code that perform
some strange or unexpected action. We need to use this comments when writing css
related to the entire css selector that will be hard to understand week or months after.

This is a simple single line comment:

    /* This set of declarations is doing this and that */

If we want to write the same comment but this must not be compiled by the preprocessor, please write it this way:

    // This set of declarations is doing this and that

### 6.4 Inline comments

These are comments written at the level of each css declaration that we
need when writing hard-to-understand code. We write it like this:

    color: blue; /* The text color id blue */

If we want to write the same comment but this must not be compiled by the preprocessor, please write it this way:

    color: blue; // The text color id blue


---


## 7. Media Queries

Media queries **shouldn’t be written in a single file**
but divided in each LESS file to define media queries
behaviour for each specific component, section or layout.


---


## 8. Specificity

The overall philosophy is keep **specificity low**.

There will always be times you need to override it, so the lower the specificity is on a selector,
the easier it is to override.
Not only that, but override in such a way you might even be able to override it again
without going crazy with an **ID selector** or **!important**.

**ID selectors must be (almost) never used**: If you must use an ID selector (#selector)
make sure that you have **no more than one in your rule declaration**.
A rule like:

    #header .search #quicksearch { ... }

is considered harmful.


---


## 9. Sizing

We don’t have a strong rule for **sizing** but since we are dropping IE8 we can use <a href="http://caniuse.com/#feat=rem" target="">rem</a>
for font-size and pixels for most other sizes (plenty of exceptions).

Additionally, unit-less **line-height** is preferred because it does not inherit a
percentage value of its parent element, but instead is based on a multiplier of the font-size.


---


## 10. Resources


  - <a href="http://cssguidelin.es" target="_blank">High-level advice and guidelines for writing sane, manageable, scalable CSS</a>
  - <a href="http://codepen.io/chriscoyier/blog/codepens-css" target="_blank">CodePen's CSS</a>
  - <a href="http://blog.trello.com/refining-the-way-we-structure-our-css-at-trello/?utm_source=CSS-Weekly&utm_campaign=Issue-128&utm_medium=email" target="_blank">Refining The Way We Structure Our CSS At Trello</a>
  - <a href="http://geek-rocket.de/frontend-development/scss-styleguide-with-bem-oocss-smacss/" target="_blank">Scss-Styleguide with BEM, OOCSS & SMACSS</a>
  - <a href="https://medium.com/@fat/mediums-css-is-actually-pretty-fucking-good-b8e2a6c78b06" target="_blank">Medium’s CSS is actually pretty f***ing good.</a>
  - <a href="https://github.com/evernote/sass-build-structure" target="_blank">Evernote SASS build structure</a>