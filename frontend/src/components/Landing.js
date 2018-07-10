import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  logoutUser,
  statusServer,
  startServer,
  stopServer,
  restartServer
} from "../actions/authActions";

class Landing extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authPage = <h1>Server Status: {this.props.statusServer()}</h1>;
    const guestPage = (
      <h1>Welcome, please login to use the SADPS Management System</h1>
    );
    return (
      <div className="container" style={{ textAlign: "center" }}>
        <div className="row">
          <div className="col-12">{isAuthenticated ? authPage : guestPage}</div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Landing);
