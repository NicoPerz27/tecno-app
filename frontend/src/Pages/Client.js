import React, { Component } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();
const URLCredits = "http://localhost:4000/credits";
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
  getCredit = async (creditId) => {
    console.log(creditId)
    const res = await axios.get(URLCredits + "/" + creditId);
    console.log(res);
  };
  componentDidMount() {
    if (cookies.get("rol") != "Client") {
      window.location.href = "./LogIn";
    }
    this.getCredit(cookies.get('CC'))
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
