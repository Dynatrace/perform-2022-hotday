## Service Level Terminology
All credit to google and the SRE Handbook, found here: https://sre.google/sre-book/service-level-objectives/

### Indicators
An SLI is a service level **indicator** —a carefully defined quantitative measure of some aspect of the level of service that is provided.

### Objectives
An SLO is a **service level objective**: a target value or range of values for a service level that is measured by an SLI. A natural structure for SLOs is thus **SLI ≤ target**, or **lower bound ≤ SLI ≤ upper bound**. For example, we might decide that we will return Shakespeare search results "quickly," adopting an SLO that our average search request latency should be less than 100 milliseconds.

## Agreements

Finally, SLAs are service level **agreements**: an explicit or implicit contract with your users that includes consequences of meeting (or missing) the SLOs they contain. 