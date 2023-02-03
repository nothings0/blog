module.exports = (sequelize, DataTypes) => {
  const CategoryModel = sequelize.define(
    "Category",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
  return CategoryModel;
};
