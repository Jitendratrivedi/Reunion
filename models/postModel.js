const mongoose = require('mongoose')


const ObjectId = mongoose.Schema.Types.ObjectId
const PostSchema = new mongoose.Schema({
	
	title: { type: String, required: true,trim :true },
    comments: { type: [String]},
    likes: { type:Number ,default:0},
    
    desc: { type: String, required: true,unique:true},
    isDeleted:{type :Boolean,defult:false},
    createdBy: { type: ObjectId, ref:"User"},	

}, {timestamps:true})

module.exports = mongoose.model('Post', PostSchema)