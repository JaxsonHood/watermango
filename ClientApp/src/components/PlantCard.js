import React, { Component } from 'react';

import ReactTooltip from 'react-tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint, faPencilAlt, faHandHoldingWater, faPlayCircle, faSpa, faFillDrip, faPause, faClock, faStop } from '@fortawesome/free-solid-svg-icons'

class PlantCard extends Component {

    constructor(){
        super();

        this.state = {
            beingWatered: false,
            secondsLeft: -1,
            paused: false,
            pausedByController: false,
            canWaterIn: -1
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            let now = Date.now();

            let differenceBetweenNowAndLastWatered = (now - this.props.data.lastWatered);

            // console.log(this.props.data.watered, differenceBetweenNowAndLastWatered);

            if (differenceBetweenNowAndLastWatered > 21600000){
                // 21600000 - 6 Hours in milliseconds
                // console.log('difference', differenceBetweenNowAndLastWatered);
                
                if (this.props.data.watered != "Empty"){
                    this.UpdatePlantWateredStatus('Empty');
                }
            }

        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    UpdatePlant = () => {
        this.props.updatePlant(this.props.data);
    }

    StopWatering = () => {
        this.setState({beingWatered: false, secondsLeft: -1, paused: false})
    }

    WaterPlant = () => {
        if (this.props.watered != "Full"){
            if (this.state.secondsLeft == -1 || !this.state.paused){
                this.setState({beingWatered: true, secondsLeft: this.props.data.waterTime});
            } else {
                this.setState({paused: false});
            }
        }
        
    }

    UpdatePlantWateredStatus = (status) => {
        let data = this.props.data
        data.watered = status;
        
        if (status == 'Full'){
            let now = Date.now();
            data.lastWatered = now;
        }

        this.props.post('/plants/add', data);
    }

    PauseWatering = () => {
        this.setState({paused: !this.state.paused});
    }

    render () {

        let canWaterInSeconds = this.state.canWaterIn;

        if (!this.state.pausedByController){
            canWaterInSeconds = this.props.data.timeToWait;
        }

        if (this.state.canWaterIn == -1 && !this.state.pausedByController){
            this.setState({canWaterIn: this.props.data.timeToWait});
        }

        if (this.props.watered == 'Full' && !this.state.pausedByController){
            
            if (this.state.canWaterIn > 0){
                canWaterInSeconds = this.state.canWaterIn;
                let timer = setTimeout(() => {
                    this.setState({canWaterIn: this.state.canWaterIn - 1})
                }, 1000);

                this.props.trackTimer(timer, this.props.data.id, 'top');
            } else {
                this.UpdatePlantWateredStatus('Semi');
            }
        }

        let waterStatusTop = <div className="w-24 h-20 rounded-3xl p-1">
            <div className='text-xs font-bold text-gray-600'>can water</div>
            <div className='text-3xl'><span className='text-gray-300'>in</span> {canWaterInSeconds}</div>
            <div className='text-sm text-gray-400'>seconds</div>
        </div>

        let waterStatusUI = <div className='transform duration-150 ease-in-out hover:scale-95 text-center p-3 py-3 px-4 text-lg border-8 rounded-2xl border-green-100 text-white bg-green-500 font-bold'>
            <div className='underline'>Full</div>
            <div className='flex items-center justify-center pt-1'><FontAwesomeIcon size='lg' icon={faTint} /></div>
        </div>

        let waterButtonClasses = "text-center p-3 py-2 px-3 text-md border-2 border-gray-50 rounded-2xl bg-gray-100 text-gray-400 opacity-50 font-semibold";

        if (this.props.watered == 'Empty'){
            waterStatusUI = <div className='transform duration-150 ease-in-out hover:scale-95 text-center p-3 py-3 px-4 text-lg border-8 rounded-2xl border-red-100 text-white bg-red-500 font-bold'>
                <div className='underline'>!Hydrate</div>
                <div className='flex items-center justify-center pt-1'><FontAwesomeIcon size='lg' icon={faHandHoldingWater} /></div>
            </div>

            waterStatusTop = <div className="w-24 h-20 rounded-3xl p-1">
                <div className='text-xs font-bold text-gray-600'>can water</div>
                <div className='text-3xl'><span className='text-gray-300'></span> Now</div>
                <div className='text-sm text-gray-400'>...</div>
            </div>

            waterButtonClasses = "transform duration-150 ease-in-out hover:scale-105 text-center p-3 py-2 px-3 text-md border-2 border-blue-50 rounded-2xl bg-blue-50 hover:bg-white hover:border-blue-500 font-semibold hover:shadow-sm";
        }

        if (this.props.watered == 'Semi'){
            waterStatusUI = <div className='transform duration-150 ease-in-out hover:scale-95 text-center p-3 py-3 px-4 text-lg border-8 rounded-2xl border-yellow-100 text-white bg-yellow-500 font-bold'>
                <div className='underline'>Hydrated</div>
                <div className='flex items-center justify-center pt-1'><FontAwesomeIcon size='lg' icon={faFillDrip} /></div>
            </div>

            waterStatusTop = <div className="w-24 h-20 rounded-3xl p-1">
                <div className='text-xs font-bold text-gray-600'>can water</div>
                <div className='text-3xl'><span className='text-gray-300'></span> Now</div>
                <div className='text-sm text-gray-400'>...</div>
            </div>

            waterButtonClasses = "transform duration-150 ease-in-out hover:scale-105 text-center p-3 py-2 px-3 text-md border-2 border-blue-50 rounded-2xl bg-blue-50 hover:bg-white hover:border-blue-500 font-semibold hover:shadow-sm";
        }

        let waterItButton = <div className={waterButtonClasses} onClick={this.WaterPlant}>
            <div>Water</div>
            <div className='flex items-center justify-center pt-1 text-blue-500'><FontAwesomeIcon size="lg" icon={faPlayCircle} /></div>
        </div>


        if (this.props.eventPause && !this.state.pausedByController){
            this.setState({paused: true, pausedByController: true});
        } else if (!this.props.eventPause && this.state.pausedByController){
            this.setState({paused: false, pausedByController: false});
        }

        let percentageDone = Math.round(((this.props.waterTime - this.state.secondsLeft) / this.props.waterTime) * 100).toString() + "%";
        if (this.state.secondsLeft > 0 && this.state.beingWatered && !this.state.paused && !this.state.pausedByController){

            let timer = setTimeout(() => {
                this.setState({secondsLeft: this.state.secondsLeft - 1})
            }, 1000)

            this.props.trackTimer(timer, this.props.data.id, 'bottom');

        } else if (this.state.secondsLeft == 0 && this.state.beingWatered){
            this.UpdatePlantWateredStatus('Full');
            this.setState({beingWatered: false, secondsLeft: -1, canWaterIn: this.props.data.timeToWait});
        }

        let leftButton = <div onClick={this.UpdatePlant} className='text-center p-3 py-2 px-3 text-md font-semibold border-t-2 border-gray-50 hover:border-gray-600 text-gray-600 hover:text-gray-800'>
            <div>Edit</div>
            <div className='flex items-center justify-center pt-1'><FontAwesomeIcon icon={faPencilAlt} /></div>
        </div>

        if (this.state.beingWatered){
            waterStatusUI = <div className='p-1'>

                <div className='grid grid-cols-2 pl-1'>
                    <h2 className='text-lg font-bold text-gray-400 animate-pulse'>Watering...</h2>
                    <h2 className='text-lg ml-12 font-bold text-gray-800 animate-pulse'>{this.state.secondsLeft}</h2>
                </div>
            
                <div className="relative pt-1">
                    <div className="overflow-hidden h-10 mb-4 text-xs flex rounded-xl bg-blue-100 border-4 border-blue-50">
                    <div style={{ width: percentageDone }} className="animate-pulse rounded-xl shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                    </div>
                </div>
            </div>

            if (!this.state.paused || this.state.pausedByController){
                waterItButton = <div className="transform duration-150 ease-in-out hover:scale-105 text-center p-3 py-2 px-3 text-md border-2 border-yellow-50 rounded-2xl bg-yellow-50 hover:bg-white hover:border-yellow-500 font-semibold hover:shadow-sm" onClick={this.PauseWatering}>
                    <div>Pause</div>
                    <div className='flex items-center justify-center pt-1 text-yellow-500'><FontAwesomeIcon size="lg" icon={faPause} /></div>
                </div>
            }

            leftButton = <div className="transform duration-150 ease-in-out hover:scale-105 bg-gray-900 text-center p-3 py-2 px-3 text-md border-2 border-blue-50 rounded-2xl hover:bg-gray-800 hover:border-gray-500 text-white font-semibold hover:shadow-sm" onClick={this.StopWatering}>
                <div>Stop</div>
                <div className='flex items-center justify-center pt-1 text-gray-100'><FontAwesomeIcon size="md" icon={faStop} /></div>
            </div>
            
        }

        if (this.props.watered == 'Empty'){
            waterStatusTop = <div className="w-24 h-20 rounded-3xl p-1">
                <div className='text-xs font-bold text-gray-600'>no water</div>
                <div className='text-3xl'><span className='text-gray-300'>in</span> 6</div>
                <div className='text-sm text-gray-400'>hours</div>
            </div>
        }

        return (
            <div className='w-56'>
                <div className='w-full p-3 bg-gray-50 rounded-3xl mx-auto hover:shadow-sm border-2 border-gray-100 cursor-pointer transform duration-300 ease-in-out hover:-translate-y-1'>
                    <div className='grid grid-cols-2 gap-2 p-1'>
                        <div className="w-20 h-20 p-3 pt-4 bg-gray-100 rounded-3xl text-gray-300 border border-gray-50 hover:border-gray-100">
                            <FontAwesomeIcon size='3x' icon={faSpa} />
                        </div>
                        {waterStatusTop}
                    </div>
                    <div className='h-14 font-bold m-2 overflow-hidden text-base'>{this.props.title}</div>
                    <div className='m-3 mt-0'>
                        <div className='p-1 grid grid-cols-2 gap-2 border-t-2 border-b-2'>
                            
                            <div data-tip="Time to wait after watering" className="text-center p-3 py-1 px-2 text-xs rounded-2xl bg-gray-50 font-semibold" onClick={this.PauseWatering}>
                                <div className='flex items-center justify-center pt-1 text-purple-500'><FontAwesomeIcon size="md" icon={faClock} /><span className='pl-1'><div className='text-sm font-bold text-gray-900'>{this.props.data.timeToWait}(s)</div></span></div>
                            </div>
                            <div data-tip="Time it takes to water" className="text-center p-3 py-1 px-2 mb-1 text-xs rounded-2xl bg-gray-50 font-semibold" onClick={this.PauseWatering}>
                                <div className='flex items-center justify-center pt-1 text-pink-500'><FontAwesomeIcon size="md" icon={faTint} /><span className='pl-1'><div className='text-sm font-bold text-gray-900'>{this.props.waterTime}(s)</div></span></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* <div className='p-1 pt-0 text-xs font-bold text-gray-600'>Actions:</div> */}
                        <div className='pt-2 grid grid-cols-2 gap-2'>
                            {leftButton}
                            {waterItButton}
                        </div>
                    </div>

                    <div className='pt-2'>
                        {waterStatusUI}
                    </div>
                </div>
                <ReactTooltip />
            </div>
        );
    }
}

export default PlantCard;