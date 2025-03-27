import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MagnifyingGlass } from "react-loader-spinner";
import ScrollToTop from "../ScrollToTop";

const ShopWishList = () => {
  const [loaderStatus, setLoaderStatus] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const userId = localStorage.getItem("userId");

      try {
        let apiWishlist = [];
        if (userId) {
          // Fetch wishlist from API if user is logged in
          const wishlistResponse = await axios.get(
            `http://3.23.76.252:8080/api/wishlisht/${userId}`
          );
          apiWishlist = wishlistResponse.data;
        }

        // Fetch wishlist from localStorage for non-logged-in users
        let localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        // Combine both wishlists
        const combinedWishlist = [...apiWishlist, ...localWishlist];

        setWishlist(combinedWishlist);

        // Fetch product details for all wishlist items
        const productPromises = combinedWishlist.map((item) =>
          axios.get(`http://3.23.76.252:8080/api/productById/${item.productId}`)
        );

        const productResponses = await Promise.all(productPromises);
        const productData = productResponses.map((res) => res.data);

        setProducts(productData);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoaderStatus(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = (wishlistId, productId) => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      // Remove from API wishlist
      axios
        .delete(`http://3.23.76.252:8080/api/wishlisht/${wishlistId}`)
        .then(() => {
          setWishlist((prev) => prev.filter((item) => item.wishlistId !== wishlistId));
          setProducts((prev) => prev.filter((prod) => prod.productId !== productId));
        })
        .catch((error) => console.error("Error removing from wishlist:", error));
    } else {
      // Remove from localStorage wishlist
      let localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      localWishlist = localWishlist.filter((item) => item.productId !== productId);
      localStorage.setItem("wishlist", JSON.stringify(localWishlist));

      setWishlist(localWishlist);
      setProducts((prev) => prev.filter((prod) => prod.productId !== productId));
    }
  };

  return (
    <div>
      <ScrollToTop />
      {loaderStatus ? (
        <div className="loader-container">
          <MagnifyingGlass
            visible={true}
            height="100"
            width="100"
            ariaLabel="magnifying-glass-loading"
            glassColor="#c0efff"
            color="#0aad0a"
          />
        </div>
      ) : (
        <>
          <section className="my-14">
            <div className="container">
              <div className="row">
                <div className="offset-lg-1 col-lg-10">
                  <div className="mb-8">
                    <h1 className="mb-1">My Wishlist</h1>
                    <p>{wishlist.length} products in your wishlist.</p>
                  </div>
                  <div className="table-responsive">
                    <table className="table text-nowrap">
                      <thead className="table-light">
                        <tr>
                          <th>Product</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Actions</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.length > 0 ? (
                          products.map((product, index) => (
                            <tr key={product.productId}>
                           <td className="align-middle d-flex align-items-center">
  <Link to="#">
    <img
      src={`http://3.23.76.252:8080/api/images?imagePath=${encodeURIComponent(product.imagePath)}`}
      className="img-fluid icon-shape icon-xxl me-3"
      alt={product.productName}
      style={{ width: "80px", height: "80px", objectFit: "cover" }}
    />
  </Link>
  <div>
    <h5 className="fs-6 mb-0">
      <Link to="#" className="text-inherit">
        {product.productName}
      </Link>
    </h5>
  </div>


                              </td>
                              <td className="align-middle">₹{product.productPrice}</td>
                              <td className="align-middle">
                                <span className={`badge ${product.active ? "bg-success" : "bg-danger"}`}>
                                  {product.active ? "In Stock" : "Out of Stock"}
                                </span>
                              </td>
                              <td className="align-middle">
                                <button className="btn btn-primary btn-sm">Add to Cart</button>
                              </td>
                              <td className="align-middle text-center">
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    handleRemoveFromWishlist(wishlist[index]?.wishlistId, product.productId)
                                  }
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No items in your wishlist.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ShopWishList;
