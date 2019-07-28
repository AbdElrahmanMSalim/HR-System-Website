import http from "./httpServices";
import { apiUrl, roleEmployee } from "../config.json";

function employeeUrl(role) {
  return `${apiUrl}/role/${role}`;
}

export function getUsers(jwt) {
  return http.get(apiUrl, { headers: { "x-auth-token": jwt } });
}

export function getEmployees(jwt, role) {
  return http.get(roleEmployee, { headers: { "x-auth-token": jwt } });
}

export function getEmployee(employeeMail) {
  return http.get(employeeUrl(employeeMail));
}

export function updateEmployee(employee, mail, jwt) {
  let emp = {
    _id: employee._id,
    name: employee.name,
    email: mail,
    newMail: employee.email,
    password: employee.password,
    rePassword: employee.rePassword,
    phone: employee.phone,
    role: employee.role
  };
  return http
    .put(apiUrl, emp, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert("here");
      alert(error.response.data);
      return error.response.data;
    });
}

export function addEmployee(emp, jwt) {
  return http
    .post(apiUrl, emp, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}

export function deleteEmployee(employeeMail, jwt) {
  return http.delete(apiUrl, {
    headers: { "x-auth-token": jwt },
    data: { email: employeeMail }
  });
}
