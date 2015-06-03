---
layout: page
title: Javascript coding and naming policies
---

#{{ page.title }}

## 1. Modules

**"Pundit2.ModuleName"**, camel case with first capitalized.

## 2. Constants

**"PUNDITDEFAULTCONF"**, all capitalized.

## 3. Services/Factories/Providers

**"ServiceName"**, camel case with first capitalized.

## 4. Filenames

### 4.1 Javascript

"$name.$what.js" (eg Example.dir.js)
  – $what is one of: module, service, factory, ctrl, constant, dir (directive)...
  – $name is the same name of the $what defined inside (camel case etc)

### 4.2 Templates

"$name.$what.tmpl.html" (eg: Example.dir.tmpl.html)
  - $name.$what is the same name of module this template belongs to

### 4.3 Unit test

  - "$name.$what.unit.test.js" (eg: Example.service.unit.test.js)

### 4.4 E2E test

"$name.e2e.test.js" (eg: Example.e2e.test.js)

## 5. Directories

Name of the module / component