const router = require("express").Router();
const multer = require("multer")
const {
    getAllFAQ,
    getFAQ,
    updateFAQ,
    addFAQ,
    deleteFAQ,
} = require("../controller/buyingFAQ");


router.get("/getAllFAQ", getAllFAQ);
router.get("/getFAQ/:id", getFAQ);
router.post("/addFAQ", addFAQ);
router.delete("/deleteFAQ/:id", deleteFAQ);
router.put("/updateFAQ/:id", updateFAQ);


module.exports = router;
