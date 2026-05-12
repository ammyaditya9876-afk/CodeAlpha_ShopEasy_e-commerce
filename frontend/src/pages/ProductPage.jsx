import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Rating from '../components/Rating';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    addToCart({ ...product, qty });
    navigate('/cart');
  };

  if (!product._id) return <h2>Loading...</h2>;

  return (
    <>
      <Link className="btn my-1" style={{ backgroundColor: 'var(--color-border)', color: 'black' }} to="/">
        Go Back
      </Link>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: 'var(--radius-md)' }} />
        </div>
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2>{product.name}</h2>
          <hr style={{ borderColor: 'var(--color-border)' }} />
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          <hr style={{ borderColor: 'var(--color-border)' }} />
          <h3>Price: ₹{product.price}</h3>
          <hr style={{ borderColor: 'var(--color-border)' }} />
          <p>{product.description}</p>
        </div>
        <div style={{ flex: '1 1 250px' }}>
          <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Price:</span>
              <strong>₹{product.price}</strong>
            </div>
            <hr style={{ borderColor: 'var(--color-border)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Status:</span>
              <span>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</span>
            </div>
            {product.countInStock > 0 && (
              <>
                <hr style={{ borderColor: 'var(--color-border)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Qty:</span>
                  <select value={qty} onChange={(e) => setQty(Number(e.target.value))} style={{ padding: '0.3rem' }}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            <hr style={{ borderColor: 'var(--color-border)' }} />
            <button
              className={`btn ${product.countInStock === 0 ? 'btn-disabled' : ''}`}
              disabled={product.countInStock === 0}
              onClick={addToCartHandler}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
