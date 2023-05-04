import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default class Client extends Component {
  LogOut = () => {
    cookies.remove("CC", { path: "/" });
    cookies.remove("name", { path: "/" });
    cookies.remove("lastname", { path: "/" });
    cookies.remove("phone", { path: "/" });
    cookies.remove("rol", { path: "/" });
    cookies.remove("username", { path: "/" });
    window.location.href = "./LogIn";
  };
  componentDidMount() {
    if (cookies.get("rol") != "Client") {
      window.location.href = "./LogIn";
    }
  }
  render() {
    return (
      <div>
        <button className="btn btn-danger" onClick={() => this.LogOut()}>
          Cerrar Sesión
        </button>
      </div>
    );
  }
}
