import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchCities();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://3.23.76.252:8080/api/category/false/true");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch("http://3.23.76.252:8080/api/cities/true");
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  let date = new Date();
  let year = date.getFullYear();

  const halfIndex = Math.ceil(categories.length / 2);
  const firstHalf = categories.slice(0, halfIndex);
  const secondHalf = categories.slice(halfIndex);

  return (
    <div>
      <footer className="footer mt-8">
        <div className="overlay" />
        <div className="container">
          <div className="row footer-row">
            <div className="col-sm-6 col-lg-3 mb-30">
              <div className="footer-widget mb-0">
                <h4>Popular Categories</h4>
                <div className="line-footer" />
                <ul className="footer-link mb-0">
                  {firstHalf.length > 0 ? (
                    firstHalf.map((category) => (
                      <li key={category.id}>
                        <Link to="/Shop" state={{ subCategoryId: -1, categoryId: category.id }}>
                          <span>
                            <i className="fa fa-angle-right" />
                          </span>{" "}
                          {category.name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li>Loading categories...</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3 mb-30">
              <div className="footer-widget mb-0">
                <h4> </h4>
                <div className="line-footer" />
                <ul className="footer-link mb-0">
                  {secondHalf.length > 0 &&
                    secondHalf.map((category) => (
                      <li key={category.id}>
                        <Link to="/Shop" state={{ subCategoryId: -1, categoryId: category.id }}>
                          <span>
                            <i className="fa fa-angle-right" />
                          </span>{" "}
                          {category.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
 
            <div className="col-sm-6 col-lg-3 mb-30">
                <div className="footer-widget mb-0">
                  <h4>For Consumers</h4>
                  <div className="line-footer" />
                  <div className="row">
                    <div className="col">
                      <ul className="footer-link mb-0">
                        <li>
                        
                        </li>
                        <li>
                          <Link to="/ShopCart">
                            <span>
                              <i className="fa fa-angle-right" />
                            </span>{" "}
                            Promos &amp; coupons
                          </Link>
                        </li>
                        <li>
                          <Link to="/MyAccountOrder">
                            <span>
                              <i className="fa fa-angle-right" />
                            </span>
                            Shipping
                          </Link>
                        </li>
                        <li>
                          <Link to="/PrivacyPolicy">
                            <span>
                              <i className="fa fa-angle-right" />
                            </span>{" "}
                            Privacy Policy 
                          </Link>
                        </li>
                        <li>
                          <Link to="/MyAcconutPaymentMethod">
                            <span>
                              <i className="fa fa-angle-right" />
                            </span>{" "}
                            Payments
                          </Link>
                        </li>
                        <li>
                          <Link to="/Contact">
                            <span>
                              <i className="fa fa-angle-right" />
                            </span>{" "}
                            FAQ
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            <div className="col-sm-6 col-lg-3 mb-30">
              <div className="footer-widget mb-0">
                <h4>Cities We Serve</h4>
                <div className="line-footer" />
                <ul className="footer-link mb-0">
                  {cities.length > 0 ? (
                    cities.map((city) => (
                      <li key={city.id}>
                        <Link to="#">
                          <span>
                            <i className="fa fa-angle-right" />
                          </span>{" "}
                          {city.name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li>Loading cities...</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bar ">
          <div className="container text-center">
            <div className="footer-copy"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

