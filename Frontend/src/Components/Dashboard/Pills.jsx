import React from "react";
import "./Pills.css";
import { Link } from "react-router-dom";

const Pills = props => {
  const userRole = props.user.role;
  return (
    <div className="pill pt-3">
      {userRole === "IT" && (
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <Link
            className="nav-link"
            id="v-pills-Employee-tab"
            to="/profile"
            onClick={props.onClickMe}
          >
            Employee
          </Link>
          <Link
            className="nav-link"
            id="v-pills-Manager-tab"
            to="/profile"
            onClick={props.onClickMe}
          >
            Manager
          </Link>
          <Link
            className="nav-link"
            id="v-pills-HR-tab"
            to="/profile"
            onClick={props.onClickMe}
          >
            HR
          </Link>
          <Link
            className="nav-link"
            id="v-pills-IT-tab"
            to="/profile"
            onClick={props.onClickMe}
          >
            IT
          </Link>
        </div>
      )}
      {userRole === "Manager" && (
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <Link
            className="nav-link"
            id="v-pills-Employee-tab"
            to="/profile"
            onClick={props.onClickMe}
          >
            Employee
          </Link>

          <Link
            className="nav-link"
            id="v-pills-Analysis-tab"
            to="/profile"
            onClick={props.onClickMe}
          >
            Analysis
          </Link>
          <Link
            className="nav-link"
            id="v-pills-Suggestions-tab"
            to="/profile"
            onClick={props.onClickMe}
          >
            Suggestions
          </Link>
          <Link
            className="nav-link"
            id="v-pills-Reports-tab"
            to="/profile"
            onClick={props.onClickMe}
          >
            Reports
          </Link>
        </div>
      )}
      {userRole === "HR" && (
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <Link
            className="nav-link"
            id="v-pills-Employee-tab"
            to="/profile"
            onClick={props.onClickMe}
          >
            Employee
          </Link>
          <Link
            className="nav-link"
            id="v-pills-Analysis-tab"
            to="/profile"
            onClick={props.onClickMe}
          >
            Analysis
          </Link>
          <Link
            className="nav-link"
            id="v-pills-Suggestions-tab"
            to="/profile"
            onClick={props.onClickMe}
          >
            Suggestions
          </Link>
          <Link
            className="nav-link"
            id="v-pills-Reports-tab"
            to="/profile"
            onClick={props.onClickMe}
          >
            Reports
          </Link>
        </div>
      )}
      {userRole === "Employee" && (
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <Link
            className="nav-link"
            id="v-pills-Your Tasks-tab"
            to={`/Tasks/${props.user._id}`}
            onClick={props.onClickMe}
          >
            Your Tasks
          </Link>
        </div>
      )}
    </div>
  );
};

export default Pills;
