const express = require('express');
const router = express.Router();
const userLogAndRegController = require("../controller/register/user-reg-controller")

router.post("/userreg",userLogAndRegController.userRegister)
router.post("/loguser",userLogAndRegController.loginUser)



module.exports = router;