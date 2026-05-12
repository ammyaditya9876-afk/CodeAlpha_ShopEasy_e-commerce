import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccessPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const payOrder = async () => {
      try {
        await axios.put(`/api/orders/${id}/pay`, {});
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    payOrder();
  }, [id]);

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '10vh' }}>
      {loading ? (
        <h2>Confirming Payment...</h2>
      ) : (
        <div className="card" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)' }}>
          <FaCheckCircle style={{ fontSize: '5rem', color: 'var(--color-success)', marginBottom: '1rem' }} />
          <h1 style={{ marginBottom: '1rem' }}>Payment Successful!</h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            Thank you for your purchase. Your order (ID: {id}) has been confirmed and is now being processed.
          </p>
          <Link to="/profile" className="btn">
            View Order History
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderSuccessPage;
