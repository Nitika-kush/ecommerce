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
  const [priceRange,setPriceRange]=useState('');

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

const priceRanges=[
  {label:"All price",min:0,max:1500},
  {label:"$1-$200",min:1,max:200},
  {label:"$201-$400",min:201,max:400},
  {label:"$401-$600",min:401,max:600},
  {label:"$601-$800",min:601,max:800},
  {label:"$801-$1000",min:801,max:1000},
]

const handleSelectedRange=(e)=>{
  const selectedRange=priceRanges[e.target.value];
  setPriceRange(selectedRange);
}

const filterByPriceRange=(products,selectedRange)=>{
 console.log("selected range",selectedRange)
// console.log("price ranges",priceRanges)
 if(selectedRange==='')return products;
return products.filter((product)=>
product.price>=selectedRange.min && product.price<=selectedRange.max); 
}

const filterByCategory=(products,selectedCategory)=>{
  //console.log("selected Category",selectedCategory);
  if(selectedCategory==="") return products;
  return products.filter((product)=>product.category==selectedCategory)
}
const filterByPrice=filterByPriceRange(productData,priceRange);
console.log("filterByPrice",filterByPrice);

const filteredProducts=filterByCategory(filterByPrice,category);
//console.log("filteredProducts",filteredProducts);

const sortedProducts=sortProducts(filteredProducts ,sortOrder); 
//console.log("sorted products",sortedProducts);

const  uniqueCategories=Array.from(new Set(productData.map((product)=>product.category)));
console.log("array of category",uniqueCategories);

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
            <label htmlFor="sortByRange">filter by Price-Range</label>
    <select name="sortByRange" onChange= {handleSelectedRange} >
      {priceRanges.map((range,index)=>(
       <option key={index} value={index}>
        {range.label}
       </option>
      ))}
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
