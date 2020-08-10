import React, { Component } from "react";
import "./App.css";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Navbar from "./components/layout/Navbar";
import axios from "axios";
class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    //` ' " "
    console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
    console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data, loading: false });

    //console.log(res.data);
  }

  //Search github users
  searchUsers = async (text) => {
    this.setState({ loading: true });

    console.log(text + " From App.js");

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res);
    this.setState({ users: res.data.items, loading: false });
  };

  //JSX
  render() {
    const name = "SY";
    const loading = false;
    const showName = true;
    const numbers = [1, 2, 3, 4];

    return (
      <div className="App">
        <Navbar title={name} icon="fab fa-github" />
        <div className="container">
          <h1>MyApp</h1>
          <Search searchUsers={this.searchUsers} />
          <User loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
