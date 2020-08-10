import React, { Component, Fragment } from "react";
import "./App.css";
import Alert from "./components/layout/Alert";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Navbar from "./components/layout/Navbar";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/pages/About";
import SingleUser from "./components/users/SingleUser";

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
  };
  /*
  async componentDidMount() {
    this.setState({ loading: true });
    //` ' " "
    console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
    console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data, loading: false });

    //console.log(res.data);
  }*/

  //Search github users
  searchUsers = async (text) => {
    this.setState({ loading: true });

    console.log(text + " From App.js");

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res);
    this.setState({ users: res.data.items, loading: false });
  };

  // Get single Github user

  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ user: res.data, loading: false });
  };

  //Clear users from state
  clearUsers = () => {
    //this.componentDidMount();

    this.setState({ users: [], loading: false });
  };

  //Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  //JSX
  render() {
    const { users, loading, user } = this.state;

    const name = " SY";
    //const loading = false;
    //const showName = true;
    //const numbers = [1, 2, 3, 4];

    return (
      <Router>
        <div className="App">
          <Navbar
            title={name}
            icon="fab fa-github"
            searchUser={this.searchUsers}
          />
          <div className="container">
            <h1>MyApp</h1>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <User loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <SingleUser
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
