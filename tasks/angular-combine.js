/*
 * grunt-angular-combine
 * https://github.com/andykim88/grunt-angular-combine
 *
 * Copyright (c) 2013 Romain Gonord
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
	grunt.registerMultiTask('angularCombine', 'Combine AngularJS partials into a single HTML file.', function () {
		var managePartialsDirectory = function(cwd, source){
			var destFileContent = "";
			destFileContent += "<!-- Merge of " + source + " -->\n";

			if (/\.html$/.test(source) && source.indexOf('/.') === -1) {
				destFileContent += "<script type='text/ng-template' id='" + source.substring(cwd.length + 1) + "'>\n";
				destFileContent += grunt.file.read(source);
				destFileContent += "</script>\n";
			}

			return destFileContent;
		};

		var destContent = "";
		this.files.forEach(function(file) {
			var cwd = file.orig.cwd;

			file.src.forEach(function(source) {
				destContent += managePartialsDirectory(cwd, source);
			});
		});

		var targetContent = grunt.file.read(this.data.options.target);
		grunt.file.write(this.data.options.target, targetContent+destContent);
	});
};
