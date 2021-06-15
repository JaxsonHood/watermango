import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint, faSeedling, faPencilAlt, faHandHoldingWater, faPlayCircle, faSpa, faFillDrip } from '@fortawesome/free-solid-svg-icons'

class FlowerCard extends Component {

  render () {

    let waterStatusTop = <div className="w-24 h-20 rounded-3xl p-1">
        <div className='text-xs font-bold text-gray-600'>can water</div>
        <div className='text-3xl'><span className='text-gray-300'>in</span> {this.props.waterTime}</div>
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

    return (
        <div className='w-56'>
            <div className='w-full p-3 bg-gray-50 rounded-3xl mx-auto hover:shadow-sm border-2 border-gray-100 cursor-pointer transform duration-300 ease-in-out hover:-translate-y-1'>
                <div className='grid grid-cols-2 gap-2 p-1'>
                    <div className="w-20 h-20 p-3 pt-4 bg-gray-100 rounded-3xl text-gray-300 border border-gray-50 hover:border-gray-100">
                        <FontAwesomeIcon size='3x' icon={faSpa} />
                    </div>
                    {waterStatusTop}
                </div>
                <div className='h-16 font-bold p-2 overflow-hidden text-base'>{this.props.title}</div>
                <div>
                    {/* <div className='p-1 pt-0 text-xs font-bold text-gray-600'>Actions:</div> */}
                    <div className='pt-2 grid grid-cols-2 gap-2'>
                        <div className='text-center p-3 py-2 px-3 text-md font-semibold border-t-2 border-gray-50 hover:border-gray-600 text-gray-600 hover:text-gray-800'>
                                <div>Edit</div>
                                <div className='flex items-center justify-center pt-1'><FontAwesomeIcon icon={faPencilAlt} /></div>
                        </div>
                        <div className={waterButtonClasses}>
                                <div>Water</div>
                                <div className='flex items-center justify-center pt-1 text-blue-500'><FontAwesomeIcon size="lg" icon={faPlayCircle} /></div>
                        </div>
                    </div>
                </div>

                <div className='pt-2'>
                    <div className='p-1 text-xs font-bold text-gray-600'>Status:</div>
                    {waterStatusUI}
                </div>
            </div>
        </div>
    );
  }
}

export default FlowerCard;