## Building the extension

In vscode, open a terminal and cd into the `perform-2022-hotday/extensions-as-code/snmp-demo-extension` folder

```
cd perform-2022-hotday/extensions-as-code/snmp-demo-extension
```

We can use the previously created certificate to build the extension. We will use dt-cli to do so, run the command:

```
dt ext build --certificate ..\..\..\certificates\developer.pem --private-key ..\..\..\certificates\developer.key --no-dev-passphrase
```

This will create a file called `custom_snmp.demo-1.0.0.zip` in the current folder, this is our built and signed extension!

```text
PS C:\Users\dtu_training\Desktop\training\perform-2022-hotday\extensions-as-code\snmp-demo-extension> dt ext build --certificate ..\..\..\certificates\developer.pem --private-key ..\..\..\certificates\developer.key --no-dev-passphrase
Building .\extension.zip from .\extension
Adding file: .\extension\extension.yaml as extension.yaml
Wrote .\extension.zip file
Signing .\extension.zip using ..\..\..\certificates\developer.pem certificate and ..\..\..\certificates\developer.key private key
Wrote signature file .\extension.zip.sig
.\custom_snmp.demo-1.0.0.zip file already exists, it will be overwritten!
Wrote .\custom_snmp.demo-1.0.0.zip file
Extension built successfuly! :-)
```

Note that by default the `dt` command is looking for a folder called `extension`, and for a file called `extension.yaml` inside that folder, these can also be specified with command line arguments.

You can explore all other arguments it accepts with `dt ext --help`.  

Remember that the `dt` command can be invoked because we installed it with `pip install -U dt-cli`, and the python `Scripts` directory is added to the `PATH` environment variable (this is the default behavior when you install python)
