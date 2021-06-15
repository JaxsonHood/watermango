import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import FlowerCard from './FlowerCard';

class PlantsSection extends Component {
    constructor(){
        super();
    
        this.state = {
            plants: []
        }
      }
    
      componentDidMount() {
        this.fetchPlants();
      }
    
      fetchPlants = () => {
        fetch('/plants/all')
        .then(response => response.json())
        .then(result => {
            this.setState({plants: result})
        })
        .catch(e => {
            console.log(e);
        });
      }
    
      plantItems = () => {
          let rl = [];

          let count = 0;
    
          for (let f in this.state.plants){
              console.log(f);
              let flow = this.state.plants[f];

              rl.push(<FlowerCard title={flow.title} waterTime={flow.waterTime} watered={flow.watered} />);

              count++;
          }
    
          return rl;
      }
    
      pushNewPlant = () => {
              // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Title: 'New Flower', WaterTime: 45})
        };
        fetch('/plants/add', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
      }
    
      removePlant = () => {
                    // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ID: 2})
        };
        fetch('/plants/remove', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
      }

    render () {
        return (
            <div className='mt-20 w-full p-4 border-gray-200 text-left rounded-2xl max-w-4xl mx-auto'>
                <div className='-mt-3 p-3 flex justify-between border-b-4 mb-6'>
                    <h3 className='text-4xl font-bold mt-1'>Plants</h3>
                    <div className='mb-1 px-3 py-2 rounded-xl flex justify-evenly border-2 shadow-sm hover:border-gray-700 cursor-pointer'>
                        <h1 className='pr-2 font-bold'>New Plant</h1>
                        <FontAwesomeIcon icon={faPlus} size='lg' />
                    </div>
                </div>
                <div className='row flex flex-wrap gap-4'>
                    {this.plantItems()}
                </div>
            </div>
        );
    }
}

export default PlantsSection;