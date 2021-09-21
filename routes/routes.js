const express = require("express");

const enrutador = express.Router();

const communities = require("../controllers/communities");
const address = require("../controllers/address");

//rutas para comunidades
enrutador
  .route("/communities")
  .get(communities.getCommunities)
  .post(communities.createCommunity);

enrutador
  .route("/communities/:id")
  .put(communities.updateCommunites)
  .delete(communities.deleteCommunity);

//rutas para address

enrutador
  .route("/address")
  .get(address.getAddresses)
  .post(address.createAddress);

enrutador
  .route("/address/:id")
  .put(address.updateAddress)
  .delete(address.deleteAddress);

module.exports = enrutador;
