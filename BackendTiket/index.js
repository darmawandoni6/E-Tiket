//instantiate express module
const express = require("express");
const bodyParser = require("body-parser");
require("express-group-routes");
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello Express!");
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

const { authenticated } = require("./controllers/auth/midleware");
const login = require("./controllers/auth/auth");
const user = require("./controllers/user");
const type = require("./controllers/typekereta");
const kereta = require("./controllers/kereta");
const Sn = require("./controllers/sn");
const order = require("./controllers/order");
const payment = require("./controllers/payment");

app.use(express.static("images"));
app.group("/api/v1", router => {
  //login
  router.post("/auth", login.auth);
  //register
  router.post("/register", user.registrasi);
  //user
  router.get("/cekuser", authenticated, user.cekUser);

  //type
  router.post("/addTypekereta", authenticated, type.addTypekereta);
  router.get("/type", type.type);

  //tiket
  router.post("/addTiket", authenticated, kereta.addTiket);
  router.get("/tikets", kereta.tickets);
  router.get("/ticketAll", kereta.ticketAll);
  // router.get("/tickettoday", kereta.ticketToday);
  router.get("/buytiket/:id", authenticated, kereta.buytiket);

  //sn
  router.get("/sn/:kode", authenticated, Sn.sn);
  router.patch("/sn/:kode", authenticated, Sn.snUpdate);

  //order
  router.post("/order", authenticated, order.order);
  router.get("/list", authenticated, order.listOrder);
  router.get("/list/:id", authenticated, order.listOrderDetail);
  router.get("/list-order", authenticated, order.orderListUser);

  //payment
  router.get("/payment", authenticated, payment.payment);
  router.get("/payment2", authenticated, payment.transfer);
  router.patch("/payment/:id", authenticated, payment.updatePaymnet);
  router.delete("/payment/:id", authenticated, payment.deletePayment);

  //search
  router.get("/search", kereta.search);

  // upload
  router.post("/upload/:id", payment.uploadData);

  //tes count
  router.get("/count/:username", user.count);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
