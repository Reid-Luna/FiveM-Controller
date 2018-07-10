import React, { Component } from "react";
import classnames from "classnames";

export default class Password extends Component {
  constructor(props) {
    super();
    this.props = props;
  }
  render() {
    const { id, errors, value, onChange } = this.props.properties;
    return (
      <div className="form-group">
        <input
          id={id ? id : "password"}
          type="password"
          className={classnames("form-control form-control-lg", {
            "is-invalid": errors.password
          })}
          placeholder="Password"
          name="password"
          value={value}
          onChange={onChange}
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password}</div>
        )}
      </div>
    );
  }
}
