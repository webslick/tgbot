'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Admin_user.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    tokens: DataTypes.STRING,
    accaunts: DataTypes.STRING,
    toogle_status_bot: DataTypes.BOOLEAN,
    admin_chat_tg_id: DataTypes.STRING,
    albums: DataTypes.STRING,
    command_topics: DataTypes.STRING,
    topics: DataTypes.STRING,
    scammers: DataTypes.STRING,
    categories: DataTypes.STRING,
    info_project: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin_user',
  });
  return Admin_user;
};