const mongoose = require('mongoose');
const notesSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    shared:{
        type:Boolean,
        default:false,
    },
    author:{
        type:String,
        required:true,
    },
    shared_id:{
        type:Array,
        default:[]
    }
});
module.exports = mongoose.model('notes',notesSchema);