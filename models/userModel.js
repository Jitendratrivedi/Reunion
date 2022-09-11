const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const UserSchema = new mongoose.Schema({
	
	Username: { type: String,trim :true },
    Following: { type: [String]},
    Follower: { type: [String]},
    followerCount: { type: Number},
    email: { type: String, required: true,unique:true},
    password: { type: String, required: true},
    like:{type:[ObjectId],ref:"Post"}	

}, {timestamps:true})

module.exports = mongoose.model('User', UserSchema)