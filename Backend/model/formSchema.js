const mongoose = require('mongoose');
const Form = new mongoose.Schema({
    form_name:{
        type:String,
        required:true
    },
    inputFields:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FormInputSchema",
        required:true
    }],
})
module.exports = mongoose.model('FormSchema', Form);