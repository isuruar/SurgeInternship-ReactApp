import React, { Component } from "react";
import {Link} from "react-router-dom";

export default class Nav extends Component {
    render() {
        return (
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid mx-5">
              <Link class="navbar-brand" to={"/"}>
                surge
              </Link>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                  <li class="nav-item">
                    <Link class="nav-link" to={"/login"}>
                      Login
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to={"/register"}>
                      Registration
                    </Link>
                  </li>
          
                </ul>
              </div>
            </div>
          </nav>
        );
    }
}
