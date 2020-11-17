// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");



module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/");
    }
    res.render("index.handlebars")
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login.handlebars");
  });

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup.handlebars");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // app.get("/members", isAuthenticated, (req, res) => {
  //   res.render("members.handlebars");
  // });
  app.post("/members", isAuthenticated, (req, res) => {
    res.render("members.handlebars");
  });

  app.get("/locationSelect", isAuthenticated, (req, res) => {
    res.render("locationSelect.handlebars");
  });

  app.get("/explore", isAuthenticated, (req, res) => {
    res.render("explore.handlebars");
  });
};
