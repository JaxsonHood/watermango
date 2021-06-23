import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faInfoCircle, faPlus, faSortAmountDownAlt, faSortAmountUpAlt } from '@fortawesome/free-solid-svg-icons'

import PlantCard from './PlantCard';
import PlantAddModal from './PlantAddModal';

import ReactTooltip from 'react-tooltip';

class PlantsSection extends Component {
    ws = new WebSocket('wss://localhost:5001/ws')

    constructor(){
        super();
    
        this.state = {
            plants: [],
            modalOpen: false,
            editPlantState: null,
            doUpdate: false,
            pauseAllEvents: false,
            ws: null,
            sort: false
        }
    }

    timeout = 250;
    
    componentDidMount() {
        // Setup websocket connection
        this.connect();

        this.interval = setInterval(() => {
            let u = JSON.parse(localStorage.getItem('user'));
            if (this.state.ws != null && this.state.ws != undefined){
                this.state.ws.send(u.id);
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    /**
     * @function connect
     * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
     */
      connect = () => {
            var ws = new WebSocket("wss://localhost:5001/ws");
            let user = JSON.parse(localStorage.getItem('user'));
            let that = this; // cache the this
            var connectInterval;
    
            // websocket onopen event listener
            ws.onopen = () => {
                console.log("connected websocket main component");
    
                this.setState({ ws: ws });
                ws.send(user.id);
    
                that.timeout = 250; // reset timer to 250 on open of websocket connection 
                clearTimeout(connectInterval); // clear Interval on on open of websocket connection
            };

            ws.onmessage = (event) => {
                let list = JSON.parse(event.data);
                if (JSON.stringify(this.state.plants) !== JSON.stringify(list)){
                    if (this.state.sort){
                        this.setState({plants: this.Sort(list)});
                    } else this.setState({plants: list});
                }
            };
    
            // websocket onclose event listener
            ws.onclose = e => {
                console.log(
                    `Socket is closed. Reconnect will be attempted in ${Math.min(
                        10000 / 1000,
                        (that.timeout + that.timeout) / 1000
                    )} second.`,
                    e.reason
                );
    
                that.timeout = that.timeout + that.timeout; //increment retry interval
                connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
            };
    
            // websocket onerror event listener
            ws.onerror = err => {
                console.error(
                    "Socket encountered error: ",
                    err.message,
                    "Closing socket"
                );
    
                ws.close();
            };
      };
    
     /**
     * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
     */
      check = () => {
            const { ws } = this.state;
            if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
      };

      SetUpdatePlant = (plant, shouldToggle) => {
          this.setState({editPlantState: plant, doUpdate: true});
          
          if (shouldToggle == null || shouldToggle == true){
            this.ToggleModal();
          }
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
              if (p1.Watered.length > p2.Watered.length){
                  return -1;
              } else if (p1.Watered.length < p2.Watered.length){
                  return  1
              }
              return 0;
          });
      }

      ToggleSort = () => {
          let user = JSON.parse(localStorage.getItem('user'));

          if (!this.state.sort){
            this.setState({sort: !this.state.sort, plants: this.Sort(this.state.plants)})
          } else {
            this.setState({sort: !this.state.sort})
            this.state.ws.send(user.ID);
          }
      }
    
      // Build plant objects
      plantItems = () => {
          let rl = [];

          this.state.plants.forEach(plant => {
                rl.push(<PlantCard data={plant} title={plant.Title} waterTime={plant.WaterTime} watered={plant.Watered} updatePlant={this.SetUpdatePlant} post={this.MakePostRequest} />);
          });

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
        let sortedIcon = <FontAwesomeIcon icon={faSortAmountUpAlt} size='lg' />

        if (this.state.sort){
            sortedIcon = <FontAwesomeIcon icon={faSortAmountDownAlt} size='lg' />
        }

        return (
            <div className='mt-10 w-full p-4 border-gray-200 text-left rounded-2xl max-w-3xl mx-auto'>
                <div className='-mt-3 p-3 flex justify-between border-b-4 mb-6'>
                    <div className='grid grid-cols-2 gap-4'>
                        <h3 className='text-4xl font-bold mt-1'>Plants</h3>
                        <div className='mx-auto mt-2 grid grid-cols-2 gap-2'>
                            <div className='mb-1 px-2 py-1 rounded-xl flex hover:text-white hover:bg-gray-900 justify-evenly border-2 shadow-sm cursor-pointer'
                            onClick={this.ToggleSort}>
                                {/* <h1 className='pr-2 font-bold'>Sorted</h1> */}
                                {sortedIcon}
                            </div>

                            <div data-tip="Click icon to the left to sort by watering status" className='mb-1 px-2 py-1'>
                                <FontAwesomeIcon icon={faInfoCircle} size='lg' />
                            </div>
                        </div>
                    </div>
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