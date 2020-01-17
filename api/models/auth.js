'use strict';
module.exports = (sequelize, DataTypes) => {
  const auth = sequelize.define('auth', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
    }
  }, {timestamp:false});
  auth.associate = function(models) {
    // associations can be defined here
  };
  return auth;
};