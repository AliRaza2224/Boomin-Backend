const router = require("express").Router();
const multer = require("multer");
const {
  getAllNews,
  addNews,
  deleteNews,
  updateNews,
  getNews,
} = require("../controller/latestNews");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/news-images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/getAllNews", getAllNews);
router.get("/getNews/:id", getNews);
router.post("/addNews", upload.single("newsImage"), addNews);
router.delete("/deleteNews/:id", deleteNews);
router.put("/updateNews/:id", updateNews);
module.exports = router;
