const mongoose = require('mongoose');
const FormInputSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    placeholder:String,
    type:{
        type:String,
    },
    minLen:Number,
    maxLen:Number,
    minValue:Number,
    maxValue:Number,
    regex:String,
    is_mandatory: Boolean,
    visibility:Boolean,
    label:String,
    dropDown:[]
})
module.exports = mongoose.model("FormInputSchema", FormInputSchema);