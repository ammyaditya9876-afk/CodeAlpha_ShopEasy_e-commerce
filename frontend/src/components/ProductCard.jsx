import { Link } from 'react-router-dom';
import Rating from './Rating';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="card product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="product-img" />
      </Link>
      <div className="product-body">
        <Link to={`/product/${product._id}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        <h2 className="product-price">₹{product.price}</h2>
      </div>
    </div>
  );
};

export default ProductCard;
