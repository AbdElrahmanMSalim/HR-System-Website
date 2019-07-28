import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
  state = {};
  render() {
    const user = this.props.user;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <Link className="navbar-brand" to="/">
          Phoenix HR System
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {!user && (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/profile">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
            </ul>
          )}
          {user && (
            <ul className="navbar-nav mr-auto">
              <li>
                {user.role !== "Employee" && (
                  <Link className="nav-link" to="/profile">
                    Profile <span className="sr-only">(current)</span>
                  </Link>
                )}
                {user.role === "Employee" && (
                  <Link className="nav-link" to={`/Tasks/${user._id}`}>
                    Profile <span className="sr-only">(current)</span>
                  </Link>
                )}
              </li>
              <li>
                <Link onClick={this.props.handleLogOut} className="nav-link">
                  Logout <span className="sr-only">(current)</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

export default Navbar;
