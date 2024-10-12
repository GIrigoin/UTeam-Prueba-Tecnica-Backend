const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Person", {
    "first-name": {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
      unique: "compositeIndex",
    },
    "last-name": {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
      unique: "compositeIndex",
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    "has-insurance": {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
};
