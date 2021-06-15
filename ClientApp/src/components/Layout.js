import React, { Component } from 'react';

import Header from './Header'

class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <Header />
        <div className='container mx-auto'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
