const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("index.handlebars")
  });

  app.get("/login", (req, res) => {
    if (req.user) { return res.redirect("/members") }
    res.render("login.handlebars");
  });

  app.get("/signup", (req, res) => {
    if (req.user) { return res.redirect("/members") }
    res.render("signup.handlebars");
  });

  app.post("/members", isAuthenticated, (req, res) => {
    res.redirect("/members");
  });

  app.get("/locationSelect", isAuthenticated, (req, res) => {
    res.render("locationSelect.handlebars");
  });

  app.get("/explore", isAuthenticated, (req, res) => {
    res.render("explore.handlebars");
  });
};
