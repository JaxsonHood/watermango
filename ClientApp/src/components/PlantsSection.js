import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import PlantCard from './PlantCard';
import PlantAddModal from './PlantAddModal';

class PlantsSection extends Component {
    constructor(){
        super();
    
        this.state = {
            plants: [],
            modalOpen: false
        }
      }
    
      componentDidMount() {
        this.fetchPlants();
      }

      MakePostRequest = (path, data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        
        fetch(path, requestOptions)
            .then(response => {
                this.fetchPlants();
                return response.json();
            })
            .then(data => {
                console.log(data);
            });
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

              rl.push(<PlantCard title={flow.title} waterTime={flow.waterTime} watered={flow.watered} />);

              count++;
          }
    
          return rl;
      }

    ToggleModal = () => {
        this.setState({modalOpen: !this.state.modalOpen});
    }

    render () {
        return (
            <div className='mt-20 w-full p-4 border-gray-200 text-left rounded-2xl max-w-3xl mx-auto'>
                <div className='-mt-3 p-3 flex justify-between border-b-4 mb-6'>
                    <h3 className='text-4xl font-bold mt-1'>Plants</h3>
                    <div className='mb-1 px-3 py-2 rounded-xl flex justify-evenly border-2 shadow-sm hover:border-gray-700 cursor-pointer'
                    onClick={this.ToggleModal}>
                        <h1 className='pr-2 font-bold'>New Plant</h1>
                        <FontAwesomeIcon icon={faPlus} size='lg' />
                    </div>
                </div>
                <div id='plants-wrapper' className='row flex flex-wrap gap-4'>
                    {this.plantItems()}
                </div>
                <div id='modal-wrapper' className={(this.state.modalOpen ? '' : 'hidden')}>
                    <PlantAddModal close={this.ToggleModal} Push={this.MakePostRequest} />
                </div>
            </div>
        );
    }
}

export default PlantsSection;