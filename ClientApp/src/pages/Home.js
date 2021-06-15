import React from 'react';
import PlantsSection from '../components/PlantsSection';

class Home extends React.Component {

  constructor(){
    super();
  }
  
  render (){
    return (
        <div className='text-center max-w-4xl mx-auto'>
          <PlantsSection />
        </div>
    );
  }
}

export default Home;