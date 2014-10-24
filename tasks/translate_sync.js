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
    var assureObjectEquality;
    var changedItems = 0;

    var options = this.options({
     indent : 2,
     keepKeyOrder : true,
     warnOnIdenticalValues : true
   });

    var done = this.async();

    assureObjectEquality = function(sourceObject, targetObject) {
      var sourceKey, sourceValue, tempTargetObject, _ref;
      if (targetObject == null) {
        targetObject = {};
      }
      tempTargetObject = {};
      for (sourceKey in sourceObject) {
        sourceValue = sourceObject[sourceKey];
        if ((_ref = typeof sourceValue) === "string" || _ref === "boolean" || _ref === "number") {
          // if (!t[sourceKey]) {
            if ((typeof targetObject[sourceKey] === 'undefined')) {
              tempTargetObject[sourceKey] = sourceValue;
              targetObject[sourceKey] = sourceValue;
              grunt.log.writeln("[New key added]:\t'"+sourceKey+"'");
              changedItems++;
            } else {

              if (options.warnOnIdenticalValues && sourceValue === targetObject[sourceKey]) {
                grunt.log.writeln("[Identical Values]:\t"+sourceKey+".");
              }

              tempTargetObject[sourceKey] = targetObject[sourceKey];
            }
          } else {
            if (!targetObject[sourceKey]) {
              targetObject[sourceKey] = {};
              tempTargetObject[sourceKey] = {};
            }
            targetObject[sourceKey] = assureObjectEquality(sourceValue, targetObject[sourceKey]);
            tempTargetObject[sourceKey] = assureObjectEquality(sourceValue, targetObject[sourceKey]);
          }
        }
        if (options.keepKeyOrder) {
          targetObject = tempTargetObject;
        }
        return targetObject;
      };


      var sourceJSON;
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

      grunt.log.writeln('Using source file "' + sourceFile);
      try {
        sourceJSON = JSON.parse(grunt.file.read(sourceFile));
      }
      catch (e) {
        grunt.log.error('Source file contains malformed JSON');
        return false;
      }


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
      var hasErrors = false;

    // Iterate over all specified file groups.

    targetFiles.forEach(function(filepath) {

      // Warn on and remove invalid source files (if nonull was set).
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Target file "' + filepath + '" not found.');
        hasErrors = true;

      } else {
        // Read file source.
        var targetContent = grunt.file.read(filepath);
        var targetJSON;
        try {
          targetJSON = JSON.parse(targetContent);
        }
        catch (e) {
          grunt.log.error('Target file "'+filepath+'" contains malformed JSON');
          hasErrors = true;
        }

        if (!hasErrors && sourceJSON && targetJSON) {

          var result;
          result = assureObjectEquality(sourceJSON, targetJSON);

          grunt.log.writeln('File "' + filepath + '" updated. '+changedItems+' items changed.');
          grunt.file.write(filepath, JSON.stringify(result, null, options.indent));

        }

        if (--remainingCount===0) {
          if (hasErrors) {
            grunt.log.writeln('Did not sync files.');
            done(false);
          } else {
            // Print a success message.
            grunt.log.writeln('Done syncing files.');
            done(true);

          }
        }
      }
    });
});

};
