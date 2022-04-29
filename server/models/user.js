const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
  });
  User.beforeSave((user) => {
    const userToChange = user;
    if (user.changed('password')) {
      userToChange.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  User.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
      if (err) {
        return cb(err);
      }
      return cb(null, isMatch);
    });
  };

  User.associate = (models) => {
    User.hasMany(models.News, {
      foreignKey: {
        name: 'author_id',
        allowNull: false,
      },
      as: 'news',
    });
  };
  return User;
};
