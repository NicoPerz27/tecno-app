import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/js/bootstrap.esm";
import { ToastContainer, toast } from "react-toastify";
import CreditComponent from "../Components/CreateCredits";
import UserComponent from "../Components/CreateUserAdmin";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();
const URLCredits = "http://localhost:4000/credits";
const URLUsers = "http://localhost:4000/users";
const notifySuccess = () =>
  toast.success("😎 Ok! Credito Guardado!!", {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

export default class Admin extends Component {
  state = {
    credits: [],
    users: [],
    permiss: "",
    letter: "",
    newCuotes: "",
    totalCredits: "",
    totalUsers: "",
    totalSellers: "",
    idUpdate: "",
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
  deleteCredit = async (creditId) => {
    await axios.delete(URLCredits + "/" + creditId);
    this.getCredits();
    console.log(creditId);
  };
  deleteUser = async (userId) => {
    await axios.delete(URLUsers + "/" + userId);
    console.log(userId);
    this.getUsers()
  };
  updateCredit = async () => {
    const newCuote = {
      cuotes: this.state.newCuotes,
    };

    const res = await axios.patch(
      URLCredits + "/" + this.state.idUpdate,
      newCuote
    );
    if (res.status == 200) {
      notifySuccess();
    }
    this.getCredits();
  };
  getCredits = async () => {
    const res = await axios.get(URLCredits);
    this.setState({ credits: res.data });
    this.setState({ totalCredits: res.data.length });
  };
  getUsers = async () => {
    const res = await axios.get(URLUsers);
    this.setState({ users: res.data });
    this.setState({ totalUsers: res.data.length });
    const arrLength = [];
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].rol == "Seller") {
        arrLength.push(res.data[i]);
      }
    }
    this.setState({ totalSellers: arrLength.length });
  };
  async componentDidMount() {
    if (cookies.get("rol") != "Admin") {
      window.location.href = "./LogIn";
    }
    this.getCredits();
    this.getUsers();
  }
  countCreditsSeller = (Username) =>{
    const arrCount = this.state.credits.filter(credit => credit.sellername == Username)
    const total = arrCount.length
    return total
  }
  render() {
    return (
      <div className="container-lg mt-2">
        <nav className="navbar bg-light">
          <div className="container-fluid">
            <h1 className="navbar-brand mb-0 h1 fs-2 fw-semibold">
              {cookies.get("name") + " " + cookies.get("lastname")}
            </h1>
            <ul className="nav justify-content-center">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      type="button"
                      className="dropdown-item mb-1"
                      data-bs-toggle="modal"
                      data-bs-target="#CreditModal"
                    >
                      Crear Credito
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item mb-1"
                      data-bs-toggle="modal"
                      data-bs-target="#UserModal"
                    >
                      Crear Usuario
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
            <button className="btn btn-danger" onClick={() => this.LogOut()}>
              Cerrar Sesión
            </button>
          </div>
        </nav>
        <div
          className="modal fade"
          id="CreditModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Crear Credito
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <CreditComponent />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="UserModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Crear Usuario
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <UserComponent />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-3">
          <h2>Estadisticas</h2>
          <div className="d-flex justify-content-around mt-3">
            <div className="card w-25">
              <div className="card-header">
                <h3>Creditos Activos</h3>
              </div>
              <div className="card-body d-flex justify-content-center">
                <h2>{this.state.totalCredits}</h2>
              </div>
            </div>
            <div className="card w-25">
              <div className="card-header">
                <h3>Perfiles Activos</h3>
              </div>
              <div className="card-body d-flex justify-content-center">
                <h2>{this.state.totalUsers}</h2>
              </div>
            </div>
            <div className="card w-25">
              <div className="card-header">
                <h3>Vendedores Activos</h3>
              </div>
              <div className="card-body d-flex justify-content-center">
                <h2>{this.state.totalSellers}</h2>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="d-flex justify-content-between">
          <div className="w-50 ms-5">
            <div className="d-flex justify-content-center">
              <h2>Creditos</h2>
            </div>
            {this.state.credits.map((credit) => (
              <div className="card mt-3" key={credit.CC}>
                <div className="card-body">
                  <h5 className="card-title fs-2 text">
                    {credit.name + " " + credit.lastname}
                  </h5>
                  <p className="card-text fs-5 text">CC: {credit.CC}</p>
                </div>
                <div className="container d-flex justify-content-between flex-wrap">
                  <img
                    src={credit.letterurl}
                    className="card-img-top img-fluid w-50"
                    alt="..."
                    onChange={(e) =>
                      this.setState({ letter: e.target.files[0] })
                    }
                  />
                  <img
                    src={credit.permissurl}
                    className="card-img-top img-fluid w-50"
                    alt="..."
                    onChange={(e) =>
                      this.setState({ permiss: e.target.files[0] })
                    }
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
                      type="button"
                      className="btn btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => this.setState({ idUpdate: credit._id })}
                    >
                      Editar
                    </button>
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="exampleModalLabel"
                            >
                              Ingrese la cantidad de cuotas
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <input
                              type="number"
                              name="cuote"
                              id={credit._id}
                              onChange={(e) => {
                                this.setState({ newCuotes: e.target.value });
                              }}
                            />
                          </div>
                          <div className="modal-footer">
                            <button
                              type="buton"
                              className="btn btn-outline-success"
                              onClick={() => this.updateCredit()}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteCredit(credit._id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <br />
          </div>
          <div className="w-50 ms-5">
            <div className="d-flex justify-content-center">
              <h2>Perfiles</h2>
            </div>
            {this.state.users.map((User) => (
              <div className="card mt-3">
                <div className="card-body">
                  <h5 className="card-title fs-2">
                    {User.name} {User.lastname}
                  </h5>
                  <h6 className="card-subtitle mb-3 text-muted fs-5">
                    CC: {User.CC}
                  </h6>
                  <p className="card-text fs-5 mb-0">Username: {User.username}</p>
                  <p className="card-text fs-5 mb-0">Rol: {User.rol}</p>
                  <p className="card-text fs-5 mb-3">Telefono: {User.phone}</p>
                  <div className="d-flex justify-content-between ">
                    <p className="card-text text-muted">{this.countCreditsSeller(User.username)}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteUser(User._id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <br />
        <br />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    );
  }
}
