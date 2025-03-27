import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [popularityFilter, setPopularityFilter] = useState("all");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://3.23.76.252:8080/api/category/false/false");
      const formattedData = response.data.map(item => ({
        id: item.id,
        name: item.name,
        isActive: item.active,
        isPopular: item.popular
      }));
      setCategories(formattedData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const filteredCategories = categories.filter(category => {
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "active" && category.isActive) ||
      (statusFilter === "inactive" && !category.isActive);

    const popularityMatch =
      popularityFilter === "all" ||
      (popularityFilter === "popular" && category.isPopular) ||
      (popularityFilter === "notPopular" && !category.isPopular);

    return statusMatch && popularityMatch;
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Admin Category List</h2>

      <div className="d-flex justify-content-end align-items-center mb-3">
        <div className="d-flex gap-2">
          {/* Popularity Filter */}
          <select
            className="form-select w-auto"
            value={popularityFilter}
            onChange={(e) => setPopularityFilter(e.target.value)}
          >
            <option value="all">Sort by: All</option>
            <option value="popular">Sort by: Popular</option>
            <option value="notPopular">Sort by: Not Popular</option>
          </select>

          {/* Status Filter */}
          <select
            className="form-select w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Sort by: All</option>
            <option value="active">Sort by: Active</option>
            <option value="inactive">Sort by: Inactive</option>
          </select>
        </div>

        <Link to="/AddCategory" className="btn btn-primary ms-2">
          Add Category
        </Link>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Category Name</th>
            <th>Status</th>
            <th>Popular</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>
                  <button className={`btn btn-sm ${category.isActive ? "btn-success" : "btn-secondary"}`}>
                    {category.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td>
                  <button className={`btn btn-sm ${category.isPopular ? "btn-warning" : "btn-outline-warning"}`}>
                    {category.isPopular ? "Yes" : "No"}
                  </button>
                </td>
                <td>
                  <Link to={`/EditCategory/${category.id}`} className="btn btn-warning btn-sm">
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No categories found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategoryList;
