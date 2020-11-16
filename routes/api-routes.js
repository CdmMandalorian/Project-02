// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path")
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

let fileStoredPath = ``;
let usersAnimals = [];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img/uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const id = uuid();
    fileStoredPath = `${id}${ext}`;
    console.log(fileStoredPath)
    cb(null, fileStoredPath);
  }
});
const upload = multer({ storage });

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  app.get("/api/animals", async (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      const currentAnimals = await db.Animal.findAll()
      const currentAnimalArray = []
      currentAnimals.forEach(animal => currentAnimalArray.push(animal.dataValues));
      res.json(currentAnimalArray);
    }
  });

  app.get("/account", isAuthenticated, async (req, res) => {
    const { userName } = req.user;
    const currentAnimals = await db.Animal.findAll()
    const currentAnimalArray = []
    currentAnimals.forEach(animal => currentAnimalArray.push(animal.dataValues));
    currentAnimalArray.forEach(animal => {
      if(animal.foundByUser === userName) { usersAnimals.push(animal) }
    });
    var hbsObject = {
      animal: usersAnimals,
      user: req.user,
    };
    usersAnimals = []
    res.render("account", hbsObject);
  });

  app.post("/upload", upload.single("picture"), (req, res) => {
      db.Animal.create({
        animal_species: req.body.type,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        hostile: true,
        foundByUser: req.body.username,
        note: req.body.note,
        picture: fileStoredPath
      })
        .then(() => {
          res.redirect(307, "/members");
        })
        .catch(err => {
          res.status(401).json(err);
        });
  });

  app.get("/members", isAuthenticated, (req, res) => {
    
    res.render("members", array);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        userName: req.user.userName,
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
