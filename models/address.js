module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define("address", {
    country: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    statusDelete: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
  return Address;
};
