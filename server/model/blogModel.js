module.exports = (sequelize, DataTypes) => {
  const BlogModel = sequelize.define("Blog", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
    view: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
  });
  return BlogModel;
};
