import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from './Button';

class Header extends Component {
  static displayName = Header.name;

  Logout = () => {
    localStorage.setItem('user',  null);
    localStorage.clear();
    this.props.logout();
  }

  render () {

    let rightColumn = <Button name='Logout' 
    backgroundColor='bg-white' 
    textColor='text-black' 
    borderColor='border-blue-500'
    hoverBorderColor='border-blue-600'  />

    return (
      <div className="w-full border-b border-gray-200 p-3">
        <div className='max-w-4xl mx-auto flex justify-between pl-2 pr-2'>
         <Link to="/">
          <div className='text-3xl pt-1 cursor-pointer'>Watermango - <span className='font-bold'>Dashboard</span></div>
         </Link>

          <div onClick={()=>this.Logout()}>
          {rightColumn}
          </div>

        </div>
      </div>
    );
  }
}

export default Header;
