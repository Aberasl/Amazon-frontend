import React, { useContext } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { BsCart } from "react-icons/bs";
import { TfiLocationPin } from "react-icons/tfi";
import classes from "./Header.module.css";
import Lowerheader from "./header/Lowerheader";
import { Link } from "react-router-dom";
import { DataContext } from "..//Datapprovider/DataProvider.jsx";
import { auth } from "../../Utilty/Firebase.js";

const Header = () => {
  
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section className={classes.fixed}>
      <header className={classes.header}>
        <div className={classes.container}>
          {/* Logo */}
          <div className={classes.logoContainer}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="Amazon Logo"
                className={classes.logo}
              />
            </Link>
          </div>

          {/* Delivery */}
          <div className={classes.delivery}>
            <TbTruckDelivery className={classes.deliveryIcon} />
            <div className={classes.deliveryInfo}>
              <p>Delivered to</p>
              <div>
                <TfiLocationPin />
              </div>
              <p>Ethiopia</p>
            </div>
          </div>

          {/* Search */}
          <div className={classes.search}>
            <select className={classes.select}>
              <option value="All">All</option>
            </select>
            <input
              type="text"
              className={classes.input}
              placeholder="Search products"
            />
            <div className={classes.searchIconContainer}>
              <IoSearch className={classes.searchIcon} />
            </div>
          </div>

          {/* Right Side Links */}
          <div className={classes.navLinks}>
            <div className={classes.language}>
              <img
                src="https://www.shutterstock.com/shutterstock/photos/2480140689/display_1500/stock-vector-usa-waving-flag-pattern-background-realistic-national-flag-design-abstract-vector-template-2480140689.jpg"
                alt="Language Flag"
                className={classes.languageFlag}
              />
              <select className={classes.select}>
                <option value="EN">EN</option>
              </select>
            </div>

            <div className={classes.navLink}>
              <Link to={!user && "/Auth "} className={classes.link}>
                <div>
                  {user ? (
                    <>
                      <p>Hello,{user?.email?.split("@")[0]}</p>

                      <span onClick={() => auth.signOut()}>Sign Out</span>
                    </>
                  ) : (
                    <>
                      <p>Hello,Sign In</p>
                      <span>Account & Lists</span>
                    </>
                  )}
                </div>
              </Link>
            </div>

            <div className={classes.navLink}>
              <Link to="/order" className={classes.link}>
                <p>Returns</p>
                <span>Orders</span>
              </Link>
            </div>

            {/* Cart */}
            <div className={classes.cart}>
              <Link to="/cart" className={classes.link}>
                <BsCart className={classes.cartIcon} />
                <span>cart</span>
                <span className={classes.cartCount}>{totalItem}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <Lowerheader />
    </section>
  );
};

export default Header;
