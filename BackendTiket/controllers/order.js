const Order = require("../models").order;
const Payment = require("../models").payment;
const User = require("../models").user;
const Kereta = require("../models").kereta;
const Typekereta = require("../models").typekereta;

exports.order = async (req, res) => {
  try {
    const { qty, totalPrice, no_invoice, id_tiket } = req.body;
    const payment = {
      qty,
      totalPrice,
      status: "Pending",
      attachment: ""
    };
    const data = await Payment.create(payment);

    const order = {
      no_invoice,
      id_tiket,
      id_user: req.user.userId,
      id_payment: data.id
    };
    const data2 = await Order.create(order);
    res.send({
      msg: "Success"
    });
  } catch (error) {
    console.log(error.message);

    res.status(401).send({
      msg: error.message
    });
  }
};

exports.listOrder = async (req, res) => {
  try {
    const data = await Order.findAll({
      include: [
        {
          model: User
        },
        {
          model: Payment
        },
        {
          model: Kereta,
          include: [
            {
              model: Typekereta
            }
          ]
        }
      ],
      order: [["id", "desc"]]
    });
    res.send({
      data
    });
  } catch (error) {
    res.status(401).send({
      msg: "Error"
    });
  }
};

exports.listOrderDetail = async (req, res) => {
  try {
    const data = await Order.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: User
        },
        {
          model: Payment
        },
        {
          model: Kereta,
          include: [
            {
              model: Typekereta
            }
          ]
        }
      ]
    });
    res.send({
      data
    });
  } catch (error) {
    res.status(401).send({
      msg: "Error"
    });
  }
};

exports.orderListUser = async (req, res) => {
  try {
    const data = await Order.findAll({
      where: { id_user: req.user.userId },

      include: [
        {
          model: Payment
        },
        {
          model: User
        },
        {
          model: Kereta,
          include: [
            {
              model: Typekereta
            }
          ]
        }
      ]
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
