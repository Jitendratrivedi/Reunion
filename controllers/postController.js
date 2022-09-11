const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

const createPost = async function (req, res) {
  try {
    let data = req.body;
      
    if(!data.title){

        return res.status(400).send({status:false,msg:"title is not valid"})
    
    }
    if(!data.desc){

        return res.status(400).send({status:false,msg:"description is not valid"})
    
    }
    let insertedRecord = await postModel.create(data);
    res.status(201).send({ status: true, msg: "success", data: insertedRecord });
  } catch {
    res.status(500).send({status:false,message:err.message})
  }
};
const getPost=async function(req,res){
    try{
        let data = req.params.id;

        let post= await postModel.findOne({_id:data,isDeleted:false}).select({likes:1,comments:1})
    
    if(!post) {
        return res.status(404).send({stats:false,message:"No post found"})
    }
    res.status(200).send({status:true,message:"Books list",data:post})

    }
    catch{
        res.status(500).send({ status: false, msg: error.message });
    }
}
const getallPost=async function(req,res){
    try{
      

        let post= await postModel.find({isDeleted:false}).sort({createdAt:1})
    
    if(!post) {
        return res.status(404).send({stats:false,message:"No post found"})
    }
    res.status(200).send({status:true,message:"Books list",data:post})

    }
    catch{
        res.status(500).send({ status: false, msg: error.message });
    }
}
const deletePost=async function(req,res){
    try{
      
    let postId = req.params.id;

    let post = await postModel.findById(postId);

    if (!post) {
      return res.status(400).send("NOT A VALID Book ID");
    }
    if(post.isDeleted==true) 
   { 
    return res.status(400).send({status:false,message:"Post has been already deleted"})
   }
    else {
      let save = await postModel.findOneAndUpdate(
        { _id: postId },
        {
          $set: { isDeleted: true, deletedAt: Date.now() },
        },
        { new: true }
      );}
    res.status(200).send({status:true,message:"Post has been deleted"})

    }
    catch{
        res.status(500).send({ status: false, msg: error.message });
    }
}
module.exports={createPost,getPost,getallPost,deletePost}