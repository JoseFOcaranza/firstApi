const db = require("../models/index");

const address = db.address;
const community = db.community;

exports.createAddress = async (req, res) => {
  try {
    const { body } = req;

    if (!body.country)
      return res.send(400).send({ msg: "country es requerido" });
    if (!body.state) return res.send(400).send({ msg: "state es requerido" });
    if (!body.city) return res.send(400).send({ msg: "city es requerido" });

    const create = await address.create({
      country: body.country,
      state: body.state,
      city: body.city,
    });

    return res.status(200).send({ msg: "Direccion creada correctamente" });
  } catch (error) {
    return res.status(500).send(message.error);
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const find = await address.findAll({
      where: { statusDelete: false },
      include: {
        model: community,
      },
    });
    return res.status(200).send(find);
  } catch (error) {
    return res.status(500).send(message.error);
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { body, params } = req;

    if (!body) return res.status(400).send({ msg: "Los datos son requeridos" });

    const find = await address.findOne({
      where: { id: params.id, statusDelete: false },
    });

    if (!find) return res.status(404).send({ msg: "Address no existe" });

    find.country = body.country;
    find.state = body.state;
    find.city = body.city;
    find.save();
    return res.status(200).send({ msg: "Address actualizada correctamente" });
  } catch (error) {
    return res.status(500).send(message.error);
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const validate = await address.findByPk(id);
    if (!validate) return res.status(404).send({ msg: "Address no existe" });
    if (validate.statusDelete === true)
      return res.status(404).send({ msg: "Address no existe" });

    validate.statusDelete = true;
    validate.save();

    return res.status(200).send({ msg: "Address eliminado correctamente" });
  } catch (error) {
    return res.status(500).send(message.error);
  }
};
