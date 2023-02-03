const db = require("../model");
const categoryModel = db.category;

const CategoryController = {
  get: async (req, res, next) => {
    try {
      const categorys = await categoryModel.findAll({});
      return res.status(200).json({ success: true, data: categorys });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = CategoryController;
