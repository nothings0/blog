const dbConfig = require("../config");
const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const operatorsAliases = {
  $like: Op.like,
  $or: Op.or,
};
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  process.env.MYSQL_PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false,
    timezone: "+07:00",
    operatorsAliases,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};

sequelize.sync({ force: false }).then(() => {
  console.log("re-sync done!");
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.blog = require("./blogModel")(sequelize, DataTypes);
db.category = require("./categoryModel")(sequelize, DataTypes);
db.blogCategory = require("./BlogCategory")(sequelize, DataTypes);

db.blog.belongsToMany(db.category, { through: db.blogCategory });
db.category.belongsToMany(db.blog, { through: db.blogCategory });

module.exports = db;
