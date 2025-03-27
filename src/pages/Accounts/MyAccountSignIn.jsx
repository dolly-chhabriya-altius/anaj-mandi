import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signinimage from "../../images/signin-g.svg";
import ScrollToTop from "../ScrollToTop";
import axios from "axios";

const MyAccountSignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     // Step 1: Perform login
  //     const response = await fetch("http://3.23.76.252:8080/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         emailId: formData.emailId,
  //         password: formData.password,
  //       },
  //     });
  
  //     if (response.ok) {
  //       const userId = await response.json(); // Assuming API returns userId directly
  //       console.log("API Response:", userId);
  
  //       // Step 2: Store userId in localStorage
  //       localStorage.setItem("userId", userId);
  
  //       // Step 3: Merge local storage cart with backend cart
  //       let storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  //       if (storedCart.length > 0) {
  //         // Send each cart item individually to the backend
  //         for (const item of storedCart) {
  //           try {
  //             const cartResponse = await axios.post("http://3.23.76.252:8080/api/cart", {
  //               cartId: 0, // Assuming backend auto-generates cartId
  //               productId: item.productId,
  //               quantity: item.quantity || 1, // Use stored quantity or default to 1
  //               userId: parseInt(userId), // Ensure userId is a number
  //             });
  
  //             if (cartResponse.status === 200 || cartResponse.status === 201) {
  //               console.log("Cart item added:", item.productId);
  //             }
  //           } catch (error) {
  //             console.error("Error adding cart item:", error);
  //           }
  //         }
  
  //         // Step 4: Clear local storage cart after merging
  //         localStorage.removeItem("cart");
  //       }
  
  //       alert("Login successful!");
  //       navigate("/MyAccountSignUp"); // Redirect after login
  //     } else {
  //       console.error("Login failed:", response);
  //       alert("Invalid email or password. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Something went wrong. Please try again.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Step 1: Perform login
      const response = await fetch("http://3.23.76.252:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          emailId: formData.emailId,
          password: formData.password,
        },
      });
  
      if (response.ok) {
        const userId = await response.json(); // Assuming API returns userId directly
        console.log("API Response:", userId);
  
        // Step 2: Store userId in localStorage
        localStorage.setItem("userId", userId);
  
        // Step 3: Merge local storage cart with backend cart
        let storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        if (storedCart.length > 0) {
          for (const item of storedCart) {
            try {
              const cartResponse = await axios.post("http://3.23.76.252:8080/api/cart", {
                cartId: 0, // Assuming backend auto-generates cartId
                productId: item.productId,
                quantity: item.quantity || 1,
                userId: parseInt(userId),
              });
  
              if (cartResponse.status === 200 || cartResponse.status === 201) {
                console.log("Cart item added:", item.productId);
              }
            } catch (error) {
              console.error("Error adding cart item:", error);
            }
          }
  
          // Step 4: Clear local storage cart after merging
          localStorage.removeItem("cart");
        }
  
        // Step 5: Merge local storage wishlist with backend wishlist
        let storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        if (storedWishlist.length > 0) {
          for (const item of storedWishlist) {
            try {
              const wishlistResponse = await axios.post("http://3.23.76.252:8080/api/wishlisht", {
                wishlishtId: 0, // Assuming backend auto-generates wishlistId
                productId: item.productId,
                userId: parseInt(userId),
              });
  
              if (wishlistResponse.status === 200 || wishlistResponse.status === 201) {
                console.log("Wishlist item added:", item.productId);
              }
            } catch (error) {
              console.error("Error adding wishlist item:", error);
            }
          }
  
          // Step 6: Clear local storage wishlist after merging
          localStorage.removeItem("wishlist");
        }
  
        alert("Login successful!");
        navigate("/MyAccountSignUp"); // Redirect after login
      } else {
        console.error("Login failed:", response);
        alert("Invalid email or password. Please try again.");
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
              <img src={signinimage} alt="Anaj Mandi" className="img-fluid" />
            </div>
            <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
              <div className="mb-lg-9 mb-5">
                <h1 className="mb-1 h2 fw-bold">Sign in to Anaj Mandi</h1>
                <p>Welcome back! Enter your credentials to continue.</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
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
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Remember me
                      </label>
                    </div>
                    <div>
                      Forgot password? <Link to="/MyAccountForgetPassword">Reset it</Link>
                    </div>
                  </div>
                  <div className="col-12 d-grid">
                    <button type="submit" className="btn btn-primary">
                      Sign In
                    </button>
                  </div>
                  <div>
                    Don’t have an account? <Link to="/MyAccountSignUp">Sign Up</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyAccountSignIn;
