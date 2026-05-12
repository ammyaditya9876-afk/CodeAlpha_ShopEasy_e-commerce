import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Paginate from '../components/Paginate';

const HomePage = () => {
  const { keyword, pageNumber } = useParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products', {
          params: { keyword, pageNumber }
        });
        setProducts(data.products);
        setPage(data.page);
        setPages(data.pages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [keyword, pageNumber]);

  return (
    <>
      {!keyword ? (
        <div className="hero-banner">
          <h1>Welcome to ShopEasy</h1>
          <p>Discover a massive variety of products including electronics, clothing, toys, and groceries at unbeatable prices. Premium quality guaranteed.</p>
          <button className="btn" onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}>
            Shop Now
          </button>
        </div>
      ) : (
        <Link to="/" className="btn my-1" style={{ backgroundColor: 'var(--color-border)', color: 'white' }}>
          Go Back
        </Link>
      )}
      <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>{keyword ? 'Search Results' : 'Latest Products'}</h2>
      {products.length === 0 && <h3 className="text-danger">No products found</h3>}
      <div className="grid-cols-4 my-1">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
    </>
  );
};

export default HomePage;
