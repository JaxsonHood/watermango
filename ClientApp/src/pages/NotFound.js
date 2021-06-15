import React from 'react';

class NotFound extends React.Component {

  constructor(){
    super();
  }
  
  render (){
    return (
        <div className="text-center">
            <div className="p-96 text-4xl font-mono">Error - Could not find page...</div>
        </div>
    );
  }
}

export default NotFound;