import slider1 from "../images/slide-1.jpg";
// import abouticon from "../images/about-icons-1.svg";
import slider2 from "../images/slider-2.jpg";
import adbanner1 from "../images/ad-banner-1.jpg";
import adbanner2 from "../images/ad-banner-2.jpg";
import adbanner3 from "../images/ad-banner-3.jpg";
import attaricedal from "../images/atta-rice-dal.png";
import petcare from "../images/pet-care.png";
import home1 from "../images/home1.png";
import home2 from "../images/home2.jpg";
import home3 from "../images/home3.png";
import home7 from "../images/home7.png";

import cleaningessentials from "../images/cleaning-essentials.png";
import babycare from "../images/baby-care.png";
import chickenmeatfish from "../images/chicken-meat-fish.png";
import colddrinksjuices from "../images/cold-drinks-juices.png";
import teacoffeedrinks from "../images/tea-coffee-drinks.png";
import instantfood from "../images/instant-food.png";
import bakerybiscuits from "../images/bakery-biscuits.png";
import snackmunchies from "../images/snack-munchies.png";
import fruitsvegetables from "../images/fruits-vegetables.png";
import dairybreadeggs from "../images/dairy-bread-eggs.png";
import grocerybanner from "../images/grocery-banner.png";
import grocerybanner2 from "../images/grocery-banner-2.jpg";
// import map from "../images/map.png";
// import iphone from "../images/iphone-2.png";
// import googleplay from "../images/googleplay-btn.svg";
// import appstore from "../images/appstore-btn.svg";
import bannerdeal from "../images/banner-deal1.jpg";
import product11 from "../images/product-img-11.jpg";
import product12 from "../images/product-img-12.jpg";
import product13 from "../images/product-img-13.jpg";
import clock from "../images/clock.svg";
import gift from "../images/gift.svg";
import package1 from "../images/package.svg";
import refresh from "../images/refresh-cw.svg";
import product1 from "../images/category-baby-care.jpg";
import product2 from "../images/category-atta-rice-dal.jpg";
import product3 from "../images/category-bakery-biscuits.jpg";
import product4 from "../images/category-chicken-meat-fish.jpg";
import product5 from "../images/category-cleaning-essentials.jpg";
import product6 from "../images/category-dairy-bread-eggs.jpg";
import product7 from "../images/category-instant-food.jpg";
import product8 from "../images/category-pet-care.jpg";
import product9 from "../images/category-snack-munchies.jpg";
import product10 from "../images/category-tea-coffee-drinks.jpg";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import ProductItem from "../ProductList/ProductItem";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Slide, Zoom } from "react-awesome-reveal";
import { useEffect } from "react";
// import { PulseLoader } from 'react-spinners';
import { MagnifyingGlass } from "react-loader-spinner";
const Home = () => {
  const [categories, setCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    autoplay: true,
    autoplaySpeed: 2000,
  };
  // loading
  const [loaderStatus, setLoaderStatus] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoaderStatus(false);
    }, 1500);
  }, []);
  useEffect(() => {
    fetch("http://3.23.76.252:8080/api/category/true/true")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div>
      <div>
        {loaderStatus ? (
          <div className="loader-container">
            {/* <PulseLoader loading={loaderStatus} size={50} color="#0aad0a" /> */}
            <MagnifyingGlass
              visible={true}
              height="100"
              width="100"
              ariaLabel="magnifying-glass-loading"
              wrapperStyle={{}}
              wrapperclassName="magnifying-glass-wrapper"
              glassColor="#c0efff"
              color="#0aad0a"
            />
          </div>
        ) : (
          <>
            <>
              <div className="scroll-to-top">
                <button
                  onClick={scrollToTop}
                  className={`scroll-to-top-button ${isVisible ? "show" : ""}`}
                >
                  ↑
                </button>
              </div>
              <section className="hero-section">
                <div className="container mt-8">
                  <div
                    id="carouselExampleFade"
                    className="carousel slide carousel-fade"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div
                          style={{
                            background: `url(${home7}) no-repeat`,
                            backgroundSize: "cover",
                            backgroundPosition: "center center",
                            
                          }}
                        >
                          <div className="ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-14 px-8 text-xs-center">
                            {/* <span className="badge text-bg-warning">
                              Opening Sale Discount 10%
                            </span> */}
                            <h2 className="text-dark display-5 fw-bold mt-2">
                              SuperMarket Daily <br /> Fresh Grocery
                            </h2>
                            
                            <p className="lead">
                              Introduced a new model for online grocery shopping 
                              and convenient home delivery.
                            </p>
                            {/* <Link to="/Shop" state={{ subCategoryId :-1 ,categoryId : -1 }} className="btn btn-dark mt-3">
                              Shop Now{" "}
                              <i className="feather-icon icon-arrow-right ms-1" />
                            </Link> */}
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div
                          style={{
                            background: `url(${slider2}) no-repeat`,
                            backgroundSize: "cover",
                            borderRadius: ".5rem",
                            backgroundPosition: "center",
                          }}
                        >
                          <div className="ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-14 px-8 text-xs-center">
                            <span className="badge text-bg-warning">
                              Free Shipping - orders over $100
                            </span>
                            <h2 className="text-dark display-5 fw-bold mt-4">
                              Free Shipping on <br /> orders over{" "}
                              <span className="text-primary">$100</span>
                            </h2>
                            <p className="lead">
                              Free Shipping to First-Time Customers Only, After
                              promotions and discounts are applied.
                            </p>
                            <Link to="/Shop" state={{ subCategoryId :-1 ,categoryId :-1 }} className="btn btn-dark mt-3">
                              Shop Now{" "}
                              <i className="feather-icon icon-arrow-right ms-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      className="carousel-control-prev"
                      to="#carouselExampleFade"
                      role="button"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Previous</span>
                    </Link>
                    <Link
                      className="carousel-control-next"
                      to="#carouselExampleFade"
                      role="button"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Next</span>
                    </Link>
                  </div>
                </div>
              </section>
            </>
            <>
           
            </>
            <>
              {/* section */}
            </>
            <>
              {/* section category */}
              <section className="my-lg-14 my-8">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="mb-6">
              <div className="section-head text-center mt-8">
                <h3 className="h3style" data-title="Shop Popular Categories">
                  Shop Popular Categories
                </h3>
                <div className="wt-separator bg-primarys"></div>
                <div className="wt-separator2 bg-primarys"></div>
              </div>
            </div>
          </div>
          <div className="row">
            {categories.map((category) => (
              <div key={category.id} className="col-lg-2 col-md-4 col-6 fade-zoom">
                <Zoom>
                  <div className="text-center mb-10">
                    <Link to="/Shop" state={{ subCategoryId :-1 ,categoryId : category.id }}>
                      <img
                        src={fruitsvegetables} // Keeping the same image for all
                        alt={category.name}
                        className="card-image rounded-circle"
                      />
                    </Link>
                    <div className="mt-4">
                      <h5 className="fs-6 mb-0">
                        <Link to="/Shop" state={{ subCategoryId :-1 ,categoryId : category.id }} className="text-inherit">
                          {category.name}
                        </Link>
                      </h5>
                    </div>
                  </div>
                </Zoom>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
              {/* section */}
            </>
            <>
              {/* <section>
                <div className="container ">
                  <div className="row">
                    <div className="col-12 col-lg-6 mb-3 mb-lg-0  fade-in-left">
                      <Slide direction="left">
                        <div>
                          <div
                            className="py-10 px-8 rounded-3"
                            style={{
                              background: `url(${home5}) no-repeat`,
                              backgroundSize: "contain",
                              backgroundRepeat: "no-repeat",
                              // backgroundPosition: "center",
                              width: "900px",
                              height: "250px",
                            }}
                          >
                            <div>
                            
                              <p className="mb-4">
                                Get Upto <span className="fw-bold">30%</span>{" "}
                                Off
                              </p>
                              <Link to="/Shop" state={{ subCategoryId :-1 ,categoryId :-1 }}  className="btn btn-dark">
                                Shop Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Slide>
                    </div>
                    <div className="col-12 col-lg-6 fade-in-left ">
                      <Slide direction="right">
                        <div>
                          <div
                            className="py-10 px-8 rounded-3"
                            style={{
                              background: `url(${grocerybanner2}) no-repeat`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          >
                            <div>
                              <h3 className="fw-bold mb-1">
                                Freshly Baked Buns
                              </h3>
                              <p className="mb-4">
                                Get Upto <span className="fw-bold">25%</span>{" "}
                                Off
                              </p>
                              <Link to="/Shop" state={{ subCategoryId :-1 ,categoryId :-1 }}  className="btn btn-dark">
                                Shop Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Slide>
                    </div>
                  </div>
                </div>
              </section> */}
            </>
            <>
            
              {/* section */}
              <section className="mt-8">
                <div className="container">
                  {/* row */}
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-12 fade-in-left">
                      <Slide direction="left">
                        <div className=" banner mb-3">
                          {/* Banner Content */}
                          <div className="position-relative">
                            {/* Banner Image */}
                            <img
  src={home1}
  alt="ad-banner"
  className="img-fluid rounded-3 w-100"
  style={{ width: "400px", height: "200px" }}
/>

                            <div className="banner-text">
                              {/* <h3 className="mb-0 fw-bold">
                              Crunch, munch  <br />
                              and stay fit{" "}
                              </h3> */}
                              <div className="mt-4 mb-5 fs-5">
                                {/* <p className="mb-0">Fresh veggies make life </p> */}
                                <span>
                                
                                  {/* <span className="fw-bold text-dark">
                                  a perfect hit!
                                  </span> */}
                                </span>
                              </div>
                              {/* <Link to="/Shop" state={{ subCategoryId :-1 ,categoryId : -1 }} className="btn btn-dark">
                                Shop Now
                              </Link> */}
                            </div>
                            {/* Banner Content */}
                          </div>
                        </div>
                      </Slide>
                    </div>

                    <div className="col-lg-4 col-md-6  col-12 slide-in-top">
                      <Zoom>
                        <div className="banner mb-3 ">
                          {/* Banner Content */}
                          <div className="position-relative">
                            {/* Banner Image */}
                            <img
  src={home2}
  alt="ad-banner"
  className="img-fluid rounded-3"
  style={{ width: "400px", height: "200px" }}
/>

                            <div className="banner-text">
                              {/* Banner Content */}
                             
                              {/* <Link to="/Shop" state={{ subCategoryId :-1 ,categoryId : -1}} className="btn btn-dark mt-2">
                                Shop Now
                              </Link> */}
                            </div>
                          </div>
                        </div>
                      </Zoom>
                    </div>
                    <div className="col-lg-4 col-12 fade-in-left ">
                      <Slide direction="right">
                        <div className="banner mb-3">
                          <div className="banner-img">
                            {/* Banner Image */}
                            <img
  src={home3}
  alt="ad-banner"
  className="img-fluid rounded-3 w-100"
  style={{ width: "400px", height: "200px" }}
/>
                            {/* Banner Content */}
                            <div className="banner-text">
                            
                              {/* <Link to="/Shop" state={{ subCategoryId :-1 ,categoryId : -1}} className="btn btn-dark">
                                Shop Now
                              </Link> */}
                            </div>
                          </div>
                        </div>
                      </Slide>
                    </div>
                  </div>
                </div>
              </section>
              <ProductItem />
            </>
            <>
              {/* cta secti
              
              on */}












            
          
            </>
            <>
              <section className="my-lg-14 my-8">
                <div className="container" style={{ marginTop: 50 }}>
                  <div
                    className="row justify-content-center  g-4"
                    style={{ textAlign: "center" }}
                  >
                    <div className="col-md-3 col-sm-6 fade-zoom ">
                      <Zoom>
                        <div className="shadow-effect">
                          <div className="wt-icon-box-wraper center p-a25 p-b50 m-b30 bdr-1 bdr-gray bdr-solid corner-radius step-icon-box bg-white v-icon-effect">
                            <div className="icon-lg m-b20">
                              <div className="mb-6">
                                <img src={refresh} alt="refresh" />
                              </div>
                            </div>
                            <div className="icon-content">
                            <h3 className="h5 mb-3">Fresh & Hygienic</h3>
<p>
Sourced from trusted local farms, our products guarantee peak freshness and quality for your everyday needs.
</p>

                            </div>
                          </div>
                        </div>
                      </Zoom>
                    </div>
                    <div className="col-md-3 col-sm-12 fade-zoom">
                      <Zoom>
                        <div className="shadow-effect">
                          <div className="wt-icon-box-wraper center p-a25 p-b50 m-b30 bdr-1 bdr-gray bdr-solid corner-radius step-icon-box bg-white v-icon-effect">
                            <div className="icon-lg m-b20">
                              <div className="mb-6">
                                <img src={package1} alt="package" />
                              </div>
                            </div>
                            <div className="icon-content">
                              <h3 className="h5 mb-3">Wide Assortment</h3>
                              <p>
                                Choose from 5000+ products across food, personal
                                care, household, bakery, veg and non-veg &amp;
                                other categories.
                              </p>
                            </div>
                          </div>
                        </div>
                      </Zoom>
                    </div>
                    <div className="col-md-3 col-sm-12 fade-zoom">
                      <Zoom>
                        <div className="shadow-effect">
                          <div className="wt-icon-box-wraper center p-a25 p-b50 m-b30 bdr-1 bdr-gray bdr-solid corner-radius step-icon-box bg-white v-icon-effect">
                            <div className="icon-lg m-b20">
                              <div className="mb-6">
                                <img src={gift} alt="gift" />
                              </div>
                            </div>
                            <div className="icon-content">
                              <h3 className="h5 mb-3">
                                Best Prices &amp; Offers
                              </h3>
                              <p>
                                Cheaper prices than your local supermarket,
                                great cashback offers to top it off. Get best
                                pricess &amp; offers.
                              </p>
                            </div>
                          </div>
                        </div>
                      </Zoom>
                    </div>
                    <div className="col-md-3 col-sm-12 fade-zoom">
                      <Zoom>
                        <div className="shadow-effect">
                          <div className="wt-icon-box-wraper center p-a25 p-b50 m-b30 bdr-1 bdr-gray bdr-solid corner-radius step-icon-box bg-white v-icon-effect">
                            <div className="icon-lg m-b20">
                              <div className="mb-6">
                                <img src={clock} alt="clock" />
                              </div>
                            </div>
                            <div className="icon-content">
                              {/* <h4 className="wt-tilte">Reports</h4> */}
                              <h3 className="h5 mb-3">Quick Grocery Delivery</h3>
<p>
  Get your groceries delivered to your doorstep swiftly from Anaj Mandi, with products sourced from nearby stores.
</p>

                            </div>
                          </div>
                        </div>
                      </Zoom>
                    </div>
                  </div>
                </div>
              </section>
            </>
            <>
              <div className="container">
                <Slider {...settings2}>
                  {/* <div className="images swiper-slide p-4">
    <div className="item">
      <Link to="#" className="text-decoration-none text-inherit">
        <div className="card card-product mb-4">
          <div className="card-body text-center py-8">
            <img src={product6} alt="Grocery Ecommerce Template" className="mb-3 style={{paddingLeft:'40px'}} " />
            <div>Dairy, Bread &amp; Eggs</div>
          </div>
        </div>
     </Link>
    </div>
  </div>
  <div className="images swiper-slide p-4">
    <div className="item"> 
    <Link to="#" className="text-decoration-none text-inherit">
        <div className="card card-product mb-4">
          <div className="card-body text-center py-8">
            <img src={product9} alt="Grocery Ecommerce Template" className="mb-3"style={{paddingLeft:'40px'}} />
            <div>Snack &amp; Munchies</div>
          </div>
        </div>
     </Link></div>
  </div>
  <div className="images swiper-slide p-4">
    <div className="item">
       <Link to="#" className="text-decoration-none text-inherit">
        <div className="card card-product mb-4">
          <div className="card-body text-center py-8">
            <img src={product3} alt="Grocery Ecommerce Template" className="mb-3"style={{paddingLeft:'40px'}} />
            <div>Bakery &amp; Biscuits</div>
          </div>
        </div>
     </Link></div>
  </div>
  <div className="images swiper-slide p-4">
    <div className="item"> 
    <Link to="#" className="text-decoration-none text-inherit">
        <div className="card card-product mb-4">
          <div className="card-body text-center py-8">
            <img src={product7} alt="Grocery Ecommerce Template " className="mb-3 " style={{paddingLeft:'40px'}} />
            <div>Instant Food</div>
          </div>
        </div>
     </Link></div>
  </div>
  <div className="images swiper-slide p-4">
    <div className="item"> 
    <Link to="#" className="text-decoration-none text-inherit">
        <div className="card card-product mb-4">
          <div className="card-body text-center py-8">
            <img src={product10} alt="Grocery Ecommerce Template" className="mb-3"style={{paddingLeft:'40px'}} />
            <div>Tea, Coffee &amp; Drinks</div>
          </div>
        </div>
     </Link></div>
  </div>
  <div className="images swiper-slide p-4">
    <div className="item">
      <Link to="#" className="text-decoration-none text-inherit">
        <div className="card card-product mb-4">
          <div className="card-body text-center py-8">
            <img src={product2} alt="Grocery Ecommerce Template" className="mb-3" style={{paddingLeft:'40px'}}/>
            <div>Atta, Rice &amp; Dal</div>
          </div>
        </div>
     </Link></div>
  </div>
  <div className="images swiper-slide p-4">
    <div className="item">
       <Link to="#" className="text-decoration-none text-inherit">
        <div className="card card-product mb-4">
          <div className="card-body text-center py-8">
            <img src={product1} alt="Grocery Ecommerce Template" className="mb-3" style={{paddingLeft:'40px'}}/>
            <div>Baby Care</div>
          </div>
        </div>
     </Link></div>
  </div>
  <div className="images swiper-slide p-4">
    <div className="item"> 
    <Link to="#" className="text-decoration-none text-inherit">
        <div className="card card-product mb-4">
          <div className="card-body text-center py-8">
            <img src={product4} alt="Grocery Ecommerce Template" className="mb-3" style={{paddingLeft:'40px'}}/>
            <div>Chicken, Meat &amp; Fish</div>
          </div>
        </div>
     </Link></div>
  </div>
  <div className="images swiper-slide p-4">
    <div className="item"> 
    <Link to="#" className="text-decoration-none text-inherit">
        <div className="card card-product mb-4">
          <div className="card-body text-center py-8">
            <img src={product5} alt="Grocery Ecommerce Template" className="mb-3" style={{paddingLeft:'40px'}}/>
            <div>Cleaning Essentials</div>
          </div>
        </div>
     </Link></div>
  </div>
  <div className="images swiper-slide p-4">
    <div className="item">
      <Link to="#" className="text-decoration-none text-inherit">
        <div className="card card-product mb-4">
          <div className="card-body text-center py-8">
            <img src={product8} alt="Grocery Ecommerce Template" className="mb-3" style={{paddingLeft:'40px'}}/>
            <div>Pet Care</div>
          </div>
        </div>
     </Link>
    </div>
  </div> */}
                                </Slider>
              </div>
            </>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
