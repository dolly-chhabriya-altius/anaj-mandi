import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminAddSubCategory = () => {
  const navigate = useNavigate();
  const [subcategory, setSubcategory] = useState({ subCategoryName: "", categoryId: "", categoryName: "", active: false });
  const [categoryTypes, setCategoryTypes] = useState([]);

  // Fetch category types from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://3.23.76.252:8080/api/category/false/false");
        setCategoryTypes(response.data); // Assuming response.data is an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubcategory({ ...subcategory, [name]: value });
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const selectedCategory = categoryTypes.find((cat) => cat.id.toString() === e.target.value);
    if (selectedCategory) {
      setSubcategory({
        ...subcategory,
        categoryId: selectedCategory.id,
        categoryName: selectedCategory.name,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://3.23.76.252:8080/api/subCategory", subcategory);
      alert("Subcategory added successfully!");
      navigate("/AdminSubCategoryList");
    } catch (error) {
      console.error("Error adding subcategory:", error);
      alert("Failed to add subcategory.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Sub Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Sub Category Name</label>
          <input 
            type="text" 
            className="form-control" 
            name="subCategoryName" 
            value={subcategory.subCategoryName} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="mb-3 d-flex gap-3">
          <div className="w-50">
            <label className="form-label">Category Type</label>
            <select 
              className="form-select" 
              name="categoryId" 
              value={subcategory.categoryId} 
              onChange={handleCategoryChange} 
              required
            >
              <option value="">Select Category</option>
              {categoryTypes.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-50">
            <label className="form-label">Status</label>
            <select 
              className="form-select" 
              name="active" 
              value={subcategory.active.toString()} 
              onChange={(e) => setSubcategory({ ...subcategory, active: e.target.value === "true" })}
              required
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/AdminSubCategoryList")}>Cancel</button>
          <button type="submit" className="btn btn-primary">Add Sub Category</button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddSubCategory;
