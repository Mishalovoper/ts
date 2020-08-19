const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  title:{
    type: String,
    required:true
  },
  description:{
    type: String,
    required:true
  },
  price:{
    type: Number,
    required:true
  },
  where:{
    type: String,
    required:true
  },
  date:{
    type: Date,
    required:true
  },
  contactinfo:{
    type: String,
    required:true
  },

});


router.post('/createPost', async (req,res) => {
  try{
  const {where,title,description,price,contactinfo,date} = req.body;
    const PostModel = mongoose.model(where, postSchema);
    const post = new PostModel({
      where,title,description,price,contactinfo,date
  });
    await post.save();
    res.send({
      message:"Post added sucessfully",
      error:""
    });
  }catch(err){
    res.send({message:"Post added failed",error:"Post not added, error happend!"+err.message});
  }
});

router.post('/getAllInLocation', async (req,res) => {
  const {where} = req.body;
  const PostModel = mongoose.model(where,postSchema);
  //const all = await PostModel.find();
  PostModel.find({}).limit(200).sort([['date', -1]]).exec(function(err, docs) {
    res.send(docs);
  });
});




module.exports = router;
