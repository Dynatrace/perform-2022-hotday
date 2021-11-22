## Introduction

Welcome to the **Extensions as Code lab**.  
In this lab we will explore how to create extensions 2.0 in Dynatrace.

Our goals are:

1. **Setup our development environment**
    * This includes generating certificates for us to sign our extensions
    * We will also set up the extension schemas, to get nice features like auto completion and suggestions
2. **Sign and deploy a Demo SNMP extension**
    * This will help us validate that our environment and certificates work
    * It also gives us some examples of the syntax for declarative extensions, things like Metrics, Topology and SNMP configuration
3. **Develop and deploy a OneAgent WMI extension**
    * We will use what we learned so far to create a brand new WMI extension and deploy it
4. **Develop and deploy a Prometheus extension**
    * We will explore our powerful prometheus datasource
