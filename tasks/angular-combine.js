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
		var includeComments = this.data.options.includeComments;
		var destContent = "";

		this.files.forEach(function(file) {
			var cwd = file.orig.cwd;

			file.src.forEach(function(source) {
				if (includeComments) {
					destContent += "<!-- Merge of " + source + " -->\n";
				}

				if (/\.html$/.test(source) && source.indexOf('/.') === -1) {
					destContent += "<script type='text/ng-template' id='" + source.substring(cwd.length + 1) + "'>";
					destContent += grunt.file.read(source);
					destContent += "</script>";
				}
			});
		});

		var targetContent = "";
		if (grunt.file.exists(this.data.options.target)) {
			targetContent = grunt.file.read(this.data.options.target);
		}
		grunt.file.write(this.data.options.target, targetContent+destContent);

		if (this.data.options.remove) {
			this.files.forEach(function(file){
				file.src.forEach(function(source) {
					if (grunt.file.exists(source)) {
						grunt.log.writeln(JSON.stringify(source));
						grunt.file.delete(source,{force:true});
					}
				});
			});
		}
	});
};
