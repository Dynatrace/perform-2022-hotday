## Obtaining the extension

The yaml file for this extension already exists, let's grab it:

1. Double click the `clone_project.bat` file, under `Desktop/training/scripts`
    * Alternetivaly, you can also run `git clone --depth=1 https://github.com/Dynatrace/perform-2022-hotday.git C:\Users\dtu_training\Desktop\training\perform-2022-hotday`


This will create a folder called `perform-2022-hotday` in the `Desktop/training` folder, our extension is in `extensions-as-code/snmp-demo-extension`

### Structure

The `extension.yaml` file for this extension has five sessions, which we will explore next:

* Mandatory properties
* snmp
* metrics (Optional)
* topology (Optional)
* screens (Optional)
