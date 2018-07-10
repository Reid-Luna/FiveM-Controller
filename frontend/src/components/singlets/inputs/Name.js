import React, { Component } from "react";
import classnames from "classnames";

export default class Name extends Component {
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
          type="name"
          className={classnames("form-control form-control-lg", {
            "is-invalid": errors.name
          })}
          placeholder="Name"
          name="name"
          value={value}
          onChange={onChange}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
    );
  }
}
