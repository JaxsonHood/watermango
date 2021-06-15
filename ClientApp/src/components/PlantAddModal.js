import React from 'react';

class PlantAddModal extends React.Component {

    constructor(){
        super();

        this.state = {
            title: '',
            timeToWater: 10
        }
    }

    updateTitle = (e) => {
        this.setState({title: e.target.value})
    }

    updateTimeToWater = (e) => {
        this.setState({timeToWater: e.target.value})
    }

    submit = () => {
        let data = {
            'Title': this.state.title,
            'WaterTime': parseInt(this.state.timeToWater),
            'Watered': 'Empty'
        }

        this.props.Push('/plants/add', data);
        this.props.close();
    }

    render () {

        return (
            <div class="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-200 bg-opacity-50 z-50">
                <div class="bg-white rounded-lg w-96">
                    <div class="flex flex-col items-start p-4">
                        <div class="p-1 flex items-center w-full">
                            <div class="text-gray-900 font-bold text-2xl">ADD/EDIT - Plant</div>
                            <svg onClick={this.props.close} class="ml-auto fill-current text-gray-600 hover:text-gray-900 w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                            </svg>
                        </div>
                        <hr></hr>
                        <div className='p-1 w-80 pt-3'>
                            <div class="mb-3 space-y-2 w-full text-sm">
                                <label class=" font-semibold text-gray-800 py-2">Title</label>
                                <div class="flex flex-wrap items-stretch w-full mb-4 relative">
                                    <input type="text" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border h-10 border-grey-light rounded-lg px-3 relative focus:border-blue focus:shadow" placeholder="ex. Plants in the BOARDROOM" value={this.state.title}onChange={this.updateTitle}></input>
                                </div>
                            </div>
                            <div class="mb-3 space-y-2 w-full text-sm">
                                <label class=" font-semibold text-gray-800 py-2">Time to water plant (in SECONDS)</label>
                                <div class="flex flex-wrap items-stretch w-full mb-4 relative">
                                    <input type="number" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border h-10 border-grey-light rounded-lg px-3 relative focus:border-blue focus:shadow" defaultValue='10' value={this.state.timeToWater}onChange={this.updateTimeToWater}></input>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div class="ml-auto p-1">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={this.submit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlantAddModal;