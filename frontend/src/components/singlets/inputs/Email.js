import React, { Component } from "react";
import classnames from "classnames";

export default class Email extends Component {
  constructor(props) {
    super();
    this.props = props;
  }
  render() {
    const { id, errors, value, onChange } = this.props.properties;
    return (
      <div className="form-group">
        <input
          id={id ? id : "email"}
          type="email"
          className={classnames("form-control form-control-lg", {
            "is-invalid": errors.email
          })}
          placeholder="Email Address"
          name="email"
          value={value}
          onChange={onChange}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
    );
  }
}
