import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductItem = () => {
  const [products, setProducts] = useState([]);
  const API_URL = "http://3.23.76.252:8080/api/product/-1/-1/true/true";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
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
  
  return (
    <div>
      <section className="my-lg-14 my-8">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-6">
              <div className="section-head text-center mt-8">
                <h3 className="h3style" data-title="Popular Products">
                  Popular Products
                </h3>
                <div className="wt-separator bg-primarys"></div>
                <div className="wt-separator2 bg-primarys"></div>
              </div>
            </div>
          </div>
          <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3">
            {products.map((product) => (
              <div className="col fade-zoom" key={product.productId}>
                <div className="card card-product">
                  <div className="card-body">
                    <div className="text-center position-relative">
                      {/* Navigate to ProductDetails on Image Click */}
                      <Link to="/ProductDetails" state={{ product }}>
                        <img
                          src={`http://3.23.76.252:8080/api/images?imagePath=${encodeURIComponent(product.imagePath)}`}
                          alt={product.productName}
                          className="product-image"
                        />
                      </Link>
                    </div>

                    {/* Navigate to ProductDetails on Name Click */}
                    <h2 className="fs-6">
                      <Link to="/ProductDetails" state={{ product }} className="text-inherit text-decoration-none">
                        {product.productName}
                      </Link>
                    </h2>

                    {/* Display Product Price */}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div>
                        <span className="text-dark">${product.productPrice}</span>
                      </div>
                      <div>
                      <button className="btn btn-primary btn-sm" onClick={() => handleAddToCart(product)}>
  Add
</button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {products.length === 0 && <p className="text-center">No products available.</p>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductItem;

// CSS to add in your global styles or component-specific styles
const styles = `
.product-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  background-color: #f8f9fa;
  border-radius: 5px;
}`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
