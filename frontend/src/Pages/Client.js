import React, { Component } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

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
    const res = await axios.get(URLCredits + "/" + creditId);
    this.setState({ credit: res.data });
    console.log(this.state.credit);
  };
  componentDidMount() {
    if (cookies.get("rol") !== "Client") {
      window.location.href = "./LogIn";
    }
    this.getCredit(cookies.get("CC"));
  }
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }
  render() {
    return (
      <div
        className="container my-3"
        style={{
          display: "grid",
          justifyContent: "center",
        }}
      >
        <div
          className="card"
          style={{
            width: "70vw",
            boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.8)",
          }}
        >
          <div className="card-body">
            <h5 className="card-title" style={{ fontSize: "1.5rem" }}>
              {this.state.credit.name} {this.state.credit.lastname}
            </h5>
            <p className="card-text">CC:{this.state.credit.CC}</p>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <img
                src={this.state.credit.permissurl}
                alt="iphone"
                className="img-fluid"
              ></img>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <img
                src={this.state.credit.letterurl}
                alt="iphone-2"
                className="img-fluid"
              ></img>
            </div>
          </div>

          <ul
            className="list-group list-group-flush"
            style={{ fontSize: "1.2rem" }}
          >
            <li className="list-group-item">
              Total: {this.state.credit.total}
            </li>
            <li className="list-group-item">
              Valor de las cuotas: {this.state.credit.valueCuote}
            </li>
            <li className="list-group-item">
              Cuotas: {this.state.credit.cuotes}
            </li>
            <li className="list-group-item">
              Vendedor: {this.state.credit.sellername}
            </li>
          </ul>
        </div>
        <div>
          <button className="btn btn-danger my-4" onClick={() => this.LogOut()}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }
}
