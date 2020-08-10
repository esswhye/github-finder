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
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  //Without bind
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please enter something", "light");
    }else{
    console.log(this.state.text);
    this.props.searchUsers(this.state.text);
    this.setState({ text: "" });
    }
  
  };

  render() {
    const { showClear, clearUsers } = this.props;

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
        {
          //It's Short circuit evaluation (if this part is true) && (this part will execute)
        }

        {this.props.showClear && (
          <button className="btn btn-light btn-block" onClick={clearUsers}>
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
