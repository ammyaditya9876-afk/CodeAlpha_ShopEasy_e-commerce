import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchProducts();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        alert(error.response?.data?.message || error.message);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        const { data } = await axios.post('/api/products', {});
        navigate(`/admin/product/${data._id}/edit`);
      } catch (error) {
        alert(error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Products</h1>
        <button className="btn" onClick={createProductHandler}>
          + Create Product
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '1rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
            <th style={{ padding: '0.5rem' }}>ID</th>
            <th style={{ padding: '0.5rem' }}>NAME</th>
            <th style={{ padding: '0.5rem' }}>PRICE</th>
            <th style={{ padding: '0.5rem' }}>CATEGORY</th>
            <th style={{ padding: '0.5rem' }}>BRAND</th>
            <th style={{ padding: '0.5rem' }}></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
              <td style={{ padding: '0.5rem' }}>{product._id}</td>
              <td style={{ padding: '0.5rem' }}>{product.name}</td>
              <td style={{ padding: '0.5rem' }}>₹{product.price}</td>
              <td style={{ padding: '0.5rem' }}>{product.category}</td>
              <td style={{ padding: '0.5rem' }}>{product.brand}</td>
              <td style={{ padding: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <Link to={`/admin/product/${product._id}/edit`} className="btn" style={{ padding: '0.3rem 0.6rem', fontSize: '0.9rem' }}>
                  <FaEdit />
                </Link>
                <button className="btn" style={{ backgroundColor: 'var(--color-danger)', padding: '0.3rem 0.6rem', fontSize: '0.9rem' }} onClick={() => deleteHandler(product._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListPage;
