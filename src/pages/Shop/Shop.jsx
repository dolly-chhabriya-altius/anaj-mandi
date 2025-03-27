// import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from 'react-loader-spinner'
import assortment from "../../images/assortment-citrus-fruits.png";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState, useEffect } from "react";



// import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useParams } from 'react-router-dom';


import { useLocation } from "react-router-dom";


import { FaList, FaTh, FaThLarge,FaHeart } from "react-icons/fa"; // Icons for layout switch

function Shop() {
  console.log("In shop");
  const location = useLocation();
  const [subCategoryId, setSubCategoryId] = useState(location.state?.subCategoryId || -1);

  useEffect(() => {
    setSubCategoryId(location.state?.subCategoryId || -1);
  }, [location]);

  return (
    <div>
      <Dropdown subCategoryId={subCategoryId} />
    </div>
  );
}

function Dropdown() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState([]);
  const [products, setProducts] = useState([]);
  const [loaderStatus, setLoaderStatus] = useState(true);
  const [sortOption, setSortOption] = useState("relevance");
  const [isFavorite, setIsFavorite] = useState(false); 
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || {};
  });

  // Load column layout from local storage or default to 4 columns
  const [columnLayout, setColumnLayout] = useState(() => {
    return localStorage.getItem("columnLayout")
      ? parseInt(localStorage.getItem("columnLayout"))
      : 4;
  });

  const location = useLocation();
  const subCategoryId = location.state?.subCategoryId || -1;
  const categoryId = location.state?.categoryId || -1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryUrl = "http://3.23.76.252:8080/api/category/false/true";
        const subCategoryUrl = "http://3.23.76.252:8080/api/subCategory/true";
        const productUrl = `http://3.23.76.252:8080/api/product/${categoryId}/${subCategoryId}/false/true`;

        console.log("Fetching category data from:", categoryUrl);
        console.log("Fetching subCategory data from:", subCategoryUrl);
        console.log("Fetching product data from:", productUrl);

        const [categoryRes, subCategoryRes, productRes] = await Promise.all([
          axios.get(categoryUrl),
          axios.get(subCategoryUrl),
          axios.get(productUrl),
        ]);

        setCategories(categoryRes.data);
        setSubCategories(subCategoryRes.data);
        setProducts(productRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoaderStatus(false);
      }
    };

    fetchData();
  }, [subCategoryId, categoryId]);
  const toggleFavorite = async (productId) => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      // User is logged in, add to wishlist via API
      try {
        const response = await axios.post("http://3.23.76.252:8080/api/wishlisht", {
          wishlishtId: 0, // Assuming backend auto-generates wishlistId
          productId,
          userId: parseInt(userId),
        });

        if (response.status === 200 || response.status === 201) {
          alert("Product added to wishlist!");
        }
      } catch (error) {
        console.error("Error adding to wishlist:", error);
        alert("Failed to add to wishlist. Try again!");
      }
    } else {
      // User not logged in, store wishlist in localStorage
      let storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (!storedWishlist.some((item) => item.productId === productId)) {
        storedWishlist.push({ productId });
        localStorage.setItem("wishlist", JSON.stringify(storedWishlist));
      }
      alert("Product saved! Login to add to wishlist.");
    }

    // Toggle favorite state for this specific product only
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }));
  };
  const handleAddToCart = async (product) => {
    if (!product || !product.productId) {
      console.error("Invalid product data:", product);
      alert("Error: Product data is missing!");
      return;
    }
  
    const userId = localStorage.getItem("userId");
  
    if (userId) {
      try {
        const response = await axios.post("http://3.23.76.252:8080/api/cart", {
          cartId: 0, 
          productId: product.productId, 
          quantity: 1, 
          userId: parseInt(userId),
        });
  
        if (response.status === 200 || response.status === 201) {
          alert("Product added to cart!");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Failed to add to cart. Try again!");
      }
    } else {
      let storedProducts = JSON.parse(localStorage.getItem("cart")) || [];
      storedProducts.push({ productId: product.productId, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(storedProducts));
      alert("Product saved! Login to add to cart.");
    }
  };
  
  const toggleDropdown = (index) => {
    setOpenDropdowns((prevOpenDropdowns) =>
      prevOpenDropdowns.includes(index)
        ? prevOpenDropdowns.filter((item) => item !== index)
        : [...prevOpenDropdowns, index]
    );
  };

  // Sorting function
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "low-to-high") {
      return a.productPrice - b.productPrice;
    } else if (sortOption === "high-to-low") {
      return b.productPrice - a.productPrice;
    }
    return 0; // Default (popularity, no sorting)
  });

  // Function to update layout and store it in local storage
  const handleLayoutChange = (layout) => {
    setColumnLayout(layout);
    localStorage.setItem("columnLayout", layout);
  };

  return (
    <div>
      {loaderStatus ? (
        <div className="loader-container">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="container">
            <div className="row">
              <h5 className="mb-3 mt-8">Categories</h5>
              <div className="col-md-3">
                {categories.map((category, index) => (
                  <ul className="nav flex-column" key={index}>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="#"
                        onClick={() => toggleDropdown(index)}
                        aria-expanded={openDropdowns.includes(index) ? "true" : "false"}
                        aria-controls={`categoryFlush${index + 1}`}
                      >
                        {category.name} <i className="fa fa-chevron-down" />
                      </Link>
                      <div
                        className={`collapse ${openDropdowns.includes(index) ? "show" : ""}`}
                        id={`categoryFlush${index + 1}`}
                      >
                        <ul className="nav flex-column ms-3">
                          {subCategories
                            .filter((sub) => sub.categoryId === category.id)
                            .map((sub, subIndex) => (
                              <li className="nav-item" key={subIndex}>
                                <Link className="nav-link" to="/Shop" state={{ subCategoryId: sub.subCategoryId, categoryId: -1 }}>
                                  {sub.subCategoryName}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </li>
                  </ul>
                ))}
              </div>

              <div className="col-lg-9 col-md-8">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-3 mt-2">Total Productsss: {products.length}</h5>

                  {/* Sorting Dropdown */}
                  <select
                    className="form-select w-auto"
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="relevance">Sort by relevance</option>
                    <option value="low-to-high">Sort by Price: Low to High</option>
                    <option value="high-to-low">Sort by Price: High to Low</option>
                  </select>

                  {/* Layout Icons */}
                  <div className="d-flex align-items-center gap-2">
                    <FaList
                      size={20}
                      className={`cursor-pointer ${columnLayout === 1 ? "text-primary" : ""}`}
                      onClick={() => handleLayoutChange(1)}
                    />
                    <FaThLarge
                      size={20}
                      className={`cursor-pointer ${columnLayout === 3 ? "text-primary" : ""}`}
                      onClick={() => handleLayoutChange(3)}
                    />
                    <FaTh
                      size={20}
                      className={`cursor-pointer ${columnLayout === 4 ? "text-primary" : ""}`}
                      onClick={() => handleLayoutChange(4)}
                    />
                  </div>
                </div>

                {/* Product Grid */}
                <div className={`row g-4 mt-2 ${columnLayout === 1 ? "d-flex flex-column" : `row-cols-${columnLayout}`}`}>
                  {sortedProducts.map((product) => (
                    <div className={columnLayout === 1 ? "w-100" : "col"} key={product.productId}>
                      <div className={`card ${columnLayout === 1 ? "d-flex flex-row align-items-center p-3" : "card-product"}`}>
                        {/* Product Image */}
{/* Product Image */}
<div className={columnLayout === 1 ? "me-3 position-relative" : "text-center position-relative"}>
  <Link to="/ProductDetails" state={{ product }}>
  <img
  src={`http://3.23.76.252:8080/api/images?imagePath=${encodeURIComponent(product.imagePath)}`}
  alt={product.productName}
  className={columnLayout === 1 ? "img-fluid" : "mb-3 img-fluid"}
  width="100"
  height="100"
  style={{
    width: "150px",
    height: "150px",
    objectFit: "contain",
    backgroundColor: "#f8f9fa", // Light grey background
    borderRadius: "5px", // Optional rounded corners
  }}
/>

  </Link>

  {/* Favorite Icon */}
  <button
      className="btn position-absolute top-0 start-0 m-2 text-danger cursor-pointer"
      onClick={() => toggleFavorite(product.productId)}
    >
      <FaHeart color={isFavorite ? "red" : "gray"} size={20} />
    </button></div>

                        {/* Product Details */}
                        <div className="card-body">
                          <h2 className="fs-6 mb-1">
                            <Link  to="/ProductDetails" state={{ product }} className="text-inherit text-decoration-none">
                              {product.productName}
                            </Link>
                          </h2>
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <span className="text-dark">${product.productPrice}</span>
                            {/* <Link to="#" className="btn btn-primary btn-sm">Add</Link> */}
                            <button className="btn btn-primary btn-sm" onClick={() => handleAddToCart(product)}>
  Add
</button>


                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div> 
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


export default Shop;
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
