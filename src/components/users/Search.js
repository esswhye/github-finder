import React, { Component } from "react";
import PropTypes from "prop-types";
export class Search extends Component {
  state = {
    text: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  /*
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.text);
  }
*/

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
  };

  //Without bind
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.text);
    this.props.searchUsers(this.state.text);
    this.setState({ text: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search User"
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
      </div>
    );
  }
}

export default Search;
