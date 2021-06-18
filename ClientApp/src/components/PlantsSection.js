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
            modalOpen: false,
            editPlantState: null,
            doUpdate: false,
            pauseAllEvents: false,
            timerIndex: {
                top: {},
                bottom: {},
            }
        }
      }
    
      componentDidMount() {
        this.fetchPlants();
      }

      shouldComponentUpdate = (nextProps, nextState) => {
          if (nextState.timerIndex == this.state.timerIndex){
            if (nextState.plants != this.state.plants ||
                nextState.modalOpen != this.state.modalOpen ||
                nextState.editPlantState != this.state.editPlantState ||
                nextState.doUpdate != this.state.doUpdate ||
                nextState.pauseAllEvents != this.state.pauseAllEvents){
                    return true;
                }

                return false;
          }

          return true;
      }

      SetUpdatePlant = (plant, shouldToggle) => {
          this.setState({editPlantState: plant, doUpdate: true});
          
          if (shouldToggle == null || shouldToggle == true){
            this.ToggleModal();
          }
      }

      // Keep track of all the timers so they can be deleted when there is an update
      TrackTimer = (timer, id, type) => {
          let curTimerIndex = this.state.timerIndex;

          if (curTimerIndex != {} && curTimerIndex[type] != null && curTimerIndex[type][id] != null){
              clearTimeout(curTimerIndex[type][id]);
              curTimerIndex[type][id] = null;
          } else {
            curTimerIndex[type][id] = timer;
          }

          this.setState({timerIndex: curTimerIndex});
      }

      MakePostRequest = (path, data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        let user = JSON.parse(localStorage.getItem('user'));

        console.log(path + '/' + user.id)
        console.log('data-to-send', data);

        if (user.id){
            fetch(path + '/' + user.id, requestOptions)
            .then(response => {
                this.fetchPlants(true);
                return response.json();
            })
            .then(data => {
                console.log('stuff', data);
            }).catch(e => {
                console.log(e);
            });
        }
      }

      Sort = (plants) => {
          // Automatically surface plants that need to be watered
          return plants.sort((p1, p2) => {
              if (p1.watered.length > p2.watered.length){
                  return -1;
              } else if (p1.watered.length < p2.watered.length){
                  return  1
              }
              return 0;
          });
      }
    
      fetchPlants = (pause) => {
        if (pause) this.setState({pauseAllEvents: true});
        let user = JSON.parse(localStorage.getItem('user'));

        if (user.id){
            if (!pause){
                fetch('/plants/all/' + user.id)
                .then(response => response.json())
                .then(result => {
                    console.log("Updated global plants...");
                    this.setState({plants: result, pauseAllEvents: false});
                })
                .catch(e => {
                    console.log(e);
                });
            } else {
                setTimeout(() => {
                    fetch('/plants/all/' + user.id)
                    .then(response => response.json())
                    .then(result => {
                        console.log("Updated global plants...");
                        this.setState({plants: result, pauseAllEvents: false});
                    })
                    .catch(e => {
                        console.log(e);
                    });
        
                }, 350);
            }
        }
      }
    
      // Build plant objects
      plantItems = () => {
          let rl = [];

          let count = 0;
    
          for (let f in this.state.plants){
              let flow = this.state.plants[f];

              rl.push(<PlantCard trackTimer={this.TrackTimer} eventPause={this.state.pauseAllEvents} data={flow} title={flow.title} waterTime={flow.waterTime} watered={flow.watered} updatePlant={this.SetUpdatePlant} post={this.MakePostRequest} />);

              count++;
          }
    
          return rl;
      }

    ToggleModal = () => {
        if (this.state.modalOpen){
            this.setState({modalOpen: !this.state.modalOpen, editPlantState: null, doUpdate: false});
        } else {
            this.setState({modalOpen: !this.state.modalOpen});
        }
    }

    render () {
        return (
            <div className='mt-10 w-full p-4 border-gray-200 text-left rounded-2xl max-w-3xl mx-auto'>
                <div className='-mt-3 p-3 flex justify-between border-b-4 mb-6'>
                    <h3 className='text-4xl font-bold mt-1'>Plants</h3>
                    <div className='mb-1 px-3 py-2 rounded-xl flex justify-evenly border-2 shadow-sm hover:border-gray-700 cursor-pointer'
                    onClick={this.ToggleModal}>
                        <h1 className='pr-2 font-bold'>New</h1>
                        <FontAwesomeIcon icon={faPlus} size='lg' />
                    </div>
                </div>
                <div id='plants-wrapper' className='row flex flex-wrap gap-4'>
                    {this.plantItems()}
                </div>
                <div id='modal-wrapper' className={(this.state.modalOpen ? '' : 'hidden')}>
                    <PlantAddModal close={this.ToggleModal} DoRequest={this.MakePostRequest} data={this.state.editPlantState} isUpdate={this.state.doUpdate} />
                </div>
            </div>
        );
    }
}

export default PlantsSection;