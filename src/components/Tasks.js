import React , { Component } from 'react'
import Modal from './Modal'
import axiosInstance from '../axiosApi'


class Tasks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },

      // this list stores all the completed tasks
      taskList: []
    }
  }
  // Add componentDidMount()
  componentDidMount() {
    this.refreshList();
  }
  // `tasks/`
  refreshList = () => {
    // axios.get("http://localhost:8000/api/tasks/").then(res => this.setState({ taskList: res.data }))
    axiosInstance.get(`/todos/tasks/`).then(res => this.setState({ taskList: res.data }))
    .catch(err => console.log(err));
  }

  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  // this array function renders two spans that help control
  // the set of items to be displayed(ie, completed or incomplete)
  renderTabList = () => {
    return (
      <div className="my-3 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          completed
            </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
            </span>
      </div>
    );
  };
  // Main variable to render items on the screen
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      (item) => item.completed === viewCompleted
    );
    return (

      <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Task</th>
          <th scope="col">Description</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          newItems.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <span>
                  <button
                    onClick={() => this.editItem(item)}
                    className="btn btn-secondary m-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => this.handleDelete(item)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </span>
            </td>
              {/* <td>
                  <button
                    onClick={() => this.editItem(item)}
                    className="btn btn-secondary m-2"
                  >
                    Edit
                  </button>
            </td> */}
            </tr>

          ))
        }
      </tbody>
    </table>
    );
  };

  toggle = () => {
    //add this after modal creation
    this.setState({ modal: !this.state.modal });
  };

  today = () => {
    const date = new Date()
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleString('en-IN', options)
  }


  // Submit an item
  handleSubmit = (item) => {
    this.toggle();
     alert("save" + JSON.stringify(item));
    if (item.id) {
      // if old post to edit and submit
      axiosInstance
        .put(`/todos/tasks/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    // if new post to submit
    axiosInstance
      .post(`/todos/tasks/`, item)
      .then((res) => this.refreshList());
  };
  // Delete item
  handleDelete = (item) => {
    alert("delete" + JSON.stringify(item));
  axiosInstance
    .delete(`/todos/tasks/${item.id}/`)
    .then((res) => this.refreshList());
  };

  // Create item
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  //Edit item
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };


  render () {
    return (
      <main className='m-5'>
        <h5 className="text-success text-uppercase  my-4">
          Welcome to Tick Task Manager || <span style={{color: 'brown'}}>Today:  {this.today()}</span>
        </h5>
        <div className="d-flex justify-content-between m-1">
          <h4>Task Board</h4>
          <button onClick={this.createItem} className="btn btn-primary">
            Create task
          </button>
        </div>
        <div className="row">
          <div className="col-md-12 col-sm-10">
            <div className="card p-3">
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    )
  }
}

export default Tasks;
