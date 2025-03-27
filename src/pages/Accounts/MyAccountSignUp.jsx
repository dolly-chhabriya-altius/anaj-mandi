import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupimage from "../../images/signup-g.svg";
import ScrollToTop from "../ScrollToTop";

const MyAccountSignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    emailId: "",
    mobile_N0: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      userId: 0, // Assuming it's auto-generated
      userName: formData.userName,
      emailId: formData.emailId,
      mobile_N0: formData.mobile_N0,
      password: formData.password,
      addressId: 0, // Default value
      createdDate: new Date().toISOString(), // Current date
    };

    try {
      const response = await fetch("http://3.23.76.252:8080/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/MyAccountSignIn");
      } else {
        alert("Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <ScrollToTop />
      <section className="my-lg-14 my-8">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
              <img src={signupimage} alt="Anaj Mandi" className="img-fluid" />
            </div>
            <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
              <div className="mb-lg-9 mb-5">
                <h1 className="mb-1 h2 fw-bold">Get Started</h1>
                <p>Welcome to Anaj Mandi! Enter your details to register.</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="emailId"
                      value={formData.emailId}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mobile Number"
                      name="mobile_N0"
                      value={formData.mobile_N0}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12 d-grid">
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                    <span className="navbar-text">
                      Already have an account? <Link to="/MyAccountSignIn">Sign in</Link>
                    </span>
                  </div>
                  <p>
                    <small>
                      By continuing, you agree to our{" "}
                      <Link to="#!">Terms of Service</Link> &amp;{" "}
                      <Link to="#!">Privacy Policy</Link>
                    </small>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyAccountSignUp;
