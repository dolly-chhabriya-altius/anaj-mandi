import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminEditSubCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subcategory, setSubcategory] = useState({ name: "", isActive: true, categoryType: "" });
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchSubCategory();
        await fetchCategoryTypes();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const fetchSubCategory = async () => {
    try {
      const response = await axios.get(`http://3.23.76.252:8080/api/subCategoryById/${id}`);
      console.log("Fetched Subcategory Data:", response.data); // Debugging log
      
      setSubcategory({
        name: response.data.subCategoryName || "", // Correct field name
        isActive: response.data.active, // Correct field name
        categoryType: response.data.categoryName || "" // Correct field name
      });
    } catch (error) {
      console.error("Error fetching subcategory details:", error);
    }
  };
  

  const fetchCategoryTypes = async () => {
    try {
      const response = await axios.get("http://3.23.76.252:8080/api/category/false/false");
      console.log("Fetched Category Types:", response.data); // Debugging log
      setCategoryTypes(response.data);
    } catch (error) {
      console.error("Error fetching category types:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubcategory({ ...subcategory, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Find the selected category ID
    const selectedCategory = categoryTypes.find(cat => cat.name === subcategory.categoryType);
    const categoryId = selectedCategory ? selectedCategory.id : null;
  
    if (!categoryId) {
      alert("Invalid category selected");
      return;
    }
  
    const payload = {
      subCategoryId: id, // Ensure the correct subcategory ID is sent
      subCategoryName: subcategory.name,
      categoryId: categoryId,
      categoryName: subcategory.categoryType,
      active: subcategory.isActive
    };
  
    try {
      await axios.put("http://3.23.76.252:8080/api/subCategory", payload);
      alert("Subcategory updated successfully");
      navigate("/AdminSubCategoryList");
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Edit Sub Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Sub Category Name</label>
          <input 
            type="text" 
            className="form-control" 
            name="name" 
            value={subcategory.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3 d-flex gap-3">
          <div className="w-50">
            <label className="form-label">Category Type</label>
            <select 
              className="form-select" 
              name="categoryType" 
              value={subcategory.categoryType} 
              onChange={handleChange} 
              required
            >
              <option value="">Select Category</option>
              {categoryTypes.map((type) => (
                <option key={type.id} value={type.name}>{type.name}</option>
              ))}
            </select>
          </div>
          <div className="w-50">
            <label className="form-label">Status</label>
            <select 
              className="form-select" 
              name="isActive" 
              value={subcategory.isActive} 
              onChange={(e) => setSubcategory({ ...subcategory, isActive: e.target.value === "true" })}
              required
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/AdminSubCategoryList")}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditSubCategory;