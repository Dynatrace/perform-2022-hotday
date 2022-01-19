## Feature sets

Feature sets are categories into which you organize the data collected by the extension. You can define feature sets at the group, subgroup, or metric level.

When activating your extension in monitoring configuration, you can limit monitoring to one of the feature sets. This helps choose the data sets you want to report on without changing your extension.

All metrics that aren't categorized into any feature set are considered to be default and are always reported.

**Note:** A metric inherits the feature set of a subgroup, which in turn inherits the feature set of a group. Also, the feature set defined on the metric level overrides the feature set defined on the subgroup level, which in turn overrides the feature set defined on the group level.

Let's add feature sets to our extension for Processor performance and Services. We want the Logical disk data set to always report.

All you have to do is add under the **CPU subgroup**:
```yaml
featureSet: Processor performance
```

### Tasks
1. Add another featureset for **Running services**

Your final yaml should look like [this](../../../assets/images/06_prometheus.yaml)