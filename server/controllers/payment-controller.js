const { cartsService, ordersService } = require("../services");
const { fetchCartById } = cartsService;
const { calculateOrderAmount } = ordersService;

// const Stripe = require("stripe");
// const stripe = new Stripe(process.env.STRIPE_KEY);

const stripe = require("stripe")(process.env.STRIPE_KEY);

const createPaymentIntent = async (req, res, next) => {
  const userId = req.user.id; //Extract usFer id from passport user object
  const amount = await calculateOrderAmount(userId);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
  });
  res.status(200).json({
    clientSecret: paymentIntent.client_secret,
    amount: amount,
  });
};

module.exports = {
  createPaymentIntent,
};
