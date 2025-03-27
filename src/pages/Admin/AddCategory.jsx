import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [isActive, setIsActive] = useState("true");
  const [isPopular, setIsPopular] = useState("true");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert("Please enter a category name.");
      return;
    }

    try {
      const response = await axios.post("http://3.23.76.252:8080/api/category", {
        name: categoryName,
        active: isActive === "true", // Convert string to boolean
        popular: isPopular === "true",
      });

      if (response.status === 200 || response.status === 201) {
        alert("Category added successfully!");
        navigate("/AdminCategoryList");
      } else {
        throw new Error("Failed to add category.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Add New Category</h2>
      <div className="card p-5 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-bold">Category Name</label>
            <input
              type="text"
              className="form-control p-3"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              required
            />
          </div>

          <div className="d-flex gap-3 mb-4">
            <div className="w-50">
              <label className="form-label fw-bold">Active</label>
              <select
                className="form-select p-2"
                value={isActive}
                onChange={(e) => setIsActive(e.target.value)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="w-50">
              <label className="form-label fw-bold">Popular</label>
              <select
                className="form-select p-2"
                value={isPopular}
                onChange={(e) => setIsPopular(e.target.value)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <Link to="/AdminCategoryList" className="btn btn-secondary px-4 py-2">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary px-4 py-2">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
