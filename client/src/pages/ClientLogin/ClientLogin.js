import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ClientLogin = ({}) => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitRequest = async () => {
    const res = await axios
      .post("http://localhost/api/user/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("ClientToken", response.data[1].token);
          localStorage.setItem("Client", response.data[0]);
          history("/client/portal");
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <div>
      <div classNameName="container">
        <div classNameName="row">
          <div classNameName="col-12">
            <form>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    e.preventDefault();
                    setEmail(e.target.value);
                  }}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    e.preventDefault();
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  submitRequest();
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;
