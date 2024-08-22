const express = require("express");
const upload = require("../multerconfig/storageConfig");
const router = new express.Router();
const controllers = require("../Controllers/usersControllers")


router.post("/user/register",upload.single("user_profile"),controllers.userpost)
router.get("/user/details",controllers.userget)
router.get("/user/:id",controllers.singleuserget)
router.put("/user/edit/:id",upload.single("user_profile"),controllers.useredit)
router.delete("/user/delete/:id",controllers.userdelete);

module.exports = router