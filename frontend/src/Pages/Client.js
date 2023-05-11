import React, { Component } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();
const URLCredits = "http://localhost:4000/credits";
export default class Client extends Component {
  state = {
    credit: {
      CC: "",
      name: "",
      lastname: "",
      letterurl: "",
      permissurl: "",
      total: 0,
      valueCuote: 0,
      cuotes: 0,
      sellername: "",
      contactsell: "",
    },
  };
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
    this.setState({ credit: res.data });
    console.log(res);
    //console.log(this.state.credit);
  };
  componentDidMount() {
    if (cookies.get("rol") != "Client") {
      window.location.href = "./LogIn";
    }
<<<<<<< HEAD
    console.log(cookies.get("CC"));
    this.getCredit(cookies.get("CC"));
=======
    this.getCredit(cookies.get('CC'))
>>>>>>> 5b573b105979e632718a28398529bd38436aa035
  }
  //<h1>{this.state.credit.CC}</h1>
  //<img src={this.state.credit.letterurl}></img>
  render() {
    return (
      <div>
        <div className="title-client"></div>
        <div>
          <button className="btn btn-danger" onClick={() => this.LogOut()}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }
}
