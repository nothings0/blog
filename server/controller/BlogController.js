const db = require("../model");
const categoryModel = db.category;
const BlogModel = db.blog;
const BlogCategory = db.blogCategory;
const Op = db.Sequelize.Op;

const genarate = (title) => {
  let slug = title.toLowerCase();
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  //Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, "-");
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");
  return slug;
};

const BlogController = {
  create: async (req, res, next) => {
    try {
      const { title, content, thumbnail, description, categorys } = req.body;
      const slug = genarate(title);
      const des = description.substring(0, 150);
      const blog = await BlogModel.create({
        title,
        content,
        description: des,
        thumbnail,
        slug,
        view: 5,
      });
      await categoryModel.bulkCreate(categorys, {
        updateOnDuplicate: ["name"],
      });
      const Icategorys = categorys.map((item) => item["name"]);
      const category = await categoryModel.findAll({
        where: { name: Icategorys },
      });
      await blog.addCategory(category, { through: BlogCategory });
      const result = await BlogModel.findOne({
        where: { slug },
        include: categoryModel,
      });
      return res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },
  get: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const blog = await BlogModel.findOne({
        where: { slug },
        include: [{ model: categoryModel, attributes: ["name"] }],
      });
      if (blog) {
        await blog.increment("view", { by: 1 });
        return res.status(200).json({ success: true, data: blog });
      } else {
        return res.status(404).json({ success: false, data: null });
      }
    } catch (err) {
      next(err);
    }
  },
  getAll: async (_, res, next) => {
    try {
      const blog = await BlogModel.findAll({
        include: [{ model: categoryModel, attributes: ["name"] }],
      });
      if (blog) {
        return res.status(200).json({ success: true, data: blog });
      } else {
        return res.status(404).json({ success: false, data: null });
      }
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const { title, content, thumbnail, description } = req.body;
      const des = description.substring(0, 150);
      const blog = await BlogModel.findOne({ where: { slug } });
      await blog.update(
        {
          title,
          content,
          thumbnail,
          description: des,
        },
        {
          where: {
            slug,
          },
        }
      );
      res.status(200).json({ success: true, msg: "update success" });
    } catch (err) {
      next(err);
    }
  },
  getByCate: async (req, res, next) => {
    try {
      const { type } = req.query;
      const blogs = await categoryModel.findOne({
        where: { name: type },
        include: [
          {
            model: BlogModel,
            include: [{ model: categoryModel, attributes: ["name"] }],
          },
        ],
      });
      res.status(200).json({ success: true, data: blogs });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { slug } = req.params;
      await BlogModel.destroy({
        where: { slug },
      });
      res.status(200).json({ success: true, msg: "delete success" });
    } catch (err) {
      next(err);
    }
  },
  search: async (req, res, next) => {
    try {
      const { q } = req.query;
      console.log(q);
      const blogs = await BlogModel.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: "%" + q + "%",
              },
            },
            {
              description: {
                [Op.like]: "%" + q + "%",
              },
            },
          ],
        },
      });
      return res.status(200).json({ success: true, data: blogs });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = BlogController;
