import React, { useContext, useId, useRef, useState } from "react";
import { DataContext } from "../DataContext";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    id: uuidv4(),
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: "",
  });

  const [errors, setErrors] = useState({});
  const { data, newProductList } = useContext(DataContext);
  const [images, setImages] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = {};

    //validation
    Object.keys(inputValues).forEach((key) => {
      if (inputValues[key].trim().length === 0) {
        newErrors[key] = `${key} is required`;
        formIsValid = false;
      }
    });

    const isDuplicate = data.some(
      (product) => product.title === inputValues.title
    );
    if (isDuplicate) {
      newErrors.title = "Product is already exists";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      console.log("Form is valid. Submitting data.", inputValues);
      if (id) {
        editProduct(inputValues, id);
      } else {
        newProductList(inputValues);
        setInputValues({
          id: uuidv4(),
          title: "",
          price: "",
          description: "",
          category: "",
          image: "",
          rating: "",
        });
      }

      setErrors({});
      navigate("/product");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setInputValues((prevValue) => ({
          ...prevValue,
          [name]: reader.result,
        }));
        setImages(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setInputValues((prevValue) => ({
        ...prevValue,
        [name]: value,
      }));
    }

    setInputValues((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));

    if (value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  return (
    <>
      <div className="space"></div>
      <div className="main-container-addproduct">
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={inputValues.title}
              onChange={handleChange}
            />
            <p className="error">{errors.title && errors.title}</p>
          </div>
          <div className="input-field">
            <label htmlFor="price"> Price</label>
            <input
              type="number"
              name="price"
              value={inputValues.price}
              onChange={handleChange}
            />
            <p className="error">{errors.price && <p>Price is required</p>}</p>
          </div>
          <div className="input-field">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              value={inputValues.description}
              onChange={handleChange}
            />
            <p className="error">
              {errors.description && <p> Description is required</p>}
            </p>
          </div>
          <div className="input-field">
            <label htmlFor="category"> Category</label>
            <select
              name="category"
              value={inputValues.category}
              onChange={handleChange}
            >
              <option value="">Select any option</option>
              <option value="men's clothing">Men's clothing</option>
              <option value="jewelery">Jewelery</option>
              <option value="electronics">Electronics</option>
              <option value="women's clothing">Women's clothing</option>
            </select>
            <p className="error">
              {errors.category && <p> Category is required</p>}
            </p>
          </div>
          <div className="input-field">
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              name="rating"
              value={inputValues.rating}
              onChange={handleChange}
            />
            <p className="error">
              {errors.rating && <p> Rating is required</p>}
            </p>
          </div>
          <div className="input-field">
            <label htmlFor="image">Image</label>
            {images && (
              <img
                src={images}
                alt="product preview"
                style={{ maxWidth: "30%", marginBottom: "10px" }}
                onChange={handleChange}
              />
            )}
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
            />
            <p className="error">{errors.image && <p> Image is required</p>}</p>
          </div>
          <button className="submit-button" type="submit">
            {id ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProductDetail;
