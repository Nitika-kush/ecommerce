import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { TiShoppingCart } from 'react-icons/ti';
import { fetchProducts } from "../redux/slice/productSlice";
import { addItemToCart} from "../redux/slice/usersSlice";

function Products() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.products);
  const wishlistData = useSelector((state) => state.users.wishlist);
  const userId = useSelector((state) => state.users.id);
  const user = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const isWishlistItemExist = (productId) => {
    return wishlistData.some((item) => item.id === productId);
  };

  const handleWishlistToggle = async (product) => {
    dispatch(toggleItemToWishlist(product));
    try {
      let updatedWishlist;
      if (isWishlistItemExist(product.id)) {
        updatedWishlist = user.wishlist.filter(
          (item) => item.id !== product.id
        );
      } else {
        updatedWishlist = [...user.wishlist, product];
      }
      const updateResponse = await fetch(
        `http://localhost:3000/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...user,
            wishlist: updatedWishlist,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update wishlist");
      }
      console.log("Wishlist updated successfully!");
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const handleAddToCart = async (product) => {
    dispatch(addItemToCart(product));
    try {
      const updatedCart = [...user.cart, product];
      const updateResponse = await fetch(
        `http://localhost:3000/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...user,
            cart: updatedCart,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className='card'>
      {productData && productData.map((product, index) => (
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
            <button className='wish-list' onClick={() => handleWishlistToggle(product)}>
              {isWishlistItemExist(product.id) ? (
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

// Ensure this is the default export
export default Products;
