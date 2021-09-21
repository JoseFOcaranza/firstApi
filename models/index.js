const Sequelize = require("sequelize");
const DB = require("../config/config");

const sequelize = new Sequelize(DB.DBNAME, DB.USER, DB.PASSWORD, {
  host: DB.HOST,
  dialect: DB.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.community = require("./community")(sequelize, Sequelize);
db.address = require("./address")(sequelize, Sequelize);
db.member = require("./member")(sequelize, Sequelize);

db.address.hasMany(db.community);
db.community.belongsTo(db.address);

module.exports = db;
