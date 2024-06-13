import React, { useState } from "react";
import "../Style/Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const user = JSON.parse(localStorage.getItem('users'));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear('users');
    navigate("/sign-in");
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart);

  return (
    <header>
      <div id="header">
        <NavLink to="/">
          <img id="logo" src="/logo.png" alt="logo" />
        </NavLink>
        <div id="icons">
          <div className="hamburger-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <i className={`icons fa-xl fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </div>
          <NavLink to="/search">
            <i className="icons fa-xl fa-solid fa-magnifying-glass"></i>
          </NavLink>
          <NavLink to="/user-dashboard">
            <i className="icons fa-xl fa-regular fa-user"></i>
          </NavLink>
          <NavLink to="/cart">
            <i className="icons fa-xl fa-solid fa-bag-shopping"></i>
          </NavLink>
        </div>
      </div>
      <nav className={isMobileMenuOpen ? "mobile-menu-open" : ""}>
        <menu className={isMobileMenuOpen ? "mobile-menu-open" : ""}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/cart">cart({cartItems.length})</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/sign-up">Signup</Link>
              </li>
              <li>
                <Link to="/sign-in">Signin</Link>
              </li>
            </>
          ) : (
            <>
              {user.role === "user" && (
                <li>
                  <Link to="/user-dashboard">{user.name}</Link>
                </li>
              )}
              {user.role === "admin" && (
                <li>
                  <Link to="/admin-dashboard">{user.name}</Link>
                </li>
              )}
              <li className="cursor-pointer" onClick={logout}>
                Logout
              </li>
            </>
          )}
        </menu>
      </nav>
    </header>
  );
};

export default Header;
