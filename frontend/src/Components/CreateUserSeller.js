import React, { Component } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import md5 from "md5";

const cookies = new Cookies();
export default class CreateUser extends Component {
  state = {
    CC: "",
    username: "",
    password: "",
    name: "",
    lastname: "",
    rol: "Client",
    phone: "",
  };
  onSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      CC: this.state.CC,
      username: this.state.username,
      password: md5(this.state.password),
      name: this.state.name,
      lastname: this.state.lastname,
      rol: this.state.rol,
      phone: this.state.phone,
    };
    const res = await axios.post("http://localhost:4000/users", newUser);
    console.log(res);
  };
  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="number"
          name="CC"
          placeholder="C.C"
          onChange={this.onInputChange}
        />
        <br />
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={this.onInputChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={this.onInputChange}
        />
        <br />
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={this.onInputChange}
        />
        <br />
        <input
          type="text"
          name="lastname"
          placeholder="lastname"
          onChange={this.onInputChange}
        />
        <br />
        <input
          type="text"
          name="phone"
          placeholder="phone"
          onChange={this.onInputChange}
        />
        <br />
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    );
  }
}
