import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminAddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    discount: "",
    price: "",
    subCategory: "",
    popular: "",
    active: "",
    shortDescription: "",
    longDescription: "",
    image: null,
  });

  const [subCategories, setSubCategories] = useState([]);
  const discountOptions = ["5", "10", "15", "20", "25", "30"];
  const quantityOptions = ["1", "5", "10", "20", "50", "100"];
  const activeOptions = ["true", "false"];
  const popularOptions = ["true", "false"];

  useEffect(() => {
    axios.get("http://3.23.76.252:8080/api/subCategory/false")
      .then(response => {
        setSubCategories(response.data.map(item => ({ id: item.subCategoryId, name: item.subCategoryName })));
      })
      .catch(error => console.error("Error fetching subcategories:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("productName", formData.name);
    formDataToSend.append("productQuantity", formData.quantity);
    formDataToSend.append("productDiscountPercent", formData.discount);
    formDataToSend.append("productPrice", formData.price);
    formDataToSend.append("subCategoryId", formData.subCategory);
    formDataToSend.append("Popular", formData.popular === "true");
    formDataToSend.append("Active", formData.active === "true");
    formDataToSend.append("productShortDesc", formData.shortDescription);
    formDataToSend.append("productLongDesc", formData.longDescription);
    // if (formData.image) {
    //   formDataToSend.append("image", formData.image);
    // }

    try {
      const response = await axios.post("http://3.23.76.252:8080/api/product", formDataToSend, {
        headers: { "Content-Type": "application/json" }
      });
      console.log("Product added successfully:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Sub Category</label>
            <select className="form-select" name="subCategory" value={formData.subCategory} onChange={handleChange} required>
              <option value="">Select Sub Category</option>
              {subCategories.map((sub) => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Quantity</label>
            <select className="form-select" name="quantity" value={formData.quantity} onChange={handleChange} required>
              <option value="">Select Quantity</option>
              {quantityOptions.map((qty, index) => (
                <option key={index} value={qty}>{qty}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Price ($)</label>
            <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Discount Percent</label>
            <select className="form-select" name="discount" value={formData.discount} onChange={handleChange} required>
              <option value="">Select Discount</option>
              {discountOptions.map((discount, index) => (
                <option key={index} value={discount}>{discount}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Active</label>
            <select className="form-select" name="active" value={formData.active} onChange={handleChange} required>
              <option value="">Select Status</option>
              {activeOptions.map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Popular</label>
            <select className="form-select" name="popular" value={formData.popular} onChange={handleChange} required>
              <option value="">Select Popular</option>
              {popularOptions.map((pop, index) => (
                <option key={index} value={pop}>{pop}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
  <label className="form-label">Short Description</label>
  <textarea 
    className="form-control" 
    name="shortDescription" 
    value={formData.shortDescription} 
    onChange={handleChange} 
    required
  />
</div>

<div className="mb-3">
  <label className="form-label">Long Description</label>
  <textarea 
    className="form-control" 
    name="longDescription" 
    value={formData.longDescription} 
    onChange={handleChange} 
    required
  />
</div>

        </div>

        {/* <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} required />
        </div> */}

        <div className="d-flex justify-content-between mt-4">
          <Link to="/AdminProductList" className="btn btn-secondary px-4 py-2">Cancel</Link>
          <button type="submit" className="btn btn-primary px-4 py-2">ADD Product</button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProduct;