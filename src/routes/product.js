const router = require("express").Router();
const multer = require("multer");
const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  searchProduct,
} = require("../controller/product");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/product-images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// const storaged = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/images/product-images/floorplan");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const uploaded = multer({ storage: storaged });

router.get("/getAllProducts", getAllProducts);
router.get("/getProduct/:id", getProduct);
router.get("/searchProduct/:key", searchProduct);
router.post(
  "/addProduct",
  upload.fields([
    { name: "productImages", maxCount: 5 },
    { name: "floorplan", maxCount: 1 },
  ]),
  addProduct
);

// router.post(
//   "/addProduct",
//   upload.array("productImages", 5),
//   uploaded.single("floorplan" ),
//   addProduct
// );
router.delete("/deleteProduct/:id", deleteProduct);
router.put("/updateProduct/:id", updateProduct);
module.exports = router;
