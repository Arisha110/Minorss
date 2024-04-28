const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true,
        min:3,
        max:30
    },
    address:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        min:10
    },
    profilePic:{type:String}

})

userSchema.pre("save", async function(next){
    const user = this
    if(!user.isModified("password")){
        next()
    }
    user.password = await bcrypt.hash(user.password,10)
})



// userSchema.methods.generateJwtToken = function (type) {
//     // let expiresIn = '';
//     // let secretKey = '';

//     // if (type === 'access') {
//     //     expiresIn = '15m';
//     //     secretKey = process.env.ACCESS_SECRET_KEY; 
//     // } else if (type === 'refresh') {
//     //     expiresIn = '7d';
//     //     secretKey = process.env.REFRESH_SECRET_KEY; 
//     //     throw new Error('Invalid token type');
//     // }
   
  

//     // if (!secretKey) {
//     //     throw new Error('Secret key not found');
//     // }

//     // return jwt.sign(, secretKey, { expiresIn });
//     return {accessToken,refreshToken};
// }

module.exports = mongoose.model('users',userSchema)