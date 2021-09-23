const express = require("express");

const enrutador = express.Router();

const communities = require("../controllers/communities");
const address = require("../controllers/address");
const generalities = require("../controllers/generalities");

const { verifyToken } = require("../middleware/authorization");

//rutas para comunidades
enrutador
  .route("/communities")
  .get(verifyToken, communities.getCommunities)
  .post(communities.createCommunity);

enrutador
  .route("/communities/:id")
  .put(communities.updateCommunites)
  .delete(communities.deleteCommunity);

//rutas para address

enrutador
  .route("/address")
  .get(verifyToken, address.getAddresses)
  .post(address.createAddress);

enrutador
  .route("/address/:id")
  .put(address.updateAddress)
  .delete(address.deleteAddress);

// rutas para generalidades

enrutador.route("/login").post(generalities.login);

module.exports = enrutador;
