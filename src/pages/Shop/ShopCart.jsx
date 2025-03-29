import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import axios from "axios";

const ShopCart = () => {
  const [loaderStatus, setLoaderStatus] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem("userId");
        let cartData = [];

        if (userId) {
          const cartRes = await axios.get(`http://3.23.76.252:8080/api/cart/${userId}`);
          cartData = cartRes.data;
        } else {
          cartData = JSON.parse(localStorage.getItem("cart")) || [];
        }

        if (cartData.length > 0) {
          setCartItems(cartData);
          const productRequests = cartData.map((item) =>
            axios.get(`http://3.23.76.252:8080/api/productById/${item.productId}`)
          );
          const productResponses = await Promise.all(productRequests);
          const productDetails = productResponses.map((res) => res.data);
          setProducts(productDetails);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoaderStatus(false);
      }
    };
    fetchCartItems();
  }, []);

  // Function to call the API to update cart quantity
  const updateCartQuantity = async (productId, newQuantity) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        await axios.put(`http://3.23.76.252:8080/api/updateCartQty/${productId}/${newQuantity}/${userId}`);
      } catch (error) {
        console.error("Error updating cart quantity:", error);
      }
    }
  };

  // Function to handle + and - clicks
  const handleQuantityChange = (productId, delta) => {
    const updatedCartItems = cartItems
      .map((item) => {
        if (item.productId === productId) {
          const newQuantity = item.quantity + delta;

          // Remove the item from local state if quantity reaches 0
          if (newQuantity <= 0) {
            updateCartQuantity(productId, 0);  // API call with 0
            return null;  // Temporarily remove the item from the UI
          } else {
            updateCartQuantity(productId, newQuantity);  // API call with new quantity
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      })
      .filter((item) => item !== null);  // Remove null entries (quantity = 0)

    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    return products.reduce((sum, product) => {
      const cartItem = cartItems.find((item) => item.productId === product.productId);
      return sum + (product.productPrice * (cartItem ? cartItem.quantity : 1));
    }, 0);
  };

  return (
    <div className="container mt-5">
      {loaderStatus ? (
        <div className="text-center">
          <MagnifyingGlass visible={true} height="100" width="100" color="#0aad0a" />
        </div>
      ) : (
        <section className="shop-cart">
          <div className="card p-4 mb-4 shadow-sm border-0" style={{ borderRadius: "15px", background: "linear-gradient(145deg, #ffffff, #f8f9fa)" }}>
            <h1 className="fw-bold text-center" style={{ color: "#2c3e50" }}>Shopping Cart</h1>
          </div>
          <div className="row">
            <div className="col-lg-8">
              {products.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {products.map((product, index) => {
                    const cartItem = cartItems.find((item) => item.productId === product.productId);

                    if (!cartItem) return null;  // Skip if removed

                    return (
                      <li key={index} className="list-group-item d-flex align-items-center py-3 border rounded mb-3" style={{ borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                        <img
                          src={`http://3.23.76.252:8080/api/images?imagePath=${encodeURIComponent(product.imagePath)}`}
                          alt={product.productName}
                          className="img-fluid rounded me-3"
                          style={{ width: "80px", height: "80px", objectFit: "cover" }}
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-1" style={{ color: "#34495e" }}>{product.productName}</h6>
                          <span className="text-muted">{cartItem.quantity} pcs</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            style={{ borderRadius: "5px" }}
                            onClick={() => handleQuantityChange(product.productId, -1)}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={cartItem.quantity}
                            className="form-control text-center mx-2"
                            style={{ width: "40px", borderRadius: "5px" }}
                            readOnly
                          />
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            style={{ borderRadius: "5px" }}
                            onClick={() => handleQuantityChange(product.productId, 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="ms-3 text-end">
                          <span className="fw-bold" style={{ color: "#27ae60" }}>₹{product.productPrice}</span>
                          {product.productDiscountPercent > 0 && (
                            <div className="text-muted text-decoration-line-through small">
                              ₹{(product.productPrice / (1 - product.productDiscountPercent / 100)).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-center text-muted">Your cart is empty.</p>
              )}
            </div>
            <div className="col-lg-4">
              <div className="card p-4 shadow-sm border-0" style={{ borderRadius: "15px", background: "linear-gradient(145deg, #ffffff, #f8f9fa)" }}>
                <h2 className="h5" style={{ color: "#2c3e50" }}>Summary</h2>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between" style={{ border: "none" }}>
                    <span>Item Subtotal</span>
                    <span>₹{calculateTotal().toFixed(2)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between" style={{ border: "none" }}>
                    <span>Service Fee</span>
                    <span>₹3.00</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between fw-bold" style={{ border: "none" }}>
                    <span>Total</span>
                    <span style={{ color: "#27ae60" }}>₹{(calculateTotal() + 3).toFixed(2)}</span>
                  </li>
                </ul>
                <button className="btn btn-primary w-100 mt-3" style={{ borderRadius: "10px", background: "#3498db", border: "none" }}>Checkout</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ShopCart;
