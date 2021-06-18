import React, { Component } from 'react';

class OrderToggle extends Component {

    constructor(){
        super()

        this.state = {
            on: false
        }
    }


    Toggle = () => {
        this.setState({on: !this.state.on});
    }

  render () {

    let button = <div class="w-12 relative my-1 cursor-pointer" onClick={this.Toggle}>
        <div class="h-8 w-12 bg-gray-300 rounded-full">
            <div class="mt-1 w-6 h-6 absolute transition-all transform ease-linear duration-100 flex items-center justify-center rounded-full bg-white shadow-toggle border-gray-300 top-0 left-4"></div>
        </div>
    </div>

    if (this.state.on){
        button =  <div class="w-8 py-1 relative my-1 cursor-pointer" onClick={this.Toggle}>
        <div class="h-5 bg-pink-600 rounded-full">
            <div class="-ml-3 mt-p w-6 h-6 absolute transition-all transform ease-linear duration-100 flex items-center justify-center rounded-full bg-white shadow-toggle border-gray-300 top-0 left-96"></div>
        </div>
    </div>
    }

    return (
      <div>
          {button}
      </div>
    );
  }
}

export default Layout;
