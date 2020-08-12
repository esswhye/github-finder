import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ showClear, searchUsers, clearUsers, setAlert }) => {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };
  /*
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.text);
  }
*/

  //Without bind
  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "light");
    } else {
      console.log(text);
      searchUsers(text);
      setText("");
    }
  };

  //const { showClear, clearUsers } = this.props;

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search User"
          value={text}
          onChange={onChange}
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

      {showClear && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
