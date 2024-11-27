import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { TiShoppingCart } from 'react-icons/ti';
import productSlice, { fetchProducts } from "../redux/slice/productSlice";
import { addItemToCart,toggleItemToWishlist} from "../redux/slice/usersSlice";

function Products() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.products);
  const wishlistData=useSelector((state)=>state.users.wishlist);
  const userId = useSelector((state) => state.users.id);
  const user = useSelector((state) => state.users);
  const [sortOrder,setSortOrder]=useState("");
  const [category,setCategory]=useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

 const sortProducts=(products,order)=>{
  if(order==="") return products;
  return products.slice().sort((a,b)=>{
    if(order==="asc"){
      return a.price-b.price;
    }
    else if(order==="desc"){
      return b.price-a.price;
    }
  })
}


const filterByCategory=(products,selectedCategory)=>{
  console.log(selectedCategory);
  if(selectedCategory==="") return products;
  return products.filter((product)=>product.category==selectedCategory)
}

const filteredProducts=filterByCategory(productData,category);
console.log(filteredProducts);
const sortedProducts=sortProducts(filteredProducts ,sortOrder); 
console.log(sortedProducts);

const  uniqueCategories=Array.from(new Set(productData.map((product)=>product.category)));
console.log(uniqueCategories);

  const isWishlistItemExist = (productId) => {
    return wishlistData.some((item) => item.id === productId);
  };  

const handleWishlistToggle =async(product)=>{
dispatch(toggleItemToWishlist(product));
try{
  let updatedWishlist;
  if(isWishlistItemExist(product.id)){
    updatedWishlist= user.wishlist.filter((item)=> item.id!==product.id);
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
  console.log("wishlist updated successfully")
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
    <>
    <div style={{textAlign:"center", marginTop:"35px",display:"flex",alignContent:"center",justifyContent:"center" ,gap:"20px"}}>
    <label htmlFor="sortOrder">Sort by Price</label>
    <select name="sortOrder" value={sortOrder} onChange= {(e)=>setSortOrder(e.target.value)} >
      <option value="">select any option</option>
    <option value="asc">Ascending</option>
    <option value="desc">Descending</option>
    </select>
    <label htmlFor="category"> Category</label>
            <select
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((cate,index)=>(
                <option key={index} value={cate}>
                  {cate}
                </option>
              ))}
              {/* <option value="men's clothing">Men's clothing</option>
              <option value="jewelery">Jewelery</option>
              <option value="electronics">Electronics</option>
              <option value="women's clothing">Women's clothing</option> */}
            </select>
            <label htmlFor="sortByRange">Sort by Price-Range</label>
    <select name="sortByRange" value={sortOrder} onChange= {(e)=>setSortOrder(e.target.value)} >
      <option value="">select any option</option>
    <option value="$0-&200">$0-&200</option>
    <option value="$201-$400">$201-$400</option>
    <option value="$401-$600">$401-$600</option>
    <option value="$601-$800">$601-$800</option>
    <option value="$801-$1000">$801-$1000</option>
    </select>
    </div>
   
     <div className='card'>
      {sortedProducts && sortedProducts.map((product, index) => (
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
    </>
   
  );
}
export default Products;
