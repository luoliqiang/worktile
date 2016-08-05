module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
            ' * poem v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * <%= grunt.template.today("yyyy-mmmm-dd") %> <%= pkg.author %>\n' +
            ' * Licensed under the <%= pkg.license %> license\n' +
            ' */\n',
        less: {
            develop: {
                expand: true,
                ext: '.css',
                flatten: true,
                cwd: 'public/less',
                src: 'poem.less',
                dest: 'public/css/'
            }
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    hostname: '127.0.0.1',
                    base: '.',
                    livereload: 35729,
                    open: true
                }
            }
        },
        watch: { //如果只用watch插件，需要自己启动一个页面服务器，并且在页面添加一行script标签且端口指向livereoad的服务器，
            //这样两个服务器通信，修改文件时livereoad服务器会通知静态页面页面服务器（或者说是浏览器）刷新界面,
            options: {
                livereload: 35729,
                cwd: 'public/less/' //相对路径
            },
            files: ['**/*.less'],
            tasks: ['lessdev']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('lessdev', ['less']); //注意一定不能把执行名称写成less否则执行无反应
    grunt.registerTask('watchless', ['watch']); //注意一定不能把执行名称写成less否则执行无反应
    grunt.registerTask('livereload', ['connect', 'watch']);//只能单独的静态文件使用，无法和express通用

}