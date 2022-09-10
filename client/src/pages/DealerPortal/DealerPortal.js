import React, { useEffect, useState } from "react";
import axios from "axios";

const DealerPortal = ({ DealerToken, DealerId }) => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    const res = axios
      .post(
        "http://localhost/api/dealer/cars",
        { dealerId: DealerId },
        { headers: { authorization: DealerToken } }
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
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Model</th>
            <th scope="col">Year</th>
            <th scope="col">Price</th>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DealerPortal;
