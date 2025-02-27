const mongoose = require('mongoose');

const formSubmission = new mongoose.Schema({
    data:[]
})

module.exports = mongoose.model('FormSubmissionSchema', formSubmission);