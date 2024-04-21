var express = require("express");
var router = express.Router();
var userModel = require("./users");
var postModel = require("./post");
const upload = require("./multer");
const { route } = require("../app");
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/login", function (req, res) {
  res.render("login", { error: req.flash("error") });
});
router.get("/profile", isLoggedIn, async function (req, res) {
  const user = await userModel
    .findOne({
      username: req.session.passport.user,
    })
    .populate("posts");

  res.render("profile", { user: user });
});

router.get("/add", isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  res.render("add", { user });
});

router.get("/show/posts", isLoggedIn, async function (req, res) {
  const user = await userModel
    .findOne({ username: req.session.passport.user })
    .populate("posts");

  res.render("show", { user: user });
});
router.get("/feed", isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const posts = await postModel.find().populate("user");
  res.render("feed", { posts, user });
});

//handle file upload starts
//pfp upload
router.post("/pfp-upload", upload.single("pfp"), async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  user.profileImage = req.file.filename;
  await user.save();
  //Access file details via req.file
  if (!req.file) {
    return res.status(400).send("No files were uploaded");
  }

  // res.send("uploaded");

  res.redirect("/profile");
});

router.post(
  "/createpost",
  isLoggedIn,
  upload.single("postimage"),
  async function (req, res) {
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    const post = await postModel.create({
      user: user._id,
      title: req.body.title,
      description: req.body.description,
      website: req.body.website,
      image: req.file.filename,
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
  }
);
//handle file upload ends

//register and login starts
router.post("/register", function (req, res) {
  var userData = new userModel({
    fullname: req.body.fullname,
    email: req.body.email,
    username: req.body.username,
    contact: req.body.contact,
  });
  userModel
    .register(userData, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/login");
  });
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

//register and login ends

module.exports = router;
