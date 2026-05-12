import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div style={{ flex: '2 1 600px' }}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/">Go Back</Link>
          </div>
        ) : (
          <ul style={{ padding: 0 }}>
            {cartItems.map((item) => (
              <li key={item._id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                <img src={item.image} alt={item.name} style={{ width: '80px', borderRadius: 'var(--radius-sm)' }} />
                <Link to={`/product/${item._id}`} style={{ flex: 1, fontWeight: '500' }}>{item.name}</Link>
                <div style={{ fontWeight: '700' }}>₹{item.price}</div>
                <select
                  value={item.qty}
                  onChange={(e) => addToCart({ ...item, qty: Number(e.target.value) })}
                  style={{ padding: '0.3rem' }}
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <button className="btn" style={{ backgroundColor: 'var(--color-border)', color: 'black' }} onClick={() => removeFromCart(item._id)}>
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ flex: '1 1 300px' }}>
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2>
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
          </h2>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
          </div>
          <hr style={{ borderColor: 'var(--color-border)' }} />
          <button
            type="button"
            className={`btn ${cartItems.length === 0 ? 'btn-disabled' : ''}`}
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
