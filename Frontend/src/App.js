import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Body from "./Components/Body/Body";
import AddPeople from "./Components/AddPeople/AddPeople";
import Joi from "joi-browser";
import Tasks from "./Components/Tasks/Tasks";
import {
  getEmployees,
  getUsers,
  deleteEmployee
} from "./services/employeeServices";
import "./App.css";
import Particles from "react-particles-js";
import { loginUser } from "./services/loginServices";
import { getSuggestions } from "./services/suggestionServices";
import { getReports } from "./services/reportServices";
import { isError } from "util";

class App extends Component {
  state = {
    bodyData: {
      id: "",
      aria: "",
      section: "Employee"
    },
    data: [],
    suggestions: [],
    reports: [],
    employee: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      role: ""
    },
    login: {
      email: "",
      password: ""
    },
    errors: {
      email: "",
      password: ""
    },
    jwt: "",
    user: false
  };
  schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  validate = () => {
    const { error } = Joi.validate(this.state.login, this.schema);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  // Get Request -- Completed
  async componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      this.setState({ jwt });
      const user = jwt_decode(jwt);
      console.log(user);
      this.setState({ user });
      if (user.role === "IT") {
        const { data } = await getUsers(jwt);
        this.setState({ data });
        console.log(this.state.data);
      } else if (user.role === "Manager") {
        const { data } = await getEmployees(jwt, user.role);
        this.setState({ data });
        const suggestions = await getSuggestions(jwt);
        console.log(suggestions.data);
        this.setState({ suggestions: suggestions.data });
        const reports = await getReports(jwt);
        console.log(reports.data);
        this.setState({ reports: reports.data });
      } else if (user.role === "HR") {
        const { data } = await getEmployees(jwt, user.role);
        this.setState({ data });
      }
    } catch (ex) {}
  }
  // Delete Request -- Completed
  handleDelete = async employee => {
    if (this.state.user.role === "IT") {
      const data = this.state.data.filter(e => e.email !== employee);
      this.setState({ data });
      await deleteEmployee(employee, this.state.jwt);
    }
  };

  handleUpdate = employee => {
    const data = [...this.state.data];
    const index = data.indexOf(employee);
    data[index] = { ...employee };
    this.setState({ employee });
    this.setState({ data });
  };

  onMouseClick = e => {
    const sec = e.target.id.split("-");
    const bodyData = { ...this.state.bodyData };
    bodyData.id = `v-pills-${sec[2]}`;
    bodyData.aria = `v-pills-${sec[2]}-tab`;
    bodyData.section = sec[2];
    this.setState({ bodyData });
  };

  handleChange = e => {
    const login = {
      ...this.state.login
    };
    login[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      login
    });
  };

  handleLogin = async e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return console.log(errors);
    const { data: jwt } = await loginUser(
      this.state.login.email,
      this.state.login.password
    );
    localStorage.setItem("token", jwt);
    console.log(jwt);
    const login = {
      email: "",
      password: ""
    };
    this.setState({
      login
    });
    window.location = "/";
  };

  handleLogOut = () => {
    localStorage.removeItem("token", this.state.jwt);
    window.location = "/";
  };

  render() {
    const user = this.state.user;
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar user={this.state.user} handleLogOut={this.handleLogOut} />
          <Route
            path="/"
            exact
            render={props => (
              <div className="parti">
                <Particles
                  className="particles"
                  params={{
                    particles: {
                      number: {
                        value: 150
                      },
                      size: {
                        value: 5
                      }
                    },
                    interactivity: {
                      events: {
                        onhover: {
                          enable: true,
                          mode: "repulse"
                        }
                      }
                    }
                  }}
                />
                {!user && (
                  <React.Fragment>
                    <h1 className="text-center pt-5"> HR Login Form </h1>
                    <div className="login">
                      <form onSubmit={this.handleLogin} className="mt-5">
                        <label htmlFor=""> Email </label>{" "}
                        <input
                          placeholder="Email"
                          className="form-control mb-3"
                          type="text"
                          id="email"
                          name="email"
                          onChange={this.handleChange}
                          value={this.state.login.email}
                          error={this.state.errors.email}
                        />
                        {this.state.errors.email && (
                          <div className="alert alert-danger">
                            {this.state.errors.email}
                          </div>
                        )}{" "}
                        <label htmlFor="email"> Password </label>{" "}
                        <input
                          placeholder="Password"
                          className="form-control mb-3"
                          type="password"
                          id="password"
                          name="password"
                          onChange={this.handleChange}
                          value={this.state.login.password}
                          error={this.state.errors.password}
                        />
                        {this.state.errors.password && (
                          <div className="alert alert-danger">
                            {this.state.errors.password}
                          </div>
                        )}{" "}
                        <button className="btn btn-warning px-4">
                          {" "}
                          Login{" "}
                        </button>{" "}
                      </form>{" "}
                    </div>
                  </React.Fragment>
                )}
                {user && (
                  <div>
                    <h1 className="text-center pt-5">Hello {user.name}</h1>
                  </div>
                )}
              </div>
            )}
          />
          <Route
            path="/profile"
            exact
            render={props => (
              <div className="container-fluid">
                <div className="row">
                  <div className="dashboard col-md-2">
                    <Dashboard
                      onClickMe={this.onMouseClick}
                      user={this.state.user}
                    />{" "}
                  </div>{" "}
                  <div className="info-body col-md-9 pl-5 ml-3">
                    <Body
                      data={this.state.data}
                      handleDelete={this.handleDelete}
                      handleUpdate={this.handleUpdate}
                      bodyInfo={this.state.bodyData}
                      user={this.state.user}
                      jwt={this.state.jwt}
                      suggestions={this.state.suggestions}
                      reports={this.state.reports}
                      {...props}
                    />{" "}
                  </div>{" "}
                </div>{" "}
              </div>
            )}
          />{" "}
          <Route
            path="/Tasks/:id"
            render={props => (
              <div className="container-fluid">
                <div className="row">
                  <div className="dashboard col-md-2">
                    <Dashboard
                      onClickMe={this.onMouseClick}
                      user={this.state.user}
                    />{" "}
                  </div>{" "}
                  <div className="info-body col-md-9 pl-5 ml-3">
                    <Tasks
                      data={this.state.data}
                      token={this.state.jwt}
                      employee={this.state.employee}
                      bodyInfo={this.state.bodyData}
                      user={this.state.user}
                      {...props}
                    />{" "}
                  </div>{" "}
                </div>{" "}
              </div>
            )}
          />
          <Route
            path="/AddPeople"
            render={props => (
              <div className="container-fluid">
                <div className="row">
                  <div className="dashboard col-md-2 ">
                    <Dashboard
                      onClickMe={this.onMouseClick}
                      user={this.state.user}
                    />{" "}
                  </div>{" "}
                  <div className="info-body col-md-9 pl-5 ml-3">
                    <AddPeople
                      bodyInfo={this.state.bodyData}
                      handleSubmitClick={this.handleSubmitClick}
                      token={this.state.jwt}
                      {...props}
                    />
                  </div>
                </div>
              </div>
            )}
          />{" "}
          <Route
            path="/Update/:id"
            render={props => (
              <div className="container-fluid">
                <div className="row">
                  <div className="dashboard col-md-2">
                    <Dashboard
                      onClickMe={this.onMouseClick}
                      user={this.state.user}
                    />{" "}
                  </div>{" "}
                  <div className="info-body" />
                  <AddPeople
                    bodyInfo={this.state.bodyData}
                    employee={this.state.employee}
                    token={this.state.jwt}
                    {...props}
                  />
                </div>
              </div>
            )}
          />{" "}
        </BrowserRouter>{" "}
      </div>
    );
  }
}

export default App;
