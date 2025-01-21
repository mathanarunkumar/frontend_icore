const express = require('express');
const router = express.Router();
const authMiddleware = require('.././middleware/auth-middleware');
const userComtroller = require("../controller/user-controller")
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/getuser",authMiddleware,userComtroller.getUser)
router.put("/updateuser",authMiddleware,userComtroller.updateUser)
router.delete("/deleteuser",authMiddleware,userComtroller.deleteUser)
router.post("/upload-users", authMiddleware, upload.single("file"), userComtroller.adduploadUsers);
router.post("/export-user", authMiddleware, userComtroller.exportUser);


module.exports = router;