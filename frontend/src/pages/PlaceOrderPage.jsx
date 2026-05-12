import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCartItems } = useCart();
  const shippingAddress = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    try {
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod: 'PayPal',
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      if (data && data._id) {
        clearCartItems();
        // Create stripe checkout session
        const sessionRes = await axios.post(`/api/stripe/create-checkout-session/${data._id}`);
        if (sessionRes.data && sessionRes.data.url) {
          window.location.href = sessionRes.data.url;
        } else {
          alert('Failed to generate checkout session');
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div style={{ flex: '2 1 600px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h2>Shipping</h2>
          <p>
            <strong>Address: </strong>
            {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode},{' '}
            {shippingAddress.country}
          </p>
        </div>
        <hr style={{ borderColor: 'var(--color-border)' }} />

        <div>
          <h2>Payment Method</h2>
          <strong>Method: </strong> PayPal
        </div>
        <hr style={{ borderColor: 'var(--color-border)' }} />

        <div>
          <h2>Order Items</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul style={{ padding: 0 }}>
              {cartItems.map((item, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid var(--color-border)' }}>
                  <img src={item.image} alt={item.name} style={{ width: '50px', borderRadius: 'var(--radius-sm)' }} />
                  <Link to={`/product/${item._id}`} style={{ flex: 1 }}>{item.name}</Link>
                  <div style={{ fontWeight: '600' }}>
                    {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div style={{ flex: '1 1 300px' }}>
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2>Order Summary</h2>
          <hr style={{ borderColor: 'var(--color-border)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Items</span>
            <span>₹{itemsPrice.toFixed(2)}</span>
          </div>
          <hr style={{ borderColor: 'var(--color-border)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Shipping</span>
            <span>₹{shippingPrice.toFixed(2)}</span>
          </div>
          <hr style={{ borderColor: 'var(--color-border)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Tax</span>
            <span>₹{taxPrice.toFixed(2)}</span>
          </div>
          <hr style={{ borderColor: 'var(--color-border)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
            <span>Total</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <hr style={{ borderColor: 'var(--color-border)' }} />
          <button
            type="button"
            className={`btn ${cartItems.length === 0 ? 'btn-disabled' : ''}`}
            onClick={placeOrderHandler}
            disabled={cartItems.length === 0}
          >
            Pay with Stripe
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
