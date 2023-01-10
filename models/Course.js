const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    description: {
        type:String
    },
    status: {
        type: String,
        enum:["Good","Better","Best"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model("Course", courseSchema);