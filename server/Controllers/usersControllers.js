const users = require("../models/usersSchema"); // Ensure this path is correct
const moment = require('moment'); // Ensure moment is imported

// Add Data
exports.userpost = async (req, res) => {
    const file = req.file ? req.file.filename : null; // Handle case where file might not be uploaded
    const { name, summary } = req.body;

    if (!name || !summary || !file) {
        return res.status(400).json("All inputs are required");
    }

    try {
        const datecreated = new Date().toISOString();

        const userData = new users({
            name,
            summary,
            profile: file,
            datecreated
        });

        await userData.save();
        res.status(200).json(userData);
        console.log(userData);

    } catch (error) {
        console.error("Error in userpost:", error);
        res.status(500).json("Internal Server Error");
    }
};


// All User
exports.userget = async (req, res) => {
    try {
        const usersdata = await users.find()
        res.status(200).json(usersdata)
    } catch (error) {
        res.status(401).json(error)
    }

}

// single user get
exports.singleuserget = async (req, res) => {

    const { id } = req.params;

    try {
        const userdata = await users.findOne({ _id: id });
        res.status(200).json(userdata)
    } catch (error) {
        res.status(401).json(error)
    }
}


// user edit
exports.useredit = async (req, res) => {
    const { id } = req.params;
    const { name, summary, user_profile } = req.body;
    const file = req.file ? req.file.filename : user_profile

    const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    try {
        const updateuser = await users.findByIdAndUpdate({ _id: id }, {
            name, summary,  profile: file, dateUpdated
        }, {
            new: true
        });

        await updateuser.save();
        res.status(200).json(updateuser);
    } catch (error) {
        res.status(401).json(error)
    }
}


// delete user
exports.userdelete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletuser = await users.findByIdAndDelete({ _id: id });
        res.status(200).json(deletuser);
    } catch (error) {
        res.status(401).json(error)
    }
}