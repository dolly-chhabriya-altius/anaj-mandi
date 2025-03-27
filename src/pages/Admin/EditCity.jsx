import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [city, setCity] = useState({ name: "", active: true });

  useEffect(() => {
    fetchCity();
  }, [id]);

  // Fetch city details by ID
  const fetchCity = async () => {
    try {
      const response = await axios.get(`http://3.23.76.252:8080/api/cityById/${id}`);
      console.log("Fetched City Data:", response.data); // Debugging log
      setCity({
        id: response.data.id,
        name: response.data.name,
        active: response.data.active,
      });
    } catch (error) {
      console.error("Error fetching city details:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCity({ ...city, [name]: name === "active" ? value === "true" : value });
  };

  // Submit updated city details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://3.23.76.252:8080/api/city", city);
      alert("City updated successfully");
      navigate("/AdminCityList");
    } catch (error) {
      console.error("Error updating city:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit City</h2>
      <form onSubmit={handleSubmit}>
        {/* City Name Input */}
        <div className="mb-3">
          <label className="form-label">City Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={city.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Active Dropdown */}
        <div className="mb-3">
          <label className="form-label">Active</label>
          <select
            className="form-select"
            name="active"
            value={city.active.toString()} // Convert boolean to string for select dropdown
            onChange={handleChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Cancel and Update buttons in a row */}
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/AdminCityList")}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">Update City</button>
        </div>
      </form>
    </div>
  );
};

export default EditCity;
