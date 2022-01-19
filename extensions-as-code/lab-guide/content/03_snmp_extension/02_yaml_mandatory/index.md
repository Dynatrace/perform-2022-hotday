## Mandatory properties

The first lines are the mandatadory properties for any extension, they have metadata that includes:

* `name`: must start with `custom:` for custom extensions
* `version`: Follows [simver](https://simver.org/) format
* `minDynatraceVersion`: This is an important fields, it determines both:
    * The schema version that we are targeting
    * The minimum Activegate (or OneAgent) version that is able to run this extension
* `author`

![yaml-01](../../../assets/images/08-yaml-01.png)

Since we have vscode validating our schema, you can delete one of these fields and immediately get an error, stating that you are missing a mandatory property.

![yaml-01-02](../../../assets/images/08-yaml-02.png)