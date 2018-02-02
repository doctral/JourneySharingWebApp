var express       = require("express"),
    app           = express(),
    bodyparser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    flash         = require("connect-flash"),
    LocalStrategy = require("passport-local"),
    User          = require("./models/user"),
    methodOverride= require("method-override"), 
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    path          = require("path"),
    seedDB        = require("./seed");

var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    authRoutes       = require("./routes/authentication");

mongoose.connect(process.env.DB_yelpcamp); 
//mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname+"/games/colorGame"));
app.use(express.static(__dirname+"/games/patatap"));
app.use(methodOverride("_method"));
app.use(flash());
//app.use(colorGame());
//seedDB();   // seed the DB

//#########################################################
// AUTHENTICATION CONFIGURATION
//########################################################
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// this helps to make each route can use the currentUser
app.use(function(req, res, next){
   res.locals.currentUser=req.user;
   res.locals.error=req.flash("Error");
   res.locals.info=req.flash("Info");
   res.locals.success=req.flash("Success");
   next();
});
//###########################################################################

app.use(authRoutes);
app.use("/photos", campgroundRoutes);
app.use("/photos/:id/comments",commentRoutes);

app.get("/colorgame", function(req, res){
    res.sendFile(path.join(__dirname+"/games/colorGame/colorGame.html"));
});

app.get("/patatap", function(req, res){
    res.sendFile(path.join(__dirname+"/games/patatap/Patatap.html"));
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is working now"); 
});