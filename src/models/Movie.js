const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Movie", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
