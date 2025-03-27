import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminProductList = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  
  const [filter, setFilter] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");

  useEffect(() => {
    fetchSubCategories();
    fetchProducts();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get("http://3.23.76.252:8080/api/subCategory/false");
      setSubCategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://3.23.76.252:8080/api/product/-1/-1/false/false");
      
      // Ensure response data is an array
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error("Unexpected API response:", response.data);
        setProducts([]); // Fallback to empty array
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // Handle errors by setting an empty array
    }
  };
  

  const filteredProducts = products.filter(product => {
    const statusMatch = filter === "active" ? product.active : filter === "inactive" ? !product.active : true;
    const subCategoryMatch = selectedSubCategory === "all" || product.subCategoryId === parseInt(selectedSubCategory);
    return statusMatch && subCategoryMatch;
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Product List</h2>

      <div className="d-flex justify-content-end align-items-center mb-3">
        <div className="d-flex">
          <select className="form-select w-auto d-inline-block me-2" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Sort by: All</option>
            <option value="active">Sort by: Active</option>
            <option value="inactive">Sort by: Inactive</option>
          </select>

          <select className="form-select w-auto d-inline-block me-2" value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.target.value)}>
            <option value="all">Select Sub Category</option>
            {subCategories.map(subCategory => (
              <option key={subCategory.subCategoryId} value={subCategory.subCategoryId}>
                {subCategory.subCategoryName}
              </option>
            ))}
          </select>
        </div>
        
        <Link to="/AdminAddProduct" className="btn btn-primary ms-2">
          Add New Product
        </Link>
      </div>
      
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Sub Category</th>
            <th>Category</th>
            <th>Rate</th>
            <th>Status</th>
            <th>Popular</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <tr key={product.productId}>
                <td>{index + 1}</td>
                <td>
                  <img 
                    src={`http://3.23.76.252:8080/api/images?imagePath=${encodeURIComponent(product.imagePath)}`} 
                    alt={product.productName} 
                    className="img-fluid rounded-3" 
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                </td>
                <td>{product.productName}</td>
                <td>{product.subCategoryName}</td>
                <td>{product.categoryName}</td>
                <td>${product.productPrice}</td>
                <td>
                  <span className={`badge ${product.active ? "bg-success" : "bg-secondary"}`}>
                    {product.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <span className={`badge ${product.popular ? "bg-warning" : "bg-secondary"}`}>
                    {product.popular ? "Yes" : "No"}
                  </span>
                </td>
                <td>
                  <Link to={`/AdminEditProduct/${product.productId}`} className="btn btn-warning btn-sm me-2">
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductList;
