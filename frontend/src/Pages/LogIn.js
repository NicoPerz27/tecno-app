import React, { Component } from "react";
import "../Styles/LogIn.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const URL = "http://localhost:4000/users";
export default class LogIn extends Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = async (e) => {
    await this.setState({
      ...this.state.form,
      [e.target.name]: e.target.value,
    });
  };

  logIn = async () => {
    await axios
      .get(URL, {
        params: {
          username: this.state.username,
          password: md5(this.state.password),
        },
      })
      .then((Response) => {
        return Response.data;
      })
      .then((Response) => {
        if (Response.length > 0) {
          var res = Response;
          for (var i = 0; i < 10000; i++) {
            var obj = res.find((el) => el.username == this.state.username);
          }
          if (obj && obj.password == md5(this.state.password)) {
            cookies.set("CC", obj.CC, { path: "/" });
            cookies.set("name", obj.name, { path: "/" });
            cookies.set("lastname", obj.lastname, { path: "/" });
            cookies.set("phone", obj.phone, { path: "/" });
            cookies.set("rol", obj.rol, { path: "/" });
            cookies.set("username", obj.username, { path: "/" });
            cookies.set("phone", obj.phone, { path: "/" });
            alert("Bienvenido " + obj.name + " " + obj.lastname);
          } else {
            alert("Usuario o contraseña incorrectos");
            obj = null;
          }
          if (cookies.get("rol") == "Admin") {
            window.location.href = "./Admin";
          }
          if (cookies.get("rol") == "Seller") {
            window.location.href = "./Seller";
          }
          if (cookies.get("rol") == "Client") {
            window.location.href = "./Client";
          }
        }
      })
      .catch((Error) => {
        console.error(Error);
      });
  };
  componentDidMount() {
    cookies.remove("rol", { path: "/" });
  }
  render() {
    return (
      <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={this.handleChange}
            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleChange}
            />
            <br />
            <button className="btn btn-primary" onClick={() => this.logIn()}>
              Log-In
            </button>
          </div>
        </div>
      </div>
    );
  }
}
