# eslint-plugin-progress

Report progress when running ESLint. Useful for large projects with thousands of files!

## Features

Displays progress while running ESLint, and a summary when exiting:

Before:

```
$ eslint .
(silence for 10 minutes)
$
```

After:

```
$ eslint .
* [ 2018-04-26 11:02:06.176 ] Processed 0 files...
* [ 2018-04-26 11:02:21.481 ] Processed 155 files...
* [ 2018-04-26 11:02:36.494 ] Processed 350 files...
* [ 2018-04-26 11:02:51.500 ] Processed 569 files...
* [ 2018-04-26 11:03:06.569 ] Processed 880 files...
* [ 2018-04-26 11:03:21.637 ] Processed 1207 files...
* [ 2018-04-26 11:03:36.650 ] Processed 1562 files...
* [ 2018-04-26 11:03:51.664 ] Processed 1959 files...

ESLint Stats Report
===================

2286 files processed in 1.9 minutes.

## Slowest 20 files
 * path/to/AdvancedSearchFilters.react.js (4079 ms)
 * path/to/RichTextEditor.react.js (2043 ms)
 * path/to/MessageBody.react.js (1037 ms)
 * path/to/BrowseChannelsModal.react.js (984 ms)
 * path/to/KanbanBoard.react.js (937 ms)
 * path/to/WorkspaceRetroPane.react.js (871 ms)
 * path/to/MessageStream.react.js (721 ms)
 * path/to/AppV2.react.js (652 ms)
 * path/to/Gantt.react.js (641 ms)
 * path/to/OnboardingPage.react.js (536 ms)
 * path/to/Tasklist.react.js (505 ms)
 * path/to/Task.react.js (479 ms)
 * path/to/MentionMembersBox.react.js (463 ms)
 * path/to/MessageStreamContainer.react.js (448 ms)
 * path/to/OverviewTask.react.js (385 ms)
 * path/to/FlashBubbleNotiContainer.react.js (383 ms)
 * path/to/ProjectListBody.react.js (377 ms)
 * path/to/MessageStreamScroller.react.js (372 ms)
 * path/to/TaskPreviewCard.react.js (372 ms)
 * path/to/ResourcesTable.react.js (364 ms)
$
```

## Usage

```
npm add gablau/eslint-plugin-progress --save-dev
```

```json
# .eslintrc.json
{
    "plugins": [
        "progress"
    ],
    "rules": {
        "progress/activate": [1, {
            "printEvery": 15, 
            "showSlowStats": true,
            "maxSlowFiles":20,
            "fullPath": true
        }]
    }
}
```
## Options
- `printEvery` (seconds) - Print a line every X seconds, 0 = one line for each file 
- `showSlowStats` (boolean) - Print statistics on "slower" files 
- `maxSlowFiles` (integer) - Maximum number of files to show in slower file statistics 
- `fullPath` (boolean) - Show the full path in the slowest file statistics 


## Known issues
Nothing

## Attributions

The **eslint-plugin-progress** was a fork of [**taskworld/eslint-plugin-progress**](https://github.com/taskworld/eslint-plugin-progress) 

## License
This project is released under The MIT License (MIT)