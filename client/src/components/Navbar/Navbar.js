import React from "react";

const Navbar = ({ DealerToken, ClientToken }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href>
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href>
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href>
                Contact Us
              </a>
            </li>
            {!DealerToken && !ClientToken && (
              <li className="nav-item">
                <a className="nav-link btn btn-success" href="/client/login">
                  Client Login
                </a>
              </li>
            )}
            {!DealerToken && !ClientToken && (
              <li className="nav-item pl-2">
                <a className="nav-link btn btn-success" href="/dealer/login">
                  Dealer Login
                </a>
              </li>
            )}
            {DealerToken && (
              <li className="nav-item pl-2">
                <a className="nav-link btn btn-success" href="/dealer/portal">
                  Dealer Portal
                </a>
              </li>
            )}
            {DealerToken && (
              <li className="nav-item pl-2">
                <a className="nav-link btn btn-success" href="/dealer/add">
                  Add a Car
                </a>
              </li>
            )}
            {DealerToken && (
              <li className="nav-item pl-2">
                <button
                  className="nav-link btn btn-success"
                  onClick={() => {
                    localStorage.clear("DealerToken");
                    window.location.reload("/");
                    window.open("/", "_self");
                  }}
                >
                  Logout
                </button>
              </li>
            )}
            {ClientToken && (
              <li className="nav-item pl-2">
                <a className="nav-link btn btn-success" href="/client/portal">
                  Client Portal
                </a>
              </li>
            )}
            {ClientToken && (
              <li className="nav-item pl-2">
                <button
                  className="nav-link btn btn-success"
                  onClick={() => {
                    localStorage.clear("ClientToken");
                    window.location.reload("/");
                    window.open("/", "_self");
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
