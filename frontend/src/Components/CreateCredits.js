import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import axios, { AxiosError } from "axios";
import { uploadFile } from "../Firebase/Config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();
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
const notifyError = () =>
  toast.toast.error("🙁 Parece que hay un problema!", {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

export default class Credits extends Component {
  state = {
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
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const letterurl = await uploadFile(this.state.letterurl);
    const permissurl = await uploadFile(this.state.permissurl);
    const newCredit = {
      CC: this.state.CC,
      name: this.state.name,
      lastname: this.state.lastname,
      letterurl: letterurl,
      permissurl: permissurl,
      credit: "",
      total: this.state.total,
      valueCuote: this.state.valueCuote,
      cuotes: this.state.cuotes,
      sellername: cookies.get("username"),
      contactsell: cookies.get("phone"),
    };

    const res = await axios.post("http://localhost:4000/credits", newCredit)
      console.log(res)

    if (res.status == 200) {
      console.log(res.status);
      notifySuccess();
    }else{
      notifyError();
    }

    this.setState({
      CC: "",
      name: "",
      lastname: "",
      letterurl: "",
      permissurl: "",
      total: 0,
      valueCuote: 0,
      cuotes: 0,
    });
  };
  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleUrl = (urlFile) => {
    console.log(urlFile);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="number"
            name="CC"
            placeholder="C.C"
            onChange={this.onInputChange}
            required
          />
          <br />
          <input
            type="text"
            name="name"
            placeholder="nombre"
            onChange={this.onInputChange}
            required
          />
          <br />
          <input
            type="text"
            name="lastname"
            placeholder="Apellido"
            onChange={this.onInputChange}
            required
          />
          <br />
          <input
            type="file"
            placeholder="Permiss"
            name="permissurl"
            onChange={(e) => this.setState({ permissurl: e.target.files[0] })}
            required
          />
          <br />
          <input
            type="file"
            placeholder="Letter"
            name="letterurl"
            onChange={(e) => {
              this.setState({ letterurl: e.target.files[0] });
            }}
            required
          />
          <br />
          <input
            type="number"
            name="total"
            placeholder="Total"
            onChange={this.onInputChange}
            required
          />
          <br />
          <input
            type="number"
            name="valueCuote"
            placeholder="Total Cuota"
            onChange={this.onInputChange}
            required
          />
          <br />
          <input
            type="number"
            name="cuotes"
            placeholder="Cuotas"
            onChange={this.onInputChange}
            required
          />
          <br />
          <br />
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
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
