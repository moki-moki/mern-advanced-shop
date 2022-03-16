const router = require("express").Router();

const {
  getAllProducts,
  getSingleProduct,
  getShowcaseProducts,
  deleteProduct,
  addProduct,
} = require("../controllers/product");

const { verifyAdmin } = require("../middleware/verifyToken");

router.get("/", getShowcaseProducts);
router.get("/allProducts", getAllProducts);
router.get("/:id", getSingleProduct);

// ADD VERIFICATION FOR ADMIN
router.post("/addProduct", verifyAdmin, addProduct);
router.delete("/delete/:id", verifyAdmin, deleteProduct);

module.exports = router;
