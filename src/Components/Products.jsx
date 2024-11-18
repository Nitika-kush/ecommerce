import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { TiShoppingCart } from 'react-icons/ti';
import { addToCart } from '../redux/slice/cartSlice'; 
import { fetchProducts } from '../redux/slice/productSlice'; 
import { DataContext } from './DataContext'; 

function Products() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { products, status, error } = useSelector((state) => state.products);
  
  const { user, toggleWishlist, wishlist } = useContext(DataContext); 

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleAddToCart = (product) => {
    if (user) {
      dispatch(addToCart(product)); 
      const updatedCart = [...cart, product]; 
      localStorage.setItem('cart', JSON.stringify({ userId: user.id, items: updatedCart })); 
    } else {
      console.log('Please Sign up to add product to cart');
    }
  };
  

  return (
    <div className='card'>
      {products && products.map((product, index) => (
        <div key={index} className='product-description'>
          <Link to={`/product/${product.id}`}>
            <h2 className='product-name'>{product.title.slice(0, 15) + '...'}</h2>
            <div style={{ textAlign: 'center' }}>
              <img className='product-image' src={product.image} alt={product.title} />
            </div>
            <div className='btn-group'>
              <h3 className='product-price'>${product.price}</h3>
              <h3>Rating: {product.rating.rate}</h3>
            </div>
          </Link>

          <div className='btn-group'>
            <button className='wish-list' onClick={() => toggleWishlist(product)}>
              {wishlist.some((item) => item.id === product.id) ? (
                <FaHeart fill='red' style={{ fontSize: '18px' }} />
              ) : (
                <FaRegHeart style={{ fontSize: '18px' }} />
              )}
              WishList
            </button>

            <button className='add-to-cart' onClick={() => handleAddToCart(product)}>
              <TiShoppingCart />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
