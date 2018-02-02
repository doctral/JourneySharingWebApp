var mongoose=require("mongoose");

//set schema for mongoose, and associate campground DB and Comment DB together
var campground_schema=new mongoose.Schema({
   name:String,
   image:String,
   descript: String,
   price: String,
   location: String,
   author:{
      id:{
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments:[
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
       }
    ]
});

module.exports = mongoose.model("Campground", campground_schema);