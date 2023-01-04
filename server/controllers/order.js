const Order = require("../models/order");
var paypal = require("paypal-rest-sdk");
const Settings = require("../models/settings");

paypal.configure({
  mode: "live", //sandbox or live
  //client_id: "AUwrn1XFi2fz7fjJSBJ5YleCdQxBLyJG0_wHOJ_kd_TsNqpXI0G7EdwiGDKWFfw_EGht3eN-n1bq3J87",
  //client_secret: "EC_-Un1P2uBGyqcolVVp1dm_ECsPaOaac24hqAD1saDfnf5JOlacWg5Fg3KIUsaS3fIIckRFUnO34Hwu",
  // live credentials
  client_id:
    "AeBxNgaJdE0EIHFnlTOZMGXRE1dQ_KdKZYkdHnIMt42qQHQantcLSbmy_colOLubEayAKkvHPRX_Ty5C",
  client_secret:
    "EH42eG9iP3ugNckvAhvGBAFs7UybyJdhwoIro7X_z7P6L7w0VGt4yEa1mNe8y9LtCG28NpKPonhAElV3",
});

exports.createorder = async (req, res) => {
  const settings = await Settings.find();
  const { activecoupin, coupincode, activestore } = settings[0];
  console.log(activecoupin, coupincode, activestore);
  if (!activestore) {
    return res.status(404).json({
      errors: "Sorry,Store is currently closed",
    });
  }
  console.log(req.body);
  const { cart } = req.body;
  let modprice = 0;
  let calsubtotal = 0;
  let paypalitems = [];
  cart.map((item) => {
    let curprice = 0;
    if (activecoupin) {
      const userPromoCode = req.body.code.toLowerCase();
      if (userPromoCode == "testing") {
        curprice = item.price - (item.price / 100) * 99.9;
      } else if (userPromoCode == "hanukka82") {
        curprice = item.price - (item.price / 100) * 50;
      } else {
        curprice = Number(item.price);
      }
    } else {
      console.log(item.price);
      curprice = Number(item.price);
    }
    paypalitems.push({
      name: "WESTERN SHIRT",
      sku: "item",
      //"subtotal" : `${calsubtotal}`,
      price: curprice,
      currency: "ILS",
      quantity: item.Quantity,
    });
    calsubtotal = calsubtotal + curprice * item.Quantity;
    modprice = modprice + item.price;
  });

  console.log(calsubtotal);
  //if (activecoupin) {
  //  if ((req.body.code).toLowerCase() == (coupincode.toString()).toLowerCase()) {
  //    modprice = calsubtotal - (calsubtotal / 100) * 30;
  //  } else {
  //    modprice = calsubtotal;
  //  }
  //} else {
  //  modprice = calsubtotal;
  // }
  console.log(paypalitems);
  try {
    var create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.DOMAIN_URL}/success`,
        cancel_url: `${process.env.DOMAIN_URL}`,
      },
      transactions: [
        {
          item_list: {
            items: paypalitems,
            // [{
            //       "name": "WEST COLLAR SHIRT",
            //       "sku": "item",
            //       //"subtotal" : `${calsubtotal}`,
            //       "price": `${modprice}`,
            //       "currency": "ILS",
            //       "quantity": 1
            // }]
          },
          amount: {
            currency: "ILS",
            total: `${calsubtotal}`,
          },
          description: "This is the payment description.",
        },
      ],
    };
    await paypal.payment.create(create_payment_json, async (error, payment) => {
      if (error) {
        console.log(error);
        console.log(error.response);
        res.status(404).json({
          errors: "Error in payment processing",
        });
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            //console.log('approval')
            //res.redirect(payment.links[i].href)
            console.log("theurl", payment.links[i].href);
            const allorder = await Order.find();
            const order = await Order.create({
              orderno: allorder.length + 1,
              address: req.body.address,
              items: req.body.cart,
              price: Number(modprice),
              discount: Number(modprice - calsubtotal),
            });
            res.status(200).json({
              status: "success",
              url: payment.links[i].href,
              order,
            });
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error in payment processing",
    });
  }
};

exports.checkcode = async (req, res) => {
  //console.log(req.body)
  const settings = await Settings.find();
  const { activecoupin, coupincode, activestore } = settings[0];
  console.log(activecoupin, coupincode, activestore);
  try {
    if (req.body.code == coupincode.toString()) {
      res.status(200).json({
        status: "success",
        compared: true,
      });
    } else {
      res.status(200).json({
        status: "success",
        compared: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error in payment processing",
    });
  }
};

exports.execute = async (req, res) => {
  console.log(req.body);
  const payerId = req.body.PayerID;
  const paymentId = req.body.paymentId;

  const execute_payment = {
    payer_id: payerId,
    //"transactions" : [{
    //     "amount" : {
    //        "currency" : "ILS",
    //        "total" : "900.00"
    //     }
    // }]
  };
  try {
    paypal.payment.execute(
      paymentId,
      execute_payment,
      function (error, payment) {
        if (error) {
          console.log(error);
          console.log(error.response);
          console.log(error);
          res.status(404).json({
            errors: "Error executing payment",
          });
        } else {
          res.status(200).json({
            status: "success",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error Creating role",
    });
  }
};

exports.getdashboardinfo = async (req, res) => {
  try {
    const ordersdone = await Order.find({ status: "done" });
    const activeorders = await Order.find({ status: "undone" }).sort({
      $natural: -1,
    });
    const total = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$price" },
        },
      },
    ]);
    console.log({ activeorders, ordersdone: ordersdone.length, total });
    res.status(200).json({
      status: "success",
      activeorders,
      ordersdone: ordersdone.length,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error getting dashbaord info",
    });
  }
};

exports.getallorders = async (req, res) => {
  try {
    const ordersdone = await Order.find({ status: "done" }).sort({
      $natural: -1,
    });
    res.status(200).json({
      status: "success",
      ordersdone,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error getting all orders",
    });
  }
};

exports.orderstatus = async (req, res) => {
  try {
    const ordersdone = await Order.findByIdAndUpdate(req.params.id, {
      status: "done",
    });
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error getting all orders",
    });
  }
};
