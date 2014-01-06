/*
 * grunt-translate-sync
 * https://github.com/arvidkahl/grunt-translate-sync
 *
 * Copyright (c) 2013 Arvid Kahl
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    translate_sync: {
      testTranslateSimple: {
        options: {},
        source: 'test/fixtures/simpleSource',
        targets: ['tmp/simpleTarget'],
      },
      testTranslateSorted: {
        options: {
          keepKeyOrder: true
        },
        source: 'test/fixtures/sortedSource',
        targets: ['tmp/sortedTarget'],
      },
      testTranslateNested: {
        options: {},
        source: 'test/fixtures/nestedSource',
        targets: ['tmp/nestedTarget'],
      },
      testTranslateNestedSorted: {
        options: {
          keepKeyOrder: true
        },
        source: 'test/fixtures/nestedSortedSource',
        targets: ['tmp/nestedSortedTarget'],
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Copy fixtures for testing purposes
  grunt.registerTask('copy', 'Copy fixtures to a temp location.', function() {
    grunt.file.copy('test/fixtures/simpleTarget', 'tmp/simpleTarget');
    grunt.file.copy('test/fixtures/sortedTarget', 'tmp/sortedTarget');
    grunt.file.copy('test/fixtures/nestedTarget', 'tmp/nestedTarget');
    grunt.file.copy('test/fixtures/nestedSortedTarget', 'tmp/nestedSortedTarget');
  });

  // Whenever the "test" task is run, first clean the "tmp" dir, copy empty target, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy', 'translate_sync', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
