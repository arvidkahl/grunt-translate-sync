/*
 * grunt-translate-sync
 * https://github.com/arvidkahl/grunt-translate-sync
 *
 * Copyright (c) 2013 Arvid Kahl
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('translate_sync', 'Synchronizes JSON translation files for angular-translate during development by moving new keys to out-of-date files.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
       indent : 2,
       keepKeyOrder : false
    });

    var done = this.async();

    var sourceFile = this.data.source;
    var targetFiles = this.data.targets;

    if (sourceFile==null) {
      grunt.log.warn('Source option not found.');
      return false;
    }

    if (!grunt.file.exists(sourceFile)) {
      grunt.log.warn('Source file "' + sourceFile + '" not found.');
      return false;
    }

    var sourceJSON = JSON.parse(grunt.file.read(sourceFile));
    grunt.log.writeln('Using source file "' + sourceFile);


    if (targetFiles==null) {
      grunt.log.warn('Targets option not found');
      return false;
    }
    var targetCount = targetFiles.length;
    if (targetCount===0) {
      grunt.log.warn('No targets specified');
      return false;
    }

    var remainingCount = targetCount;

    // Iterate over all specified file groups.
    targetFiles.forEach(function(filepath) {

      // Warn on and remove invalid source files (if nonull was set).
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Target file "' + filepath + '" not found.');
        return false;
      } else {
        // Read file source.
        var targetContent = grunt.file.read(filepath);
        var targetJSON = JSON.parse(targetContent);
        var changedItems = 0;
        var key, value, result;

        if(!options.keepKeyOrder){

          for (key in sourceJSON) {
            value = sourceJSON[key];
            if (!targetJSON[key]) {
              changedItems++;
              targetJSON[key] = value;
            }
          }
          result = targetJSON;
        } else {
          var newTargetJSON = {};
          for (key in sourceJSON) {
            value = sourceJSON[key];
            if (!targetJSON[key]) {
              changedItems++;
              newTargetJSON[key] = value;
            } else {
              newTargetJSON[key] = targetJSON[key];
            }
          }
          result = newTargetJSON;
        }

        grunt.log.writeln('File "' + filepath + '" updated. '+changedItems+' items changed.');
        grunt.file.write(filepath, JSON.stringify(result, null, options.indent));
        if (--remainingCount===0) {
          done();
        }
      }
    });


    // Print a success message.
    grunt.log.writeln('Done syncing files.');

  });

};
