import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddCity = () => {
  const [cityName, setCityName] = useState("");
  const [isActive, setIsActive] = useState("true");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName.trim()) {
      alert("Please enter a City name.");
      return;
    }

    const requestData = {
      name: cityName,
      active: isActive === "true", // Convert string to boolean
    };

    try {
      await axios.post("http://3.23.76.252:8080/api/city", requestData, {
        headers: { "Content-Type": "application/json" }, // Ensure JSON format
      });

      alert("City added successfully!");
      navigate("/AdminCityList"); // Redirect after adding
    } catch (error) {
      console.error("Error adding city:", error);
      alert("Failed to add City.");
    }
  };

  return (
    <div className="container mt-5"> {/* Increased top margin */}
      <h2 className="mb-4 text-center">Add New City</h2> {/* Centered title with more margin */}
      <div className="card p-5 shadow-lg"> {/* Increased padding & added shadow */}
        <form onSubmit={handleSubmit}>
          {/* City Name Input */}
          <div className="mb-4"> {/* Added more bottom margin */}
            <label className="form-label fw-bold">City Name</label> {/* Made label bold */}
            <input
              type="text"
              className="form-control p-3"  /* Increased padding for better input spacing */
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              placeholder="Enter City name"
              required
            />
          </div>

          {/* Active Dropdown */}
          <div className="mb-4">
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

          {/* Buttons: Cancel & Add City */}
          <div className="d-flex justify-content-between mt-4"> {/* Added top margin */}
            <Link to="/AdminCityList" className="btn btn-secondary px-4 py-2"> {/* Added padding */}
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary px-4 py-2"> {/* Added padding */}
              Add City
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCity;
