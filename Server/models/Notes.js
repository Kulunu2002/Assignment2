const mongoose = require("mongoose")
const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    note:{
        type:String,
        required:true
    },
    isComplete:{
        type:Boolean
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }
})

const Notes = mongoose.model("Notes", notesSchema);
module.exports = Notes;
