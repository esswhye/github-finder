import React, { useState, Fragment } from "react";
import "./App.css";
import Alert from "./components/layout/Alert";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Navbar from "./components/layout/Navbar";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/pages/About";
import SingleUser from "./components/users/SingleUser";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

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
  const searchUsers = async (text) => {
    setLoading(true);

    console.log(text + " From App.js");

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res);
    //this.setState({ users: res.data.items, loading: false });
    setUsers(res.data.items);
    setLoading(false);
  };

  // Get single Github user

  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUser(res.data);
    setLoading(false);
  };

  //Get user repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    //this.setState({ repos: res.data, loading: false });
    setRepos(res.data);
    setLoading(false);
  };

  //Clear users from state
  const clearUsers = () => {
    //this.componentDidMount();

    //this.setState({ users: [], loading: false });
    setUsers([]);
    setLoading(false);
  };

  //Set Alert
  const showAlert = (msg, type) => {
    //this.setState({ alert: { msg: msg, type: type } });
    setAlert(msg, type);
    setTimeout(() => setAlert(null), 5000);
  };

  //JSX
  //const { users, loading, user, repos } = this.state;

  const name = " SY";
  //const loading = false;
  //const showName = true;
  //const numbers = [1, 2, 3, 4];

  return (
    <Router>
      <div className="App">
        <Navbar title={name} icon="fab fa-github" searchUser={searchUsers} />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
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
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
