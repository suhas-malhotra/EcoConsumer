import React, { useEffect, useState } from "react";
import axios from "axios";
import Congrats from "../../components/Congrats/Congrats";
const ClientPortal = ({ ClientToken }) => {
  const [cars, setCars] = useState([]);
  const [dealerName, setDealerName] = useState("");
  const purchaseCar = (carId) => {
    const clientId = localStorage.getItem("Client");
    const res = axios
      .post(
        "http://localhost/api/user/accept",
        { clientId, carId },
        { headers: { authorization: ClientToken } }
      )
      .then((response) => {
        if (response.status === 200) {
          setDealerName(response.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    const res = axios
      .post(
        "http://localhost/api/user/all/cars",

        { headers: { authorization: ClientToken } }
      )
      .then((response) => {
        if (response.status === 200) {
          setCars(response.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  return (
    <div>
      {dealerName && <Congrats DealerName={dealerName} />}
      {!dealerName && (
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Model</th>
              <th scope="col">Year</th>
              <th scope="col">Price</th>
              <th scope="col">Purchase</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => {
              return (
                <tr>
                  <th>{car.name}</th>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td>{car.price}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        purchaseCar(car._id);
                      }}
                    >
                      BUY IT
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientPortal;
