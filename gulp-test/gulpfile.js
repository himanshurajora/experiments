const gulp = require("gulp");
const comments = require("gulp-header-comment");
const fileInclude = require("gulp-file-include");
const bs = require("browser-sync");
const gulpSitemap = require("gulp-sitemap");
const path = {
  src: {
    html: "src/**/*.html",
  },
};

gulp.task("html", () => {
  return gulp
    .src(path.src.html)
    .pipe(
      fileInclude({
        basepath: "src/partial",
      })
    )
    .pipe(comments(`Website by Vedik Devs`))
    .pipe(
      gulpSitemap({
        siteUrl: "http://www.amazon.com",
      })
    )
    .pipe(gulp.dest("./output"));
});

gulp.task("watch:html", function () {
  gulp.watch(["src/**/*.html", "src/**/*.htm"], gulp.series("html"));
});

gulp.task(
  "default",
  gulp.series(
    "html",
    gulp.parallel("watch:html", function () {
      bs.init({
        server: "output/",
        reloadDebounce: 1,
      });
    })
  )
);
