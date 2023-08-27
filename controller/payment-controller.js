import dotenv from "dotenv";
dotenv.config();

import Razorpay from "razorpay";
import crypto from "crypto";

const hmac_sha256 = (data, secret) => {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(data);
  return hmac.digest("hex");
};

// import { instance } from "./instance.js";

export const checkout = async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "https://flipkart3.vercel.app");
  console.log("Razorpay API Key:", process.env.RAZORPAY_API_KEY);
  console.log("Razorpay API Secret:", process.env.RAZORPAY_API_SECRET);

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

  console.log("before options creation");
  var options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: "INR",
  };
  console.log("before order creation");

  try {
    const order = await instance.orders.create(options);
    console.log("order created");
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("order failed", error);
    res.status(400).json({
      success: false,
      order: "order not created",
    });
  }
};

export const paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const order_id = razorpay_order_id;

  const generated_signature = hmac_sha256(
    order_id + "|" + razorpay_payment_id,
    process.env.RAZORPAY_API_SECRET
  );

  if (generated_signature == razorpay_signature) {
    res.redirect(`/paymentsuccess?reference=${razorpay_payment_id}`);
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
