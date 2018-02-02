var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment  = require("./models/comment");
var testdata=[
    {
        name:"Jiu Zhai Gou",
        image:"http://www.photosforclass.com/download/316612921",
        descript:"Beautiful Place!!!!!!!!!!!!!!!11"
    },
    {
        name:"Beijing",
        image:"http://www.photosforclass.com/download/316612922",
        descript:"Beautiful Place!!!!!!!!!!!!!!!11"
    },
    {
        name:"Jiu Zhai Gou",
        image:"http://www.photosforclass.com/download/246477439",
        descript:"Beautiful Place!!!!!!!!!!!!!!!11"
    },
    {
        name:"Jiu Zhai Gou",
        image:"http://www.photosforclass.com/download/4270995674",
        descript:"Beautiful Place!!!!!!!!!!!!!!!11"
    },
    {
        name:"Jiu Zhai Gou",
        image:"http://www.photosforclass.com/download/5012188681",
        descript:"Beautiful Place!!!!!!!!!!!!!!!11"
    }
    ];

function seedDB(){
    // clean DB
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
    //   // console.log("Removed Campgrounds!");
    //         // upload some sample data
    //     testdata.forEach(function(seed){
    //     Campground.create(seed, function(err, campground){
    //         if(err){
    //           console.log(err);  
    //         }
    //         else{
    //           // console.log("Added a new campground");
    //             Comment.create({
    //                 text: "The best chef knife can’t be defined by a single aspect or even a set of features. It’s really all about hand-feel: The knife you choose should comfortably tackle a variety of tasks in the kitchen and it should ideally function as an extension of your forearm. We consulted with professional chefs, a cooking instructor, and a knife expert, and then we headed to the kitchen to chop, dice, and peel with 11 best-selling chef knives to see which ones stood out in a competitive field",
    //                 author: "Obama"
    //             },
    //             function(err, comment){
    //               if(err){
    //                   console.log(err);
    //               } 
    //               else{
    //                   campground.comments.push(comment);
    //                   campground.save();
    //                  //  console.log("Created new Comments");
    //               }
    //             });
    //         }
    //         });
    //     });
        
        
    });
}

module.exports=seedDB;