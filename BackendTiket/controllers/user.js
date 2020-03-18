const jwt = require("jsonwebtoken");
const User = require("../models").user;
const Sq = require("sequelize");
const Op = Sq.Op;

exports.registrasi = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
      gender,
      phone,
      address
    } = req.body;
    const addUser = {
      name,
      status: 0,
      username,
      email,
      password,
      gender,
      phone,
      address
    };
    const cekUser = await User.findOne({
      attributes: [[Sq.fn("COUNT", Sq.col("id")), "id"]],
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (cekUser.id == 0) {
      const data = await User.create(addUser);
      if (data) {
        const token = jwt.sign({ userId: data.id }, "my-secret-key");
        res.send({
          msg: "success",
          token: token
        });
      }
    } else {
      res.status(400).send({
        msg: "Username atau email sudah digunakan"
      });
    }
  } catch (error) {
    res.status(400).send({
      msg: "Error"
    });
    console.log(error.message);
  }
};

exports.cekUser = async (req, res) => {
  try {
    const data = await User.findOne({
      where: { id: req.user.userId },
      attributes: ["id", "status", "name"]
    });
    res.send({
      data
    });
  } catch (error) {
    console.log(error.message);
    // res.status(401).send({
    //   data: "error"
    // });
  }
};

exports.count = async (req, res) => {
  try {
    const cekUsername = await User.findAll({
      where: { username: req.body.username }
    });
    res.send({
      // count: data.count

      cekUsername
    });
  } catch (error) {
    res.status(401).send({
      msg: error.message
    });
  }
};
