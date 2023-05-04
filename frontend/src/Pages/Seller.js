import React, { Component } from "react";
import CreateUser from "../Components/CreateUserSeller";
import Cookies from "universal-cookie";
import CreateCredit from "../Components/CreateCredits";
import axios from "axios";

const cookies = new Cookies();
const URLCredits = "http://localhost:4000/credits";

export default class Seller extends Component {
  state = {
    credits: [],
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
  getCredits = async () => {
    const res = await axios.get(URLCredits);
    this.setState({ credits: res.data });
  };
  componentDidMount() {
    if (cookies.get("rol") != "Seller") {
      window.location.href = "./LogIn";
    }
    this.getCredits();
  }
  deleteCredit = async (creditId) => {
    await axios.delete(URLCredits + creditId);
    this.getCredits();
  };
  renderCredit = () => {
    const arrCredit = this.state.credits.filter(
      (credit) => credit.sellername == cookies.get("username")
    );
    console.log(arrCredit);
    return arrCredit.map((credit) => (
      <div className="card" key={credit.CC}>
        <div className="card-body">
          <h5 className="card-title fs-2 text">
            {credit.name + " " + credit.lastname}
          </h5>
          <p className="card-text fs-5 text">CC: {credit.CC}</p>
        </div>
        <div className="container d-flex justify-content-between flex-wrap">
          <img
            src={credit.letterurl}
            className="card-img-top img-fluid"
            alt="..."
            onChange={(e) => this.setState({ letter: e.target.files[0] })}
          />
          <img
            src={credit.permissurl}
            className="card-img-top img-fluid"
            alt="..."
            onChange={(e) => this.setState({ permiss: e.target.files[0] })}
          />
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Total: ${credit.total}</li>
          <li className="list-group-item">
            Valor de Cuota: ${credit.valueCuote}
          </li>
          <li className="list-group-item">Cuotas: {credit.cuotes}</li>
        </ul>
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <p>{credit.sellername}</p>
            <p>Contacto: {credit.contactsell}</p>
          </div>
          <div>
            <button
              className="btn btn-danger"
              onClick={() => this.deleteCredit(credit._id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    ));
  };
  render() {
    return (
      <div>
        <CreateUser />
        <br />
        <br />
        <CreateCredit />
        <br />
        <br />
        <button onClick={() => this.renderCredit()}>Hola</button>
        <br />
        <br />
        {this.renderCredit()}
        <button className="btn btn-danger" onClick={() => this.LogOut()}>
          Cerrar Sesión
        </button>
      </div>
    );
  }
}
