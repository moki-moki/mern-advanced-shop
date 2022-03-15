const router = require("express").Router();

const {
  getAllProducts,
  getSingleProduct,
  getShowcaseProducts,
  deleteProduct,
  addProduct,
} = require("../controllers/product");

// const { verifyToken, verifyToken } = require("../middleware/verifyToken");

router.get("/", getShowcaseProducts);
router.get("/allProducts", getAllProducts);
router.get("/:id", getSingleProduct);

// ADD VERIFICATION FOR ADMIN
router.post("/addProduct", addProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
