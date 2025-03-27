import React, { useState, useEffect } from "react";

import { useParams, Link ,useNavigate} from "react-router-dom";

const AdminEditProduct = () => {
  const { id } = useParams(); // Get Product ID from URL
  const navigate = useNavigate();

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
    image: "",
  });
  const [subCategories, setSubCategories] = useState([]);
  const discountOptions = ["5%", "10%", "15%", "20%", "25%", "30%"];
  const quantityOptions = ["1", "5", "10", "20", "50", "100"];
  const activeOptions = ["Active", "Inactive"];
  const popularOptions = ["Yes", "No"];

  useEffect(() => {
    // Fetch existing product details
    fetch(`http://3.23.76.252:8080/api/productById/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.productName,
          quantity: data.productQuantity,
          discount: data.productDiscountPercent,
          price: data.productPrice,
          subCategory: data.subCategoryId,
          popular: data.popular ? "Yes" : "No",
          active: data.active ? "Active" : "Inactive",
          shortDescription: data.productShortDesc,
          longDescription: data.productLongDesc,
          image: data.imagePath, // Assuming it's a URL
        });
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  useEffect(() => {
    // Fetch subcategories
    fetch("http://3.23.76.252:8080/api/subCategory/false")
      .then((res) => res.json())
      .then((data) => setSubCategories(data))
      .catch((err) => console.error("Error fetching subcategories:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedProduct = {
      productId: id, // Ensure ID is included
      productName: formData.name,
      productQuantity: parseInt(formData.quantity), // Ensure it's a number
      productDiscountPercent: parseInt(formData.discount) || 0, // Ensure it's a number
      subCategoryId: parseInt(formData.subCategory), // Ensure it's a number
      productShortDesc: formData.shortDescription,
      productLongDesc: formData.longDescription,
      imagePath: typeof formData.image === "string" ? formData.image : null, // Keep URL, avoid sending file directly
      productPrice: parseFloat(formData.price), // Ensure it's a number
      active: formData.active === "Active",
      popular: formData.popular === "Yes",
    };
  
    fetch("http://3.23.76.252:8080/api/product", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Product updated successfully!");
        navigate("/AdminProductList");
      })
      .catch((err) => console.error("Error updating product:", err));
  };  
  return (
    <div className="container mt-4">
      <h2>Edit Product</h2>
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
                <option key={sub.subCategoryId} value={sub.subCategoryId}>{sub.subCategoryName}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Quantity</label>
            <select className="form-select" name="quantity" value={formData.quantity} onChange={handleChange} required>
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
              {discountOptions.map((discount, index) => (
                <option key={index} value={discount}>{discount}</option>
              ))}
            </select>
          </div>
        </div>

         {/* Active & Popular */}
         <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Active</label>
            <select
              className="form-select"
              name="active"
              value={formData.active}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              {activeOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Popular</label>
            <select
              className="form-select"
              name="popular"
              value={formData.popular}
              onChange={handleChange}
              required
            >
              <option value="">Select Popular</option>
              {popularOptions.map((pop, index) => (
                <option key={index} value={pop}>
                  {pop}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Short Description */}
        <div className="mb-3">
          <label className="form-label">Short Description</label>
          <input
            type="text"
            className="form-control"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            required
          />
        </div>

        {/* Long Description */}
        <div className="mb-3">
          <label className="form-label">Long Description</label>
          <textarea
            className="form-control"
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>


        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
          {formData.image && (
  <img
    src={
      typeof formData.image === "string"
        ? `http://3.23.76.252:8080/api/images?imagePath=${encodeURIComponent(formData.image)}`
        : URL.createObjectURL(formData.image)
    }
    alt="Preview"
    className="mt-2 rounded"
    style={{ width: "100px", height: "100px", objectFit: "cover" }}
  />
)}

        </div>

        <div className="d-flex justify-content-between mt-4">
          <Link to="/AdminProductList" className="btn btn-secondary px-4 py-2">Cancel</Link>
          <button type="submit" className="btn btn-primary px-4 py-2">Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProduct;