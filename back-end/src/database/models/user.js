const user = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      email: {
        unique: true,
        type: DataTypes.STRING,
      },
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    }, 
    { 
      timestamps: false,
      underscored: true,
    },
  );

  user.associate = (models) => {
    user.hasMany(models.sale, {
      foreignKey: 'id',
      as: 'salesUser',
    });

    user.hasMany(models.sale, {
      foreignKey: 'id',
      as: 'salesSeller',
    });
  };

  return user;
};

module.exports = user;