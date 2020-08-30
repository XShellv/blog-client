module.exports = () => {
  const sequelize = require("./util/database");
  const model = require("./models");

  model.Post.belongsToMany(model.Tag, {
    through: model.PostTag,
  });

  model.Tag.belongsToMany(model.Post, {
    through: model.PostTag,
  });
  return sequelize.sync({ force: false });
};