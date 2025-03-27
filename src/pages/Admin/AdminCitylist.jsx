import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminCityList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://3.23.76.252:8080/api/cities/false");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Admin City List</h2>
      <div className="d-flex justify-content-end align-items-center mb-3">
        <Link to="/AddCity" className="btn btn-primary">
          Add New City
        </Link>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>City Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>
                  <button className={`btn btn-sm ${category.active ? "btn-success" : "btn-secondary"}`}>
                    {category.active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td>
                  <Link to={`/EditCity/${category.id}`} className="btn btn-warning btn-sm me-2">
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCityList;