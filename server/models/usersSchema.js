const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    summary: {
        type: String,
        required: true,
        trim: true
    },
    profile: {
        type: String,
        required: true,
    },  
    datecreated:Date,
    dateUpdated:Date
});


const users = new mongoose.model("users",usersSchema);

module.exports = users ;


