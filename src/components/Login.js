import React, { Component } from "react";
import axiosInstance from "../axiosApi";
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {username: "", password: "", loginError: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            await axiosInstance.post('/api/obtain/', {
                username: this.state.username,
                password: this.state.password
            }).then((response) => {
                console.log(response)
                axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                window.location.href='/'
            })

        } catch (error) {
            this.setState({loginError: "There was an error while logging in, please try again."})
            console.log(this.state.loginError)
            throw error;
        }
    }

    render() {
        return (
            <div className="container">

        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto m-5">
            <div className="card p-3">
                <form onSubmit={this.handleSubmit}>
                    <h3>Sign In</h3>
                    <div className="mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Enter username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    </div>
                    <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    </div>
                    <div className="d-grid">
                    <p style={{color: 'red'}}>{this.state.loginError}</p>
                    <button type="submit" value="Submit" className="btn btn-primary">
                        Sign In
                    </button>
                    </div>
                </form>

                    </div>
                </div>
                </div>
            </div>
        )
    }
}
export default Login;