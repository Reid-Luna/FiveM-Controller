import React, { Component } from "react";
import classnames from "classnames";

export default class Password2 extends Component {
  constructor(props) {
    super();
    this.props = props;
  }
  render() {
    const { id, errors, value, onChange } = this.props.properties;
    return (
      <div className="form-group">
        <input
          id={id ? id : "password2"}
          type="password"
          className={classnames("form-control form-control-lg", {
            "is-invalid": errors.password2
          })}
          placeholder="Confirm Password"
          name="password2"
          value={value}
          onChange={onChange}
        />
        {errors.password2 && (
          <div className="invalid-feedback">{errors.password2}</div>
        )}
      </div>
    );
  }
}
