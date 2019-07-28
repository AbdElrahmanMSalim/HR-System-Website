import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import {
  updateStatus,
  updateEvaluation,
  addTask,
  getTasks
} from "../../services/taskServices";
import { getEmployee } from "../../services/employeeServices";
import "./Tasks.css";

class Taskes extends Component {
  state = {
    tasks: [],
    employee: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      role: ""
    },
    task: {
      task: "",
      evaluation: 0,
      status: ""
    },
    show: false,
    jwt: ""
  };

  async componentDidMount() {
    /*
    const { employee } = await getEmployee(
      this.props.match.params.id,
      this.props.token
    );*/
    try {
      //console.log(this.props.match.params.id);
      const jwt = localStorage.getItem("token");
      this.setState({ jwt });
      const tasks = await getTasks(this.props.match.params.id, jwt);
      console.log(tasks.data);

      this.setState({ tasks: tasks.data });
    } catch (ex) {}
  }

  handleChange = e => {
    const task = { ...this.state.task };
    task[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ task });
  };
  addTask = () => {
    let show = this.state.show;
    console.log(show);
    if (show) show = false;
    else show = true;
    this.setState({ show });
  };
  handleSubmit = async e => {
    e.preventDefault();
    let tasks = { ...this.state.tasks };
    const task = {
      task: this.state.task.task,
      employeeId: this.props.match.params.id,
      managerId: this.props.user._id
    };
    await addTask(task, this.props.token);
    task.status = "NotDone";
    tasks = [task, ...this.state.tasks];
    this.setState({ task, tasks });
    window.location = `/Tasks/${this.props.match.params.id}`;
  };
  handleStatus = async task => {
    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(task);
    let statusType = { ...this.state.statusType };
    if (task.status === "Done") {
      task.status = "NotDone";
    } else {
      task.status = "Done";
    }
    console.log(task);
    await updateStatus(task, this.state.jwt);
    tasks[index] = { ...task };
    this.setState({ tasks, task, statusType });
  };

  handleDelete = async taskId => {
    const tasks = this.state.tasks.filter(e => e._id !== taskId);
    //await deleteTask(taskId, this.props.jwt);
    this.setState({ tasks });
  };

  changeRating = async (newRating, task) => {
    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(task);
    task.evaluation = newRating;
    console.log(task);
    await updateEvaluation(task, this.state.jwt);
    tasks[index] = { ...task };
    this.setState({ tasks, task });
  };
  render() {
    const { employee, user } = this.props;
    return (
      <React.Fragment>
        <div className="body-section">
          <div className="section-title pl-4">
            <h1 className="text-center pt-5 pb-3">{employee.name} Tasks</h1>
          </div>
          {user.role == "Manager" && (
            <button
              onClick={() => this.addTask()}
              className="add-task btn btn-warning "
            >
              Add Task
            </button>
          )}
          <form onSubmit={this.handleSubmit} className="tasks-form mt-2">
            {this.state.show && (
              <input
                style={{ maxWidth: "950px" }}
                placeholder="task description"
                className="form-control my-2 mr-3"
                type="text"
                id="task"
                name="task"
                onChange={this.handleChange}
                value={this.state.task.task}
              />
            )}
            {this.state.show && (
              <button className="btn btn-warning add_button">Add</button>
            )}
          </form>
          <div className="table-area pt-2">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Task</th>
                  <th scope="col">Status</th>
                  <th scope="col">Rating</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tasks.map(
                  item =>
                    item.employeeId === this.props.match.params.id && (
                      <tr key={item._id}>
                        <td>{item.task}</td>
                        <td>
                          {user.role === "Manager" && (
                            <button
                              onClick={() => this.handleStatus(item)}
                              className={`btn ${item.status} btn-sm`}
                            >
                              {item.status}
                            </button>
                          )}
                          {(user.role == "HR" || user.role == "Employee") && (
                            <button
                              className={`btn disabled ${item.status} btn-sm`}
                            >
                              {item.status}
                            </button>
                          )}
                        </td>
                        <td>
                          {user.role === "HR" && (
                            <StarRatings
                              rating={item.evaluation}
                              starRatedColor="#17a2b8"
                              changeRating={this.changeRating}
                              name={item}
                              starSpacing="0px"
                              starDimension="20px"
                              numberOfStars={5}
                            />
                          )}
                          {user.role != "HR" && (
                            <StarRatings
                              rating={item.evaluation}
                              starRatedColor="#17a2b8"
                              starSpacing="0px"
                              starDimension="20px"
                              numberOfStars={5}
                              name="rating"
                            />
                          )}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Taskes;
