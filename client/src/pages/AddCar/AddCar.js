import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddCar = ({ DealerToken }) => {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [dealer, setDealer] = useState("");

  const submitRequest = async () => {
    const id = localStorage.getItem("Dealer");
    setDealer(id);
    if (!name || !model || !year || !price || !dealer) {
      return;
    }

    const res = await axios
      .post(
        "http://localhost/api/dealer/add/car",
        {
          name,
          model,
          year,
          price,
          dealer,
        },
        { headers: { authorization: DealerToken } }
      )
      .then((response) => {
        if (response.status === 200) {
          history("/dealer/portal");
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
                <label for="exampleInputEmail1">Car Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    e.preventDefault();
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">year</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    e.preventDefault();
                    setYear(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    e.preventDefault();
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Model</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    e.preventDefault();
                    setModel(e.target.value);
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

export default AddCar;
