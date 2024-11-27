import React, { useContext } from "react";
import { DataContext } from "../DataContext";
import { useDispatch,useSelector } from "react-redux";
import { MdRemoveShoppingCart } from "react-icons/md";
import { removeItemFromWishlist } from "../../redux/slice/usersSlice";

const Wishlist = () => {
  // const { wishlist, removeFromWishlist } = useContext(DataContext);
  const wishlistData =useSelector((state)=>state.users.wishlist)
  // const {usersData}=useContext(DataContext);
  const userId =useSelector((state)=>state.users.id)
  const user = useSelector((state)=>state.users)
  const dispatch = useDispatch();
 
  if(!wishlistData){
    return <div>
      please Login to see the wishlist
    </div>
  }

  const handleRemove=async(id)=>{
    dispatch(removeItemFromWishlist(id));
    try{
      let updatedWishlist= wishlistData.filter((item) => item.id !== id);
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
      if(!updateResponse.ok){
        throw new Error("failed to update wishlist");
      }
      console.log("wishlist updated successfully");
    }catch{
      console.error("Error in this");
    }
  }

  return (
    <>
      <div className="space"></div>
      <div>
        <h3 style={{ textAlign: "center" }}>Wishlist</h3>
        {/* <div className="flex-start"> */}
        <ul >
        {wishlistData && wishlistData.length > 0 ?  (
          <div className="card1">
            {wishlistData && wishlistData.map((product) => (
              <div key={product.id} className="product-description1 cart-item">
                <h3>{product.title.slice(0,20)+"..."}</h3>
                <div className="img-container">
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.title}
                  />
                </div>
                <p>{product.description.slice(0, 80) + "..."}</p>
                <h3 style={{marginTop:"5px"}}>Rating :{product.rating.rate}</h3>
                <div className="btn-group">
                  <h3 className="product-price">${product.price}</h3>

                  <div className="but-group">
                    <button
                      title="remove from Whislist"
                      className="product-button"
                      onClick={() => handleRemove(product.id)}
                    >
                      <MdRemoveShoppingCart />
                      <span>remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ):(
          <p style={{ textAlign: "center" }}>Your Wishlist is empty.</p>
        ) }
         </ul>
        {/* </div> */}
      </div>
    </>
  );
};

export default Wishlist;
