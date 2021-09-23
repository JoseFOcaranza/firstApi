const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../models/index");

const community = db.community;

const privateKey = "Llav3PrivAda321.";
const { expireIn } = "1h";

exports.login = async (req, res) => {
  try {
    const { body } = req;

    if (!body.email) return res.status(404).send({ msg: "Email es requerido" });
    if (!body.password)
      return res.status(404).send({ msg: "Password es requerida" });

    const communityUser = await community.findOne({
      where: {
        email: body.email,
        statusDelete: false,
      },
    });

    if (!communityUser)
      return res.status(404).send({ msg: "Credenciales invalidas" });

    if (!bcrypt.compareSync(body.password, communityUser.password))
      return res.status(400).send({ msg: "Credenciales invalidas" });

    const response = {
      id: communityUser.id,
      name: communityUser.name,
      type: communityUser.type,
    };

    let token = jwt.sign(
      {
        community: response,
      },
      privateKey,
      expireIn
    );

    return res.status(200).send({
      community: response,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
};
