import React, { Component } from "react";
import { AppContext } from "./AppProvider";
import "./A.css";

class A extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {() => {
          return (
            <a
              className={this.props.className}
              id={this.props.id}
              onClick={this.props.onClick}
            >
              {this.props.text}
            </a>
          );
        }}
        {/* // eslint-disable-next-line */}
      </AppContext.Consumer>
    );
  }
}
export default A;
