import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import DealerLogin from "./pages/DealerLogin/DealerLogin";
import ClientLogin from "./pages/ClientLogin/ClientLogin";
import DealerPortal from "./pages/DealerPortal/DealerPortal";
import ClientPortal from "./pages/ClientPortal/ClientPortal";
import AddCar from "./pages/AddCar/AddCar";
function App() {
  const DealerToken = localStorage.getItem("DealerToken");
  const ClientToken = localStorage.getItem("ClientToken");
  const DealerId = localStorage.getItem("Dealer");
  return (
    <div>
      <Navbar DealerToken={DealerToken} ClientToken={ClientToken} />
      <BrowserRouter>
        <Routes>
          {!DealerToken && !ClientToken && (
            <Route exact path="/dealer/login" element={<DealerLogin />} />
          )}

          {!DealerToken && !ClientToken && (
            <Route exact path="/client/login" element={<ClientLogin />} />
          )}
          {!DealerToken && ClientToken && (
            <Route exact path="/client/portal" element={<ClientPortal />} />
          )}
          {DealerToken && !ClientToken && (
            <Route
              exact
              path="/dealer/portal"
              element={
                <DealerPortal DealerToken={DealerToken} DealerId={DealerId} />
              }
            />
          )}
          {DealerToken && !ClientToken && (
            <Route
              exact
              path="/dealer/add"
              element={<AddCar DealerToken={DealerToken} />}
            />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
