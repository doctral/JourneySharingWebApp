var express = require("express"),
    router  = express.Router(),
    middleware = require("../middleware/index"),
    Campground = require("../models/campground");

router.get("/", function(req, res){
    // get all data from DB
    Campground.find({}, function(err, allCamps){
        if(err){
            req.flash("Error", err.message);
        }
        else{
            res.render("campgrounds/index", {yelpcamps:allCamps, currentUser:req.user});
        }
    });
});

router.get("/new", middleware.isLoggedIn,function(req, res){
   res.render("campgrounds/new"); 
});

// show page for a particular item
router.get("/:id", function(req, res){
    // find the item on DB
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err){
            req.flash("Error", err.message);
        }
        else{
            res.render("campgrounds/show", {campground:foundCamp});
        }
    });
});

// get data from input form via POST
router.post("/", middleware.isLoggedIn, function(req, res){
    var name=req.body.name;
    var image=req.body.image;
    var des=req.body.descript;
    var price=req.body.price;
    var location=req.body.location;
    var author = {
      id: req.user._id,
      username: req.user.username
    };
    Campground.create({name:name, image:image, descript:des, author: author, price:price, location: location}, function(err, camp){
        if(err){
            req.flash("Error", err.message);
        }
        else{
            res.redirect("/photos");
        }
    });
});

// Add edit route
router.get("/:id/edit", middleware.checkCampgroundOwnship, function(req, res){
        Campground.findById(req.params.id, function(err, foundCamp){
            res.render("campgrounds/edit", {campground: foundCamp});
            
        });
});

// add update route
router.put("/:id", middleware.checkCampgroundOwnship, function(req, res){
    // find and update the correct campground
    // redirect the page to somewhere
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCamp){
        if(err){
            req.flash("Error", "Failed to update!");
            res.redirect("/photos");
        }
        else{
            res.redirect("/photos/"+req.params.id);
        }
    });
});

// add delete route
router.delete("/:id", middleware.checkCampgroundOwnship, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           req.flash("Error", err.message);
           res.redirect("/photos");
       }
       else{
           res.redirect("/photos");
       }
   });
});

module.exports = router;