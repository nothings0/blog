const router = require("express").Router();
const BlogController = require("../controller/BlogController");

router.post("/", BlogController.create);
router.get("/", BlogController.getAll);
router.get("/search", BlogController.search);
router.get("/category", BlogController.getByCate);
router.get("/:slug", BlogController.get);
router.put("/:slug", BlogController.update);
router.delete("/:slug", BlogController.delete);

module.exports = router;
