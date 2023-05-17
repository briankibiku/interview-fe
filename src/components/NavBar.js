import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../axiosApi'
import MyLogo from '../logo.png'

class NavBar extends Component {
  constructor() {
    super()
    this.handleLogout = this.handleLogout.bind(this)
  }

  async handleLogout() {
    try {
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('access_token')
      axiosInstance.defaults.headers['Authorization'] = null
      window.location.href='/login'
      const response = await axiosInstance.post('/api/blacklist/', {'refresh_token': localStorage.getItem('refresh_token')});
      return response
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
       <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{paddingInline: "20px"}}>
      <h4>ToDo</h4><img src={MyLogo} alt='tick' height="40" width="40" />

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
              <Link className={"nav-link"} to={"/"}>Tasks</Link>
          </li>
          <li className="nav-item">
            <Link className={"nav-link"} to={"/login/"}>Login</Link>
          </li>
          {/* <li className="nav-item">
            <Link className={"nav-link"} to={"/signup/"}>Signup</Link>
          </li> */}
          <li className="nav-item">
            <Link className={"nav-link"} onClick={this.handleLogout}>Logout</Link>
          </li>
          </ul>
      </div>
      </nav>

      </div>
    )
  }
}


export default NavBar
