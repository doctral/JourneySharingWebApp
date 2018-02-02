var express = require("express"),
    router  = express.Router({mergeParams:true}),  // add mergeParams so as to share req.params
    Campground = require("../models/campground"),
    middleware = require("../middleware/index"),
    Comment = require("../models/comment");

//################################################
// Comments routes
//################################################
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
        if(err){
            req.flash("Error", err.message);
        }
        else{
            res.render("comments/new", {camp:foundCamp});
        }
    })
});

router.post("/", middleware.isLoggedIn, function(req, res){
   // look up campground using id
   Campground.findById(req.params.id, function(err, foundCamp){
       if(err){
           req.flash("Error", err.message);
           res.redirect("/photos");
       }
       else{
   // create new comment
   // connect new comment to campground
   // redirect to campground show page 
           Comment.create(req.body.comment, function(err, comment){
              if(err){
                  req.flash("Error", err.message);
              }
              else{
                  // add username and id to comment
                  // save comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  comment.date=formatDate(new Date());
                  comment.save();
                  foundCamp.comments.push(comment);
                  foundCamp.save();
                  req.flash("Success", "Update comment successfully");
                  res.redirect("/photos/"+foundCamp._id);
              }
           });
       }
   });
});

router.get("/:comment_id/edit",middleware.checkCommentsOwnship, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit", {camp_id: req.params.id, comment:foundComment});
        }
    });
});

router.put("/:comment_id", middleware.checkCommentsOwnship,function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/photos/"+req.params.id);
        }
    });
});

router.delete("/:comment_id", middleware.checkCommentsOwnship,function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            
        }
        res.redirect("/photos/"+req.params.id);
    });
});

function formatDate(date) {
  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sept", "Oct",
    "Nov", "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day+'-'+monthNames[monthIndex] + '-' + year;
}

module.exports = router;