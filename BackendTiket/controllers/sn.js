const Sn = require("../models").serial_number;

exports.sn = async (req, res) => {
  try {
    const data = await Sn.findOne({ where: { name: req.params.kode } });
    res.send({
      data
    });
  } catch (error) {
    res.status(401).send({
      message: "error"
    });
  }
};

exports.snUpdate = async (req, res) => {
  try {
    const data = await Sn.update(req.body, {
      where: { name: req.params.kode }
    });
    res.send({
      data
    });
  } catch (error) {
    res.status(401).send({
      message: "error"
    });
  }
};
