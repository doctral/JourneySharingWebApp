var Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middlewareObj={};

middlewareObj.checkCommentsOwnship = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.flash("Error", "Cannot find this comment!");
                res.redirect("back");
            }
            else if(!foundComment){
                res.flash("Error", "Comment cannot be found!");
                res.redirect("back");
            }
            // foundCamp.author.id is an object, while req.user._id is a string
            // therefore, we need to use equal to compare..
            else if(foundComment.author.id.equals(req.user._id)){
                next();
            }
            else{
                res.redirect("back");
            }
        });
    }
    else{
        req.flash("Error", "You don't have permission to do that, please login at first!");
        res.redirect("back");
    }
}

middlewareObj.checkCampgroundOwnship = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCamp){
            if(err){
                req.flash("Error", "Cannot find this campgrounp!");
                res.redirect("/photos");
            }
            else if(!foundCamp){
                res.flash("Error", "Campground not found");
                res.redirect("back");
            }
            // foundCamp.author.id is an object, while req.user._id is a string
            // therefore, we need to use equal to compare..
            else if(foundCamp.author.id.equals(req.user._id)){
                next();
            }
            else{
                req.flash("Error", "You don't have permission to do that.");
                res.redirect("/photos");
            }
        });
    }
    else{
        req.flash("Error", "You don't have permission to do that, please login at first!");
        res.redirect("/login");
    }
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("Error", "You don't have permission to do that, please login at first!");
    res.redirect("/login");
}

module.exports = middlewareObj;