const db = require("../models/index");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const bcrypt = require("bcryptjs");

const uploadImages = require("../utils/uploadImages");
const community = db.community;
const address = db.address;

exports.createCommunity = async (req, res) => {
  try {
    const { body } = req;

    if (!body.name)
      return res.status(404).send({ message: "name es requerido" });
    if (!body.type)
      return res.status(404).send({ message: "type es requerido" });

    if (!body.addressId)
      return res.status(404).send({ message: "addressId es requerido" });

    const findAddress = await address.findOne({
      where: { id: body.addressId, statusDelete: false },
    });

    let logo = await uploadImages.fileUpload(body.logo, "/logos");

    let encriptedPassword = bcrypt.hashSync(body.password, 10);

    if (!findAddress)
      return res.status(404).send({ msg: "Address no encontrado" });

    const create = await community.create({
      email: body.email,
      password: encriptedPassword,
      name: body.name,
      type: body.type,
      addressId: body.addressId,
      logo: logo,
    });

    return res.status(201).send({ message: "Comunidad creada correctamente" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getCommunities = async (req, res) => {
  try {
    const { stateName } = req.query;

    if (stateName) {
      const find = await community.findAll({
        where: { statusDelete: false },
        include: {
          model: address,
          where: { state: { [Op.iRegexp]: stateName } },
        },
      });

      return res.status(200).send(find);
    }

    const find = await community.findAll({
      where: { statusDelete: false },
    });

    return res.status(200).send(find);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
};

exports.updateCommunites = async (req, res) => {
  try {
    const { body, params } = req;

    if (!body)
      return res.status(400).send({ message: "Los datos son requerido" });
    if (!body.name)
      return res.status(404).send({ message: "name es requerido" });
    if (!body.type)
      return res.status(404).send({ message: "type es requerido" });

    const validate = await community.findOne({
      where: { id: params.id },
    });

    if (!validate)
      return res.status(404).send({ message: "No se encontro comunidad" });
    if (validate.statusDelete === true)
      return res.status(404).send({ message: "No se encontro comunidad" });

    validate.name = body.name;
    validate.type = body.type;
    validate.save();

    return res
      .status(200)
      .send({ message: "Comunidad se actualizo correctamente" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.deleteCommunity = async (req, res) => {
  try {
    const { id } = req.params;

    const find = await community.findByPk(id);

    if (!find)
      return res.status(404).send({ message: "No se encontro comunidad" });
    if (find.statusDelete === true)
      return res.status(404).send({ message: "No se encontro comunidad" });

    find.statusDelete = true;
    find.save();

    return res
      .status(200)
      .send({ message: "Comunidad eliminada correctamente" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
