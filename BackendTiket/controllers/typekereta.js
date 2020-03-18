const Typekereta = require("../models").typekereta;

exports.addTypekereta = async (req, res) => {
  try {
    const data = await Typekereta.create(req.body);
    res.send({
      data
    });
  } catch (error) {
    res.status(401).status({
      msg: "error"
    });
  }
};

exports.type = async (req, res) => {
  try {
    const data = await Typekereta.findAll();
    res.send({
      data
    });
  } catch (error) {
    console.log(error.message);
  }
};
