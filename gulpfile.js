/*
1.less编译\压缩\合并
2.js合并\压缩\混淆
3.img复制
4.html压缩
*/

//在gulpfile中先引gulp包,因为这个包提供了一些api
var gulp = require("gulp");
var less = require("gulp-less");
var cssnano = require("gulp-cssnano");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");
var browserSync = require("browser-sync");
var reload =browserSync.reload;

//注册任务 1.less编译\压缩\合并(其中合并没有必要 在less中导入就好了)
gulp.task("style", function() {
    //这里是在执行style任务时自动执行的
    gulp.src(["src/styles/*.less", "!src/styles/_*.less"]) //获取文件
        .pipe(less()) //把less编译成为了css
        .pipe(cssnano()) //把编译之后的css压缩
        .pipe(gulp.dest("dist/styles"))//把压缩后的css保存到dist的styles文件夹中
        .pipe(browserSync.reload({stream:true}));//这行代码的意思是一旦数据有改变浏览器就自动刷新
})

//注册任务 2.js合并\压缩\混淆(其实压缩和混淆是一个过程 是uglify)
gulp.task("script", function() {
    gulp.src("src/scripts/*.js") //获取文件
        .pipe(concat("all.js")) //合并js文件
        .pipe(uglify()) //压缩混淆
        .pipe(gulp.dest("dist/scripts")) //把混淆压缩后的js保存到dist的scripts文件夹中
        .pipe(browserSync.reload({stream:true}));//这行代码的意思是一旦数据有改变浏览器就自动刷新;
     
})

//注册任务 3.img复制
gulp.task("image", function() {
    gulp.src("src/images/*.*") //获取文件
        .pipe(gulp.dest("dist/images"))//把图片复制到dist的images件夹中
        .pipe(browserSync.reload({stream:true}));//这行代码的意思是一旦数据有改变浏览器就自动刷新
})

//注册任务 4.html压缩
gulp.task("html", function() {
    gulp.src("src/*.html") //获取文件
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true })) //压缩html collapseWhitespace:true是折叠空白部分,意思就是把空白部分都去掉 注意并不去掉注释   removeComments:是去掉注释
        .pipe(gulp.dest("dist")) //压缩后的html文件复制到dist件夹中
        .pipe(browserSync.reload({stream:true}));//这行代码的意思是一旦数据有改变浏览器就自动刷新
})

gulp.task("serve", function() {
    browserSync({
            server: {
                baseDir: [
                    "dist/"
                ]
            }
        },
        function(err, bs) {
            console.log(bs.options.getIn(["urls", "local"]));
        });

  gulp.watch("src/styles/*.less",["style"]);    
  gulp.watch("src/scripts/*.js",["script"]);
  gulp.watch("src/images/*.*",["image"]);
  gulp.watch("src/*.html",["html"]);

})