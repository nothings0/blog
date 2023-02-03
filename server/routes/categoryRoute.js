const router = require("express").Router();
const CategoryController = require("../controller/CategoryController");

router.get("/", CategoryController.get);

module.exports = router;
