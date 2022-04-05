import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Col, Collapse, Container, Table } from "reactstrap";
import { Link } from "react-router-dom";
import landing_cover from "../../img/landing_cover.png";

class LandingPage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <main role="main" class="container">
          <div className="row" id="landing-content">
            <div className="col-12 col-md-5">
              <h1 id="title">Mentor-Connect</h1>
              <section id="about">
                <p>
                  Do you need some one-on-one guidance on how to grow in your
                  career? Or are you curious about learning different trending tech skills?
                </p>
                <p>
                  Are you a passionate mentor or academic professional who
                  loves to guide and help students learn industry relevant skills?
                </p>
                <p>
                  Join Mentor-Connect - the voluntary mentoring platform and
                  participate in one-on-one sessions about anything that'll help you gain insights in different career and learning opportunities!
                </p>
              </section>
              <Link
                className="btn btn-info btn-lg"
                id="join-btn"
                to="/Register"
              >
                Join Now!
              </Link>
            </div>
            <div className="col-12 col-md-7">
              <img src={landing_cover} id="cover" alt="graphic" width="100%" />
            </div>
          </div>
        </main>
      </div>
    );
  }
}
export default LandingPage;
