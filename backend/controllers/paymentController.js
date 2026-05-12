import Stripe from 'stripe';
import Order from '../models/orderModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');

// @desc    Create a Stripe Checkout Session
// @route   POST /api/stripe/create-checkout-session/:id
// @access  Private
const createCheckoutSession = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    const lineItems = order.orderItems.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
          images: [`http://localhost:3000${item.image}`],
        },
        unit_amount: Math.round(item.price * 100), // Stripe requires amounts in smallest currency unit (paise)
      },
      quantity: item.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:3000/order/${order._id}/success`,
      cancel_url: `http://localhost:3000/cart`,
      customer_email: order.user.email,
      client_reference_id: order._id.toString(),
    });

    res.json({ url: session.url });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
};

export { createCheckoutSession };
