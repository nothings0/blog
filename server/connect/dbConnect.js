const { sequelize } = require("../model");

const connect = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("connected..");
    })
    .catch((err) => {
      console.log("Error" + err);
    });
};

connect();

module.exports = connect;
