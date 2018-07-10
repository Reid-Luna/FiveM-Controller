import React, { Component } from "react";

import EmailComponent from "./inputs/Email";
import NameComponent from "./inputs/Name";
import PasswordComponent from "./inputs/Password";
import Password2Component from "./inputs/Password2";

export default class Input extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {};
  }
  render() {
    const { type } = this.props;

    return type === "email" || type === "Email" ? (
      <EmailComponent properties={this.props} />
    ) : type === "name" || type === "Name" ? (
      <NameComponent properties={this.props} />
    ) : type === "password" || type === "Password" ? (
      <PasswordComponent properties={this.props} />
    ) : type === "password2" || type === "Password2" ? (
      <Password2Component properties={this.props} />
    ) : (
      <h1>"{type}" is not an input type</h1>
    );
  }
}
