import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminSubCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  // Fetch categories from API for dropdown
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://3.23.76.252:8080/api/category/false/false");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch subcategories from API for table
  const fetchSubCategories = async () => {
    try {
      const response = await axios.get("http://3.23.76.252:8080/api/subCategory/false");
      setSubCategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Filter subcategories based on status & selected category
  const filteredSubCategories = subCategories.filter(subCategory => {
    const statusMatch =
      filter === "active" ? subCategory.active : filter === "inactive" ? !subCategory.active : true;
    const categoryMatch =
      selectedCategory === "all" || subCategory.categoryId === parseInt(selectedCategory);
    
    return statusMatch && categoryMatch;
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Admin Sub Category List</h2>

      {/* Filters & Add Category */}
      <div className="d-flex justify-content-end align-items-center mb-3">
        <div className="d-flex">
          <select 
            className="form-select w-auto d-inline-block me-2" 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Sort by: All</option>
            <option value="active">Sort by: Active</option>
            <option value="inactive">Sort by: Inactive</option>
          </select>

          {/* Category Dropdown - Fetched from API */}
          <select 
            className="form-select w-auto d-inline-block me-2" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <Link to="/AdminAddSubCategory" className="btn btn-primary ms-2">
          Add New Sub Category
        </Link>
      </div>

      {/* Sub Category Table */}
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Sub Category Name</th>
            <th>Category Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubCategories.length > 0 ? (
            filteredSubCategories.map((subCategory, index) => (
              <tr key={subCategory.subCategoryId}>
                <td>{index + 1}</td>
                <td>{subCategory.subCategoryName}</td>
                <td>{subCategory.categoryName}</td> {/* New Column Added */}
                <td>
                  <button 
                    className={`btn btn-sm ${subCategory.active ? "btn-success" : "btn-secondary"}`}
                  >
                    {subCategory.active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td>
                  <Link to={`/AdminEditSubCategory/${subCategory.subCategoryId}`} className="btn btn-warning btn-sm me-2">
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No subcategories found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSubCategoryList;