const mongoose = require('mongoose');

const masterForm = mongoose.Schema({
    masterFormName:{
        type:String
    },
    formId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FormSchema"
    }]
})

module.expots = mongoose.model("masterFormSchema",masterForm);