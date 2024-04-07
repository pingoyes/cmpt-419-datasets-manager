# CMPT 419 Dataset Manager

A browser based tool to help manage datasets.

## Installation:
Build using `npm install` or `npm install --force` in the project directory.

Run using `ng serve`.

## Features:
> [!NOTE]
> Server not yet setup to actually save actions
- Upload/download datasets in csv format
- View uploaded datasets in table
    - View dataset name, feature count, row count
    - Input to change dataset name and description
- View dataset rows in table
    - Filter datasets by value (includes optional greater/less than filters)
    - Sort dataset by feature column
    - Select specific rows or select a random sample of specified size
        - Download or delete selected rows
    - Visualize value distribution of specified feature name in a chart
    

## TODO:
### Features:
> [!NOTE]
> Completed items are crossed out.
- Upload/download datasets
    -  ~~Support csv~~ and maybe json
- Manage datasets
    - ~~Sort features~~
    - ~~Filter feature values~~
    - ~~Allow adding details/notes to uploaded datasets~~
- ~~View datasets in formatted table~~
- ~~Visualize dataset statistics (e.g. # of entries, # of specific feature values)~~
- Modify singular datasets from the UI (e.g. ~~remove entries~~, remove features)
- Modify multiple datasets (e.g. merge datasets or specific entries from other datasets)
- ~~Select n random sample rows from dataset~~

