import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./style.css";

import {
  Menu,
  X,
  Search,
  ShoppingBag,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Star,
  Gift,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
  Clock,
  Heart,
  CheckCircle,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

// HERO IMAGE
const heroImage =
  "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&w=2000&q=90";

// CATEGORY IMAGES
const categories = [
  {
    name: "Sparklers",
    subtitle: "Light up your moments",
    image:
      "https://cdn.shopify.com/s/files/1/1867/5127/files/sparklers-fireworks-image-5_480x480.jpg?v=1601039025",
    icon: "✨",
  },
  {
    name: "Flower Pots",
    subtitle: "A beautiful celebration",
    image:
      "https://auraapyrotech.com/media/categories/special_flower_pots_branded.png",
    icon: "🌸",
  },
  {
    name: "Rockets",
    subtitle: "Reach for the stars",
    image:
      "https://cdnbe.dynamicfireworks.co.uk/storage/1823/Sky-Fire-Rockets.png",
    icon: "🚀",
  },
  {
    name: "Chakkars",
    subtitle: "Spin into happiness",
    image:
      "https://srilaxmiscrackers.com/assets/images/2.png",
    icon: "🎆",
  },
];

// PRODUCT IMAGES
const products = [
  {
    id: 1,
    name: "Electric Sparklers",
    category: "Sparklers",
    price: 120,
    oldPrice: 160,
    tag: "BEST SELLER",
    image:
      "https://cdn.shopify.com/s/files/1/1867/5127/files/sparklers-fireworks-image-5_480x480.jpg?v=1601039025",
  },
  {
    id: 2,
    name: "Golden Flower Pots",
    category: "Flower Pots",
    price: 250,
    oldPrice: 320,
    tag: "POPULAR",
    image:
      "https://auraapyrotech.com/media/categories/special_flower_pots_branded.png",
  },
  {
    id: 3,
    name: "Sky Rockets",
    category: "Rockets",
    price: 350,
    oldPrice: 420,
    tag: "NEW ARRIVAL",
    image:
      "https://cdnbe.dynamicfireworks.co.uk/storage/1823/Sky-Fire-Rockets.png",
  },
  {
    id: 4,
    name: "Color Chakkars",
    category: "Chakkars",
    price: 180,
    oldPrice: 230,
    tag: "TRENDING",
    image:
      "https://srilaxmiscrackers.com/assets/images/2.png",
  },
  {
    id: 5,
    name: "Premium Sparklers",
    category: "Sparklers",
    price: 200,
    oldPrice: 260,
    tag: "SPECIAL",
    image:
      "https://cdn.shopify.com/s/files/1/1867/5127/files/sparklers-fireworks-image-5_480x480.jpg?v=1601039025",
  },
  {
    id: 6,
    name: "Deluxe Flower Pots",
    category: "Flower Pots",
    price: 450,
    oldPrice: 550,
    tag: "POPULAR",
    image:
      "https://www.pattasubazaar.in/images/flower_pot_fountain.png",
  },
  {
    id: 7,
    name: "Mega Rockets",
    category: "Rockets",
    price: 550,
    oldPrice: 650,
    tag: "BEST SELLER",
    image:
      "https://www.feuerwerksvitrine.de/imagetypes/shop-lg/img_8765.jpg",
  },
  {
    id: 8,
    name: "Rainbow Chakkars",
    category: "Chakkars",
    price: 280,
    oldPrice: 350,
    tag: "LIMITED",
    image:
      "https://srilaxmiscrackers.com/assets/images/2.png",
  },
];

// REUSABLE SCROLL ANIMATION
function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 65 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: false,
        amount: 0.12,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [showOrderPopup, setShowOrderPopup] = useState(false);

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const cartTotal = products.reduce(
    (sum, product) =>
      sum + product.price * (cart[product.id] || 0),
    0
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" ||
        product.category === activeCategory;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const updateCart = (id, change) => {
    setCart((previous) => {
      const nextQuantity = (previous[id] || 0) + change;

      if (nextQuantity <= 0) {
        const updated = { ...previous };
        delete updated[id];
        return updated;
      }

      return { ...previous, [id]: nextQuantity };
    });
  };

  // PLACE ORDER
  const placeOrder = () => {
    if (cartCount === 0) {
      alert("Please add products to your cart first!");
      return;
    }

    setShowOrderPopup(true);
  };

  // CLOSE POPUP AND RESET CART
  const finishOrder = () => {
    setShowOrderPopup(false);
    setCart({});
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="diwali-site">

      {/* NAVBAR */}
      <header className="navbar">
        <a href="#home" className="logo" onClick={closeMenu}>
          <span className="logo-icon">
            <Sparkles size={23} />
          </span>
          <span>
            DIWALI
            <strong>DHAMAKA</strong>
          </span>
        </a>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#categories" onClick={closeMenu}>Categories</a>
          <a href="#products" onClick={closeMenu}>Shop</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>

        <div className="nav-actions">
          <a href="#products" className="cart-button">
            <ShoppingBag size={19} />
            <span>Cart</span>
            <span className="cart-count">{cartCount}</span>
          </a>

          <button
            className="primary-btn"
            onClick={placeOrder}
            type="button"
          >
            Order Now <ArrowRight size={17} />
          </button>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero-section" id="home">
        <div
          className="hero-background"
          style={{ backgroundImage: `url("${heroImage}")` }}
        />

        <div className="hero-overlay" />

        <div className="hero-content">
          <motion.div
            className="hero-small-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Sparkles size={15} />
            THE FESTIVAL OF LIGHTS
            <Sparkles size={15} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            LIGHT UP
            <span>YOUR WORLD</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Your Choice. Your Celebration.
            <br />
            Make every moment brighter with our festive collection.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <a href="#products" className="primary-btn">
              Explore Collection <ArrowUpRight size={18} />
            </a>

            <a href="#categories" className="secondary-btn">
              Discover More
            </a>
          </motion.div>

          <motion.div
            className="hero-bottom-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <span className="hero-line" />
            CELEBRATE THE BRIGHTEST MOMENTS
          </motion.div>
        </div>

        <div className="hero-side-text">HAPPY DIWALI 2026</div>
      </section>

      {/* TRUST STRIP */}
      <Reveal>
        <section className="trust-strip">
          <div className="trust-item">
            <Truck size={25} />
            <div>
              <h4>Fast Delivery</h4>
              <p>Quick and reliable service</p>
            </div>
          </div>

          <div className="trust-item">
            <ShieldCheck size={25} />
            <div>
              <h4>Quality Products</h4>
              <p>Carefully selected collection</p>
            </div>
          </div>

          <div className="trust-item">
            <Gift size={25} />
            <div>
              <h4>Festive Offers</h4>
              <p>Special celebration deals</p>
            </div>
          </div>

          <div className="trust-item">
            <Clock size={25} />
            <div>
              <h4>Easy Shopping</h4>
              <p>A smooth shopping experience</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* CATEGORIES */}
      <section
        className="categories-section section-padding"
        id="categories"
      >
        <Reveal>
          <div className="section-heading">
            <span className="section-eyebrow">
              EXPLORE OUR COLLECTION
            </span>
            <h2>Shop By <span>Category</span></h2>
            <p>
              Find your favourite festive collection in one place.
            </p>
          </div>
        </Reveal>

        <div className="category-grid">
          {categories.map((category, index) => (
            <motion.button
              type="button"
              className={`category-card ${
                activeCategory === category.name ? "selected" : ""
              }`}
              key={category.name}
              onClick={() => {
                setActiveCategory(category.name);
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -9, scale: 1.02 }}
              viewport={{
                once: false,
                amount: 0.15,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
            >
              <img src={category.image} alt={category.name} />
              <div className="category-overlay" />

              <div className="category-info">
                <span className="category-emoji">
                  {category.icon}
                </span>
                <h3>{category.name}</h3>
                <p>{category.subtitle}</p>
                <span className="category-arrow">
                  <ArrowUpRight size={19} />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section
        className="products-section section-padding"
        id="products"
      >
        <Reveal>
          <div className="section-heading">
            <span className="section-eyebrow">
              MADE FOR YOUR CELEBRATION
            </span>
            <h2>Our <span>Best Sellers</span></h2>
            <p>
              Explore our handpicked festive favourites.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="product-toolbar">
            <div className="filter-buttons">
              {["All", ...categories.map((item) => item.name)].map(
                (category) => (
                  <button
                    key={category}
                    className={
                      activeCategory === category
                        ? "filter-active"
                        : ""
                    }
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                )
              )}
            </div>

            <div className="product-search">
              <Search size={17} />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
        </Reveal>

        <div className="product-grid">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.article
                className="product-card"
                key={product.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{
                  once: false,
                  amount: 0.1,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <span className="product-tag">{product.tag}</span>

                  <button
                    className="wishlist-button"
                    aria-label="Wishlist"
                    type="button"
                  >
                    <Heart size={17} />
                  </button>
                </div>

                <div className="product-details">
                  <span className="product-category">
                    {product.category}
                  </span>

                  <h3>{product.name}</h3>

                  <div className="product-rating">
                    <Star size={14} fill="currentColor" />
                    <span>4.8</span>
                    <span className="rating-muted">
                      (Customer favourite)
                    </span>
                  </div>

                  <div className="product-bottom">
                    <div className="product-price">
                      <strong>₹{product.price}</strong>
                      <del>₹{product.oldPrice}</del>
                    </div>

                    <div className="quantity-control">
                      <button
                        type="button"
                        onClick={() => updateCart(product.id, -1)}
                        aria-label="Remove one"
                      >
                        <Minus size={14} />
                      </button>

                      <span>{cart[product.id] || 0}</span>

                      <button
                        type="button"
                        onClick={() => updateCart(product.id, 1)}
                        aria-label="Add one"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-products">
            <Search size={35} />
            <h3>No products found</h3>
            <p>Try another search or category.</p>

            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              View all products
            </button>
          </div>
        )}

        {/* ORDER BUTTON */}
        <Reveal>
          <div className="order-action">
            <button
              className="primary-btn"
              onClick={placeOrder}
              type="button"
            >
              Place Your Order <ArrowRight size={18} />
            </button>
          </div>
        </Reveal>
      </section>

      {/* ORDER SUCCESS POPUP */}
      <AnimatePresence>
        {showOrderPopup && (
          <motion.div
            className="order-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowOrderPopup(false)}
          >
            <motion.div
              className="order-popup"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="order-success-icon">
                <CheckCircle size={42} />
              </div>

              <h2>Order Placed Successfully!</h2>

              <p className="order-message">
                Thank you for choosing{" "}
                <strong>DIWALI DHAMAKA!</strong>
              </p>

              <div className="order-summary">
                <div>
                  <span>Total Items</span>
                  <strong>{cartCount}</strong>
                </div>

                <div>
                  <span>Total Amount</span>
                  <strong>₹{cartTotal}</strong>
                </div>
              </div>

              <p className="order-thankyou">
                Your celebration starts here! ✨
              </p>

              <button
                className="primary-btn"
                onClick={finishOrder}
                type="button"
              >
                Continue Shopping <ArrowRight size={17} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROMO BANNER */}
      <Reveal>
        <section className="promo-section">
          <div className="promo-image">
            <img
              src="https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=1400&q=90"
              alt="Diwali festive celebration"
            />
          </div>

          <div className="promo-content">
            <span className="section-eyebrow">
              A LITTLE EXTRA MAGIC
            </span>

            <h2>
              Make This Diwali <span>Unforgettable</span>
            </h2>

            <p>
              Bring home the sparkle, share the happiness and create
              beautiful memories with your loved ones.
            </p>

            <a href="#products" className="primary-btn">
              Shop the Collection <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </Reveal>

      {/* ABOUT */}
      <section
        className="about-section section-padding"
        id="about"
      >
        <Reveal>
          <div className="about-content">
            <span className="section-eyebrow">
              THE SPIRIT OF CELEBRATION
            </span>

            <h2>
              Every Light Has A <span>Story</span>
            </h2>

            <p>
              Diwali is more than a festival. It is about family,
              happiness, togetherness and unforgettable memories.
              DIWALI DHAMAKA brings a festive shopping experience
              together in one place.
            </p>

            <div className="about-highlights">
              <div>
                <Sparkles size={22} />
                <h4>Celebrate Bright</h4>
                <p>Make every moment special.</p>
              </div>

              <div>
                <ShieldCheck size={22} />
                <h4>Choose Carefully</h4>
                <p>Shop with confidence.</p>
              </div>
            </div>

            <a href="#categories" className="text-link">
              Explore our categories <ArrowRight size={17} />
            </a>
          </div>
        </Reveal>
      </section>

      {/* TESTIMONIAL */}
      <section className="testimonial-section section-padding">
        <Reveal>
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={19}
                  fill="currentColor"
                />
              ))}
            </div>

            <h2>
              "A little sparkle can make a
              <span> big difference.</span>"
            </h2>

            <p>
              Celebrate together, create memories forever.
            </p>

            <span className="testimonial-caption">
              THE DIWALI DHAMAKA EXPERIENCE
            </span>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <Reveal>
        <section className="cta-section" id="contact">
          <div className="cta-content">
            <span className="section-eyebrow">
              LET THE FESTIVITIES BEGIN
            </span>

            <h2>
              Ready To Light Up <span>Your Diwali?</span>
            </h2>

            <p>Your Choice. Your Celebration.</p>

            <a href="#products" className="primary-btn">
              Start Shopping <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      </Reveal>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#home" className="logo">
              <span className="logo-icon">
                <Sparkles size={23} />
              </span>

              <span>
                DIWALI
                <strong>DHAMAKA</strong>
              </span>
            </a>

            <p>
              Your Choice. Your Celebration.
              <br />
              Making every festive moment brighter.
            </p>

            <div className="social-links">
              <a href="#contact" aria-label="Instagram">
                <FaInstagram />
              </a>

              <a href="#contact" aria-label="Facebook">
                <FaFacebookF />
              </a>

              <a href="#contact" aria-label="Youtube">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#categories">Categories</a>
            <a href="#products">Shop</a>
            <a href="#about">About Us</a>
          </div>

          <div className="footer-column">
            <h4>Categories</h4>

            {categories.map((category) => (
              <a
                href="#products"
                key={category.name}
                onClick={() =>
                  setActiveCategory(category.name)
                }
              >
                {category.name}
              </a>
            ))}
          </div>

          <div className="footer-column">
            <h4>Get In Touch</h4>
            <p>Celebrate safely and responsibly.</p>
            <a href="#contact">Contact Us</a>
            <a href="#about">Our Story</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 DIWALI DHAMAKA. All Rights Reserved.
          </p>

          <p>
            Made for the Festival of Lights <Sparkles size={14} />
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;