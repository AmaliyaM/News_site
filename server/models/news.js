const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      News.belongsTo(models.Users, {
        foreignKey: 'author_id',
        as: 'news',
      });
    }
  }
  News.init({
    text: DataTypes.STRING,
    theme: DataTypes.STRING,
    tags: DataTypes.STRING,
    author_id: DataTypes.INTEGER,
    author_name: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'News',
  });

  return News;
};
