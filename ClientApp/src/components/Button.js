import React, { Component } from 'react';

class Button extends Component {

  render () {
    return (
        <div className={'py-2 px-5 border-2 cursor-pointer rounded-3xl font-semibold shadow-sm hover:' + this.props.hoverBorderColor + ' ' + this.props.borderColor + ' ' + this.props.backgroundColor + ' ' + this.props.textColor}>
          {this.props.name}
        </div>
    );
  }
}

export default Button;