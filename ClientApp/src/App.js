import React from 'react';
import { Route } from 'react-router';

import Layout from './components/Layout';

import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

class App extends React.Component {
  static displayName = App.name;

  constructor(){
    super();

    this.state = {
      user: null,
      loggedIn: false
    }
  }

  componentDidMount = () => {
    this.SyncLocalStorage();
  }

  SyncLocalStorage = () => {
    let u = localStorage.getItem('user')
    if (u != null && u != undefined){
      let user = JSON.parse(u);
      console.log('local-storage USER', user);
      this.setState({user: user, loggedIn: true});
    }
  }

  MakeGetRequest = (path, data) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    fetch(path, requestOptions)
      .then(response => response.json())
      .then(data => {
        alert("Success");
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
        this.SyncLocalStorage();
      })
      .catch((error) => {
        console.error('Error:', error);

        if (path == '/user/login'){
          alert("Please check that you have put your username and password in correctly and have registered.");
        } else {
          alert("An Account with this email already exists.");
        }
      });
  }

  Login = (email, password) => {
    this.MakeGetRequest('/user/login', {
      Email: email,
      Password: password
    })
  }

  Register = (email, password) => {
    this.MakeGetRequest('/user/create', {
      Email: email,
      Password: password
    })
  }

  Logout = () => {
    this.setState({loggedIn: false, user: null});
    window.location.reload();
  }
  
  render (){
    if (!this.state.loggedIn){
      return (
        <Layout logout={this.Logout}>
          <Login login={this.Login} register={this.Register} />
        </Layout>
      )
    }

    return (
      <Layout logout={this.Logout}>
        <Route exact path='/' component={Home} />
        <Route exact path='/landing' component={Landing} />
        <Route exact path='/error' component={NotFound} />
      </Layout>
    );
  }
}

export default App;
