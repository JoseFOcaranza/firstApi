module.exports = (sequelize, Sequelize) => {
  const Community = sequelize.define("community", {
    name: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    statusDelete: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
  return Community;
};
