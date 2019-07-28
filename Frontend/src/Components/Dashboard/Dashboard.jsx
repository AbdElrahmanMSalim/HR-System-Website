import React, { Component } from "react";
import TopLabel from "./TopLabel";
import Pills from "./Pills";
import "./Dashboard.css";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <TopLabel user={this.props.user} />
        <Pills onClickMe={this.props.onClickMe} user={this.props.user} />
      </React.Fragment>
    );
  }
}

export default Dashboard;
