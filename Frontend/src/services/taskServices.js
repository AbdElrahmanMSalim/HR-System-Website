import http from "./httpServices";
import { taskUrl } from "../config.json";

function Taskurl(id) {
  return `${taskUrl}/${id}`;
}
function Statusurl(id) {
  return `${taskUrl}/status/${id}`;
}
function Evaluationurl(id) {
  return `${taskUrl}/evaluate/${id}`;
}

export function getTasks(empID, jwt) {
  return http.get(Taskurl(empID), { headers: { "x-auth-token": jwt } });
}

export function addTask(task, jwt) {
  return http
    .post(taskUrl, task, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}

export function updateStatus(task, jwt) {
  const Task = {
    status: task.status
  };
  return http
    .put(Statusurl(task._id), Task, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}

export function updateEvaluation(task, jwt) {
  console.log(task);
  const Task = {
    evaluation: task.evaluation
  };
  return http
    .put(Evaluationurl(task._id), Task, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}
