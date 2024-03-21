var ig = require("instagram-scraping");

ig.scrapeUserPage("himy.in").then((result) => {
  console.dir(result);
});
