# grunt-translate-sync

> Synchronizes JSON translation files for angular-translate during development by moving new keys to out-of-date files.

[![Build Status](https://travis-ci.org/arvidkahl/grunt-translate-sync.png?branch=master)](https://travis-ci.org/arvidkahl/grunt-translate-sync)

Useful for libraries like [angular-translate](https://github.com/PascalPrecht/angular-translate), where translation info is kept in multiple JSON files with identical keys.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-translate-sync --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-translate-sync');
```

## The "translate_sync" task

### Overview
In your project's Gruntfile, add a section named `translate_sync` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  translate_sync: {
    options: {
      keepKeyOrder: Boolean,
      indent: String or Number
    },
    source: String,
    targets: [String]
  },
});
```

### Options

#### options.keepKeyOrder
Type: `String`
Default value: `true`

A boolean value that indicates if the keys in the target files should appear in the same order as in the source file.

#### options.indent
Type: `String` or `Number`
Default value: `2`

A string or numeric value that is passed to JSON.stringify as the `space` parameter when writing the target files. Setting it to `null` will remove pretty-printing, anything else will pretty-pring the JSON as outlined in [the JSON.stringify documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

#### source
Type: `String`
Default value: `null`

Required value of the path to the source file. All key-value pair in this file will be added to all target files unless they are already present there. Must be valid JSON.

#### targets
Type: `[String]`
Default value: `[]`

Required array of target files that should be updated with the keys from the source file. Must not be empty. All files must be valid JSON.

### Usage Example

#### Default Options
In this example, a source file called `tmp/enUS.json` will be used to update the key-value pairs in `tmp/frFR` and `tmp/deDE`.

```js
grunt.initConfig({
  translate_sync: {
    source: "tmp/enUS.json",
    targets: ["tmp/frFR.json", "tmp/deDE.json"]
  },
});
```

#### Custom Options
In this example, a source file called `tmp/enUS.json` will be used to update the key-value pairs in `tmp/frFR` and `tmp/deDE`, keeping the key order in the target files as they are (new keys will be added after the last key), and using a `tab` character for pretty-printing.

```js
grunt.initConfig({
  translate_sync: {
    options: {
      keepKeyOrder: false,
      indent: "\t"
    },
    source: "tmp/enUS.json",
    targets: ["tmp/frFR.json", "tmp/deDE.json"]
  },
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 - Initial Version, keys are added after the last key if not present in target files

0.2.0 - keepKeyOrder option introduced, testing refined for both cases

0.2.1 - added travis integration

0.3.0 - added namespace compatibility, fixes arvidkahl/grunt-translate-sync#1
