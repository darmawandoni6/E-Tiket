const Payment = require("../models").payment;
const order = require("../models").order;
const User = require("../models").user;
const Kereta = require("../models").kereta;
const Type = require("../models").typekereta;

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname + "./../images/"),
  filename: function(req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
}).single("myImage");

exports.uploadData = (req, res) => {
  upload(req, res, err => {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file);

    const data = {
      attachment: req.file.filename
    };
    // if (!err) return res.send(200).end();
    if (!err) {
      Payment.update(data, { where: { id: req.params.id } })
        .then(upload => {
          res.send({ msg: "Success" });
        })
        .catch(err => {
          res.status(401).send({ msg: err.message });
        });
    } else console.log(err.message);
  });
};

exports.payment = async (req, res) => {
  try {
    const data = await order.findAll({
      where: { id_user: req.user.userId },
      include: [
        {
          model: Payment,
          where: { status: "Pending" }
        },
        {
          model: User
        },
        {
          model: Kereta,
          include: [
            {
              model: Type
            }
          ]
        }
      ]
    });

    res.send({
      data
    });
  } catch (error) {
    console.log(req.user.userId);

    res.status(401).send({
      message: "Error"
    });
  }
};

exports.transfer = async (req, res) => {
  try {
    const data = await order.findAll({
      where: { id_user: req.user.userId },
      include: [
        {
          model: Payment,
          where: { status: "Pending" }
        },
        {
          model: User
        },
        {
          model: Kereta,
          include: [
            {
              model: Type
            }
          ]
        }
      ]
    });

    res.send({
      data
    });
  } catch (error) {
    console.log(req.user.userId);

    res.status(401).send({
      message: "Error"
    });
  }
};

exports.updatePaymnet = async (req, res) => {
  try {
    const data = await Payment.update(req.body, {
      where: { id: req.params.id }
    });
    res.send({
      data
    });
  } catch (error) {
    res.status(401).send({
      message: error.message
    });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const data = order.destroy({
      where: { id_payment: req.params.id }
    });
    const data2 = Payment.destroy({
      where: { id: req.params.id }
    });
    res.send({
      msg: "data berhasil di delete"
    });
  } catch (error) {
    res.status(401).send({
      error: error.message
    });
  }
};
