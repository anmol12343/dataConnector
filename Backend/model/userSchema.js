
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },

    data:[{
         type:mongoose.Schema.Types.ObjectId,  
         ref:'FormSubmissionSchema'
    }]
})

module.exports = mongoose.model('UserSchema', userSchema);