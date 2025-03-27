import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const location = useLocation();
  const product = location.state?.product || null;
  const subCategoryId = location.state?.subCategoryId || -1;
  const categoryId = location.state?.categoryId || -1;

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loaderStatus, setLoaderStatus] = useState(true);
  const [openDropdowns, setOpenDropdowns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryUrl = "http://3.23.76.252:8080/api/category/false/true";
        const subCategoryUrl = "http://3.23.76.252:8080/api/subCategory/true";

        const [categoryRes, subCategoryRes] = await Promise.all([
          axios.get(categoryUrl),
          axios.get(subCategoryUrl),
        ]);

        setCategories(categoryRes.data);
        setSubCategories(subCategoryRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoaderStatus(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToWishlist = async () => {
    const userId = localStorage.getItem("userId");
  
    if (userId) {
      // User is logged in, add product to wishlist via API
      try {
        const response = await axios.post("http://3.23.76.252:8080/api/wishlisht", {
          wishlishtId: 0, // Assuming backend auto-generates wishlistId
          productId: product.productId,
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
      storedWishlist.push({ productId: product.productId });
      localStorage.setItem("wishlist", JSON.stringify(storedWishlist));
  
      alert("Product saved! Login to add to wishlist.");
    }
  };
  
  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");
  
    if (userId) {
      // User is logged in, add product to cart via API
      try {
        const response = await axios.post("http://3.23.76.252:8080/api/cart", {
          cartId: 0, // Assuming backend auto-generates cartId
          productId: product.productId,
          quantity: 1, // Default quantity, change if needed
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
      // User is not logged in, store productId in localStorage
      let storedProducts = JSON.parse(localStorage.getItem("cart")) || [];
      storedProducts.push({ productId: product.productId, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(storedProducts));
  
      alert("Product saved! Login to add to cart.");
    }
  };

  const toggleDropdown = (event, index) => {
    event.preventDefault();
    setOpenDropdowns((prev) => {
      const isOpen = prev.includes(index);
      return isOpen ? prev.filter((i) => i !== index) : [...prev, index];
    });
  };

  return (
    <div>
      {loaderStatus ? (
        <div className="loader-container">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            {/* Left Side: Categories & Subcategories */}
            <div className="col-md-3">
              <h5 className="mb-3 mt-4">Categories</h5>
              {categories.map((category, index) => (
                <ul className="nav flex-column" key={index}>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="#"
                      onClick={(event) => toggleDropdown(event, index)}
                      aria-expanded={openDropdowns.includes(index) ? "true" : "false"}
                    >
                      {category.name} <i className="fa fa-chevron-down" />
                    </Link>

                    <div className={`collapse ${openDropdowns.includes(index) ? "show" : ""}`}>
                      <ul className="nav flex-column ms-3">
                        {subCategories
                          .filter((sub) => sub.categoryId === category.id)
                          .map((sub, subIndex) => (
                            <li className="nav-item" key={subIndex}>
                              <Link
                                className="nav-link"
                                to="/Shop"
                                state={{ subCategoryId: sub.subCategoryId, categoryId: -1 }}
                              >
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

            {/* Right Side: Product Image & Details */}
            <div className="col-md-9">
              {product ? (
                <>
                  <div className="row align-items-center">
                    {/* Left: Product Image */}
                    <div className="col-md-5 text-center">
                      <img
                        src={`http://3.23.76.252:8080/api/images?imagePath=${encodeURIComponent(product.imagePath)}`}
                        alt={product.productName}
                        className="img-fluid rounded"
                        style={{ maxWidth: "100%", height: "300px", objectFit: "cover" }}
                      />
                    </div>

                    {/* Right: Product Details */}
                    <div className="col-md-7">
                      <h4 className="fw-bold">{product.productName}</h4>
                      <p className="text-muted">
                        {product.productShortDesc || "No short description available."}
                      </p>

                      <p className="text-danger fw-bold fs-5">₹{product.productPrice || "999"}</p>

                      {/* Buttons Row */}
                      <div className="d-flex gap-2 mt-3">
                      <button className="btn btn-primary px-4" onClick={handleAddToCart}>
    Add to Cart
  </button>
  <button className="btn btn-outline-secondary px-4" onClick={handleAddToWishlist}>
  Wishlist
</button>

                      </div>
                    </div>
                  </div>

                  {/* Long Description Below */}
                  <div className="mt-4">
                    <h5 className="fw-bold">Product Description</h5>
                    <p>
                      {product.productLongDesc ||
                        "No long description available for this product."}
                    </p>
                  </div>
                </>
              ) : (
                <p>No product selected</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
