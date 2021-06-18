import React from 'react';
import PlantsSection from '../components/PlantsSection';

class Home extends React.Component {

  constructor(){
    super();
  }

  GetEmail = () => {
    return JSON.parse(localStorage.getItem('user')).email;
  }
  
  render (){
    let email = this.GetEmail();

    return (
        <div className='text-center max-w-4xl mx-auto'>
          <div className="mt-10 mx-auto p-4 w-full max-w-3xl h-24 bg-gray-50 rounded-xl">
            <div className="grid grid-cols-2 xs:grid-cols-1">
              <div class='p-4'>
                <h1 class='uppercase text-3xl font-bold text-gray-300'>Signed In As</h1>
              </div>
              <div class='p-2 row flex'>
                <img src={`https://ui-avatars.com/api/?name=` + email + `&rounded=true&bold=true&background=3f4859&color=fff`} alt="Girl in a jacket" width="50" height="50"></img>
                <h1 class='p-3 text-base font-semibold'>{email}</h1>
              </div>
            </div>
          </div>
          <PlantsSection />
        </div>
    );
  }
}

export default Home;