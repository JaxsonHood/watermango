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
  }
  
  render (){
    return (
      <Layout>
        <Route exact path='/' component={Landing} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/error' component={NotFound} />
      </Layout>
    );
  }
}

export default App;
