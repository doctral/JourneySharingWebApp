var express = require("express"),
    router  = express.Router(),
    User    = require("../models/user"),
    passport = require("passport");

router.get("/", function(req, res){
    res.render("landing");
});

//###############################################################################3

//################################################################################
// AUTHENTICATION ROUTES
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle the sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("Error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("Success", "Welcome "+req.body.username);
           res.redirect("/photos"); 
        });
    });
});

// login routes
router.get("/login", function(req, res){
    res.render("login");
});

// handle login logic
router.post("/login", passport.authenticate("local", {
   successRedirect:"/photos",
   failureRedirect:"/login"
}), function(req, res){
    
});

// handle logout logic
router.get("/logout", function(req, res){
    req.flash("Info", "Logout successfully!");
    req.logout();
    res.redirect("/photos");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
