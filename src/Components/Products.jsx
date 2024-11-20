import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { TiShoppingCart } from 'react-icons/ti';
import { fetchProducts } from "../redux/slice/productSlice";
import { addItemToCart,toggleItemToWishlist} from "../redux/slice/usersSlice";

function Products() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.products);
  const wishlistData=useSelector((state)=>state.users.wishlist);
  const userId = useSelector((state) => state.users.id);
  const user = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const isWishlistItemExist = (productId) => {
    return wishlistData.some((item) => item.id === productId);
  };  
const handletoggleItemToWishlist =async(product)=>{
dispatch(toggleItemToWishlist(product));
try{
  let updatedWishlist;
  if(isWishlistItemExist(product.id)){
    updatedWishlist= user.wishlist.filter((item)=>{
      item.id!==product.id;
    })
  }else{
    updatedWishlist = [...user.wishlist,product];
  }
 
  const updatedResponse = await fetch(
    `http://localhost:3000/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        ...user,
        wishlist:updatedWishlist,
      })
    }
  );
  if(!updatedResponse.ok){
    throw new Error("Failed to update Wishlist");
  }
}catch (error) {
  console.error("Error adding item to wishlist:", error);
}
}
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
            <button className='wish-list' onClick={() => handletoggleItemToWishlist(product)}>
         {isWishlistItemExist(product.id)?( <FaHeart fill='red' style={{ fontSize: '18px' }} />):
         (<FaRegHeart style={{ fontSize: '18px' }}/> )}  
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
