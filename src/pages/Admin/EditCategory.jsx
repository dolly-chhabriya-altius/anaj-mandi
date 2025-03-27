import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCategory = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const [category, setCategory] = useState({ categoryName: "", active: "true", popular: "false" });

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`http://3.23.76.252:8080/api/categoryById/${id}`);

      console.log("Fetched Category Data:", response.data);

      if (response.data) {
        setCategory({
          categoryName: response.data.name || "",
          active: response.data.active ? "true" : "false",
          popular: response.data.popular ? "true" : "false",
        });
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
    console.log("Updated field:", name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedCategory = {
      id: id,
      name: category.categoryName,
      active: category.active === "true",
      popular: category.popular === "true",
    };

    console.log("Submitting updated category:", updatedCategory);

    try {
      await axios.put("http://3.23.76.252:8080/api/category", updatedCategory, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Category updated successfully:", updatedCategory);
      navigate("/AdminCategoryList");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        {/* Category Name Field */}
        <div className="mb-3">
          <label className="form-label">Category Name</label>
          <input
            type="text"
            className="form-control"
            name="categoryName"
            value={category.categoryName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Active and Popular Dropdowns in One Row */}
        <div className="mb-3 row">
          <div className="col">
            <label className="form-label">Active</label>
            <select className="form-select" name="active" value={category.active} onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="col">
            <label className="form-label">Popular</label>
            <select className="form-select" name="popular" value={category.popular} onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        {/* Cancel and Update Buttons */}
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/AdminCategoryList")}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">Update Category</button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
