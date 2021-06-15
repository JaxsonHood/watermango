import React from 'react';
import { Link } from 'react-router-dom';
import FlowerCard from '../components/FlowerCard';
import PlantsSection from '../components/PlantsSection';

class Landing extends React.Component {
  
  render (){
    return (
        <div className="text-center m-16 max-w-4xl mx-auto p-3">
            <div className="p-4 font-bold text-5xl">
                <span className='text-blue-500 font-mono'>Watermango</span> is a easy way to keep your office <span className="text-green-500">plants</span> watered</div>

                <Link to="/home">
                    <div className='text-xl font-semibold mt-10 p-3 py-6 px-8 hover:bg-gray-50 rounded-xl border-4 borer-gray-600 hover:border-gray-900'>Goto Dashboard</div>
                </Link>

                <PlantsSection />
        </div>
    );
  }
}

export default Landing;