import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//TODO: Click SY to searchUser as SY

const Navbar = ({ icon, title, searchUser }) => {
  console.log(icon);
  console.log(title);
  //searchUser.c;

  return (
    <nav className="navbar bg-primary">
      <Link to="/">
        <h1>
          <i className={icon} />
          {"         "}
          <button
            className="btn btn-link"
            onClick={(e) => {
              searchUser("esswhye");
            }}
          >
            {title}
          </button>
        </h1>
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired, //
};

export default Navbar;
