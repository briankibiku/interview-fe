import React , { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Tasks from "./components/Tasks";
import Navbar  from './components/NavBar';


class App extends Component {
  render () {
    return (
      <>
      <Router >
        <Navbar />
        <Routes>
            <Route path="/login/" element={<Login/>}/>
            <Route path="/signup/" element={<Signup/>}/>
            <Route path="/tasks/" element={<Tasks/>}/>
            <Route path="/" element={<Tasks/>}/>
        </Routes>
      </Router>
      </>
    )
  }
}

export default App;
