import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EmailValidator, PasswordValidator } from "../../Validators";
const DealerLogin = ({}) => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const submitRequest = async () => {
    if (!email || !password) {
      setError("Please fill all the details");
      return;
    }
    if (!EmailValidator(email) || !PasswordValidator(password)) {
      setError("Invalid Details");
      return;
    }
    const res = await axios
      .post("http://localhost/api/dealer/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("DealerToken", response.data[1].token);
          localStorage.setItem("Dealer", response.data[0]._id);
          history("/dealer/portal");
          window.location.reload(false);
        }
      })
      .catch((error) => {
        setError(error.response.data.msg);
      });
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form>
              {error && (
                <div
                  class="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <strong>{error}</strong>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={() => {
                      setError("");
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
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

export default DealerLogin;
