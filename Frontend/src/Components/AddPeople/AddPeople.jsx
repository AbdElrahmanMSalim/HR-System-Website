import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import Joi from "joi-browser";
import "./AddPeople.css";
import { updateEmployee, addEmployee } from "../../services/employeeServices";

class AddPeople extends Component {
  state = {
    data: [],
    employee: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      role: ""
    },
    errors: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      role: ""
    },
    jwt: ""
  };
  schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
      .label("Username"),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
      .label("Password"),
    rePassword: Joi.string()
      .min(5)
      .max(255)
      .required()
      .label("Re-Password"),
    phone: Joi.number()
      .min(7)
      .required()
      .label("Phone"),
    role: Joi.string()
      .required()
      .valid("IT", "CEO", "HR", "Employee", "Manager")
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.employee, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      const employee = {
        name: this.props.employee.name,
        email: this.props.employee.email,
        password: this.props.employee.password,
        rePassword: this.props.employee.password,
        phone: this.props.employee.phone,
        role: this.props.employee.role
      };
      this.setState({ employee });
    } else {
      const employee = {
        name: null,
        email: null,
        password: null,
        rePassword: null,
        phone: null,
        role: this.props.bodyInfo.section
      };
      this.setState({ employee });
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return console.log(errors);
    const user = jwt_decode(this.props.token);
    if (this.props.match.params.id) {
      const employee = { ...this.state.employee };
      if (user.role === "IT") {
        console.log("update");
        console.log(this.state.employee);
        const err = await updateEmployee(
          employee,
          this.props.employee.email,
          this.props.token
        );
        if (!err) {
          this.setState({ employee });
          window.location = "/profile";
        }
      }
    } else {
      if (user.role === "IT") {
        const err = await addEmployee(this.state.employee, this.state.jwt);
        if (!err) {
          const employee = {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
            role: ""
          };
          window.location = "/profile";
          this.setState({ employee });
        }
      }
    }
  };

  handleChange = e => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    const employee = { ...this.state.employee };
    employee[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ employee, errors });
  };

  render() {
    const bodyInfo = this.props.bodyInfo;
    return (
      <div className="add-people col-md-9 pl-5">
        <h1 className="text-center pt-5">{bodyInfo.section} Section</h1>

        <form onSubmit={this.handleSubmit} className="mt-5">
          <label htmlFor="">{bodyInfo.section} Username</label>
          <input
            placeholder="Username"
            className="form-control mb-3"
            type="text"
            id="username"
            name="name"
            onChange={this.handleChange}
            value={this.state.employee.name}
            error={this.state.errors.name}
          />
          {this.state.errors.name && (
            <div className="alert  alert-danger">{this.state.errors.name}</div>
          )}
          <label htmlFor="email">{bodyInfo.section} Email</label>
          <input
            placeholder="Email"
            className="form-control mb-3"
            type="text"
            id="email"
            name="email"
            onChange={this.handleChange}
            value={this.state.employee.email}
            error={this.state.errors.email}
          />
          {this.state.errors.email && (
            <div className="alert alert-danger">{this.state.errors.email}</div>
          )}
          <label htmlFor="password">{bodyInfo.section} Password</label>
          <input
            placeholder="Password"
            className="form-control mb-3"
            type="password"
            id="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.employee.password}
            error={this.state.errors.password}
          />
          {this.state.errors.password && (
            <div className="alert alert-danger">
              {this.state.errors.password}
            </div>
          )}
          <label htmlFor="rePassword">Re-Password</label>
          <input
            placeholder="Re-Password"
            className="form-control mb-3"
            type="password"
            id="rePassword"
            name="rePassword"
            onChange={this.handleChange}
            value={this.state.employee.rePassword}
            error={this.state.errors.rePassword}
          />
          {this.state.errors.rePassword && (
            <div className="alert alert-danger">
              {this.state.errors.rePassword}
            </div>
          )}
          <label htmlFor="phone">Phone</label>
          <input
            placeholder="Phone"
            className="form-control mb-3"
            type="number"
            id="phone"
            name="phone"
            onChange={this.handleChange}
            value={this.state.employee.phone}
            error={this.state.errors.phone}
          />
          {this.state.errors.phone && (
            <div className="alert alert-danger">{this.state.errors.phone}</div>
          )}
          <label htmlFor="phone">Role</label>
          <input
            placeholder="Role"
            className="form-control mb-3"
            type="text"
            id="role"
            name="role"
            onChange={this.handleChange}
            value={this.state.employee.role}
            error={this.state.errors.role}
          />
          {this.state.errors.role && (
            <div className="alert alert-danger">{this.state.errors.role}</div>
          )}
          <button className="btn btn-warning px-4">Submit</button>
        </form>
      </div>
    );
  }
}

export default AddPeople;
