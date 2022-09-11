const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  try {
    let data = req.body;

    let emailAlreadyExists = await userModel.findOne({ email: email });
    if (emailAlreadyExists) {
      return res.status(400).send({ status: false, msg: "email already used" });
    }
    let insertedRecord = await userModel.create(data);
    res.status(201).send({ status: true, msg: "success", data: insertedRecord });
  } catch {
    res.status(500).send({status:false,message:err.message})
  }
};
const authenticate=async function(req,res){
    try{
        let body=req.body 
        if(!validator.isValidRequestBody(body)){
                return res.status(400).send({status:false,message:"Please provide login details"})
        }        
        
        let {email,password}=req.body
        
        if(!validator.isValid(email)){
            return res.status(400).send({status:false,message:"Email is required"})
    
        }
        
        
        if(!validator.isValid(password)){
            return res.status(400).send({status:false,message:"Password is required"})
    
        }

        if(!validator.isValidEmail(email)){

            return res.status(400).send({status:false,msg:"email is invalid"})
         }
        
        
        if(!validator.isValidPassword(password)){
        
            return res.status(400).send({status:false,msg:"password is not valid"})
        }
    
    
        let data=await userModel.findOne({email:email,password:password})
        if(!data){
            return res.status(400).send({status:false,message:"Invalid login credentials"})
        } 
        else{
            let token=jwt.sign({userId:data._id},"ReunionAssignment", {expiresIn:"10h"})
            res.status(200).send({status:true,data:{token:token}})
    
        }
    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}

const getUser=async function(req,res){
    try{
      let decodedtoken=req.decodedtoken

      let condition = await userModel.findById(decodedtoken.userId).select({Username:1,Following:1,Follower:1,followerCount:1});
      if (condition) 
      {

          res.status(201).send({ status: true,data: condition });
        
      } else {
        res.status(404).send({ status: false, msg: "UserId does not found in Database" });
      }
    }
    catch{res.status(500).send({ status: false, msg: error.message });}
}









module.exports = { createUser,authenticate,getUser};
