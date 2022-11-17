const router = require("express").Router();
const multer = require("multer");
const {getAllUser, registerUser, loginUser, deleteUser, updateUser, getUser} = require("../controller/user");


const storage = multer.diskStorage({
    destination:function(req, file, cb) {
        cb(null, "./public/images/user-images")
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({storage:storage})

router.get("/getAllUser", getAllUser)
router.get("/getUser/:id", getUser)
router.post("/registerUser", upload.single("profileImage"), registerUser)
router.post("/loginUser", upload.none(), loginUser)
router.delete("/deleteUser/:id", deleteUser)
router.put("/updateUser/:id", updateUser)



module.exports = router;
