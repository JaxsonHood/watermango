import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemoveFormat, faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class PlantAddModal extends React.Component {

    constructor(){
        super();

        this.state = {
            title: '',
            timeToWater: 10,
            isUpdate: false,
            timeToWait: 30
        }
    }

    updateTitle = (e) => {
        this.setState({title: e.target.value})
    }

    updateTimeToWater = (e) => {
        this.setState({timeToWater: e.target.value})
    }

    updateTimeToWait = (e) => {
        this.setState({timeToWait: e.target.value})
    }


    CleanUpAndClose = () => {
        this.setState({title: '', timeToWater: 10, isUpdate: false});
        this.props.close();
    }

    submit = () => {
        if (this.state.title == ""){
            alert("Please fill out the title field.");
        } else {
            let data = {
                'Title': this.state.title,
                'WaterTime': parseInt(this.state.timeToWater),
                'Watered': 'Empty',
                'TimeToWait': parseInt(this.state.timeToWait),
                'LastWatered': 1623982242897
            }

            if (this.props.data && this.props.data.id){
                data['ID'] = this.props.data.id; 
                data.Watered = this.props.data.watered;
            }

            this.props.DoRequest('/plants/add', data);

            this.setState({title: '', timeToWater: 10, isUpdate: false});

            this.props.close();
        }
    }

    deleteMe = () => {
        let data = {
            'Title': this.state.title,
            'WaterTime': parseInt(this.state.timeToWater),
            'Watered': 'Empty'
        }

        if (this.props.data && this.props.data.id){
            data['ID'] = this.props.data.id; 
            data.Watered = this.props.data.watered;
        }

        this.props.DoRequest('/plants/remove', data);

        this.setState({title: '', timeToWater: 10, isUpdate: false});
        this.props.close();
    }

    render () {

        if (this.props.isUpdate && !this.state.isUpdate && this.props.data != null){
            this.setState({title: this.props.data.title, isUpdate: true, timeToWater: this.props.data.waterTime});
        }

        return (
            <div class="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-200 bg-opacity-50 z-50">
                <div class="bg-white rounded-xl w-96">
                    <div class="flex flex-col items-start p-6">
                        <div class="p-1 flex items-center w-full">
                            <div class="text-gray-900 font-bold text-2xl">ADD/EDIT - Plant</div>
                            <svg onClick={this.CleanUpAndClose} class="ml-auto fill-current text-gray-600 hover:text-gray-900 w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                            </svg>
                        </div>
                        <hr></hr>
                        <div className='p-1 w-80 pt-3'>
                            <div class="mb-3 space-y-2 w-full text-sm">
                                <label class=" font-semibold text-gray-800 py-2">Title</label>
                                <div class="flex flex-wrap items-stretch w-full mb-4 relative">
                                    <input type="text" class="flex-shrink flex-grow flex-auto leading-normal w-px border h-10 border-grey-light rounded-xl px-3 relative focus:border-gray-100 focus:shadow" placeholder="ex. Plants in the BOARDROOM" value={this.state.title}onChange={this.updateTitle}></input>
                                </div>
                            </div>
                            <div class="mb-3 space-y-2 w-full text-sm">
                                <label class=" font-semibold text-gray-800 py-2">Time it takes to water plant (in SECONDS)</label>
                                <div class="flex flex-wrap items-stretch w-full mb-4 relative">
                                    <input type="number" class="flex-shrink flex-grow flex-auto leading-normal w-px border h-10 border-grey-light rounded-xl px-3 relative focus:border-gray-50 focus:shadow" defaultValue='10' value={this.state.timeToWater}onChange={this.updateTimeToWater}></input>
                                </div>
                            </div>
                            <div class="mb-3 space-y-2 w-full text-sm">
                                <label class=" font-semibold text-gray-800 py-2">Time to wait to water plant (in SECONDS)</label>
                                <div class="flex flex-wrap items-stretch w-full mb-4 relative">
                                    <input type="number" class="flex-shrink flex-grow flex-auto leading-normal w-px border h-10 border-grey-light rounded-xl px-3 relative focus:border-gray-200 focus:shadow" defaultValue='10' value={this.state.timeToWait} onChange={this.updateTimeToWait}></input>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div class="ml-auto p-1">
                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded m-1" onClick={this.deleteMe}>
                                Delete <span className='pl-2'><FontAwesomeIcon size='lg' icon={faTrashAlt} /></span>
                            </button>
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded m-1" onClick={this.submit}>
                                Save <span className='pl-2'><FontAwesomeIcon size='lg' icon={faSave} /></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlantAddModal;