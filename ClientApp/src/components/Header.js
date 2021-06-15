import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from './Button';

class Header extends Component {
  static displayName = Header.name;

  render () {
    let path  = window.location.pathname

    let rightColumn = <Button name='Login' 
    backgroundColor='bg-white' 
    textColor='text-black' 
    borderColor='border-blue-500'
    hoverBorderColor='border-blue-600'  />

    if (path == '/home'){
      rightColumn = <div>USER-1</div>
    }


    return (
      <div className="w-full border-b border-gray-200 p-3">
        <div className='max-w-5xl mx-auto flex justify-between pl-2 pr-2'>
         <Link to="/">
          <div className='text-3xl pt-1 cursor-pointer'>Watermango - <span className='font-bold'>Dashboard</span></div>
         </Link>

         <Link to="/login">
          {rightColumn}
          </Link>

        </div>
      </div>
    );
  }
}

export default Header;
