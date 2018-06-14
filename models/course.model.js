var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var courseSchema = new Schema({
   
    title: {
        type: String,
        required: true
    },
    
    teacherID: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    
    members:{
        type: [String]
    }
   
});



module.exports = mongoose.model('course', courseSchema);