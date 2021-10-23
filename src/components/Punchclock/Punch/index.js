import React,{useCallback, useEffect, useState} from 'react';
import { intervalToDuration } from 'date-fns'
import clsx from 'clsx'
import scss from './punch.module.scss'

const Punch = ({activeItem, handleClickStop, handleClickStart, duration, setduration}) => {
    const [desc, setDesc] = useState('')

    // update visual timers
    useEffect(() => {
      const interval = setInterval(() => {
        if(activeItem) {
          setduration(intervalToDuration({start:new Date(activeItem.start), end:new Date(Date.now())}))
        } else {
          setduration({days:0,hours:0,minutes:0,seconds:0})
          clearInterval(interval)
        }
      }, 1000);

      // Clear interval if the component is unmounted
      return () => clearInterval(interval);
    },[activeItem]);

    const handleDescChange = useCallback((evt,val) => {
      evt.preventDefault()
      setDesc(val)
    },[])

    const handlePunchIn = (e) => {
      e.preventDefault()
      if(!desc || desc.trim() === '') return
      handleClickStart(desc)
      setDesc('')
    }

    return (
        <>
          <div className={clsx(scss.durationCards,'flex justify-around mb-16')}>
            <div className='bg-white h-60 w-40'>
              <section className='flex h-44 flex-col text-black justify-center items-center text-7xl'>{duration.days}</section>
              <header className='flex h-16 bg-teal-700 text-white justify-center items-center text-3xl uppercase'>days</header>
            </div>
            <div className='bg-white h-60 w-40'>
              <section className='flex h-44 flex-col text-black justify-center items-center text-7xl'>{duration.hours}</section>
              <header className='flex h-16 bg-teal-700 text-white justify-center items-center text-3xl uppercase'>hours</header>
            </div>
            <div className='bg-white h-60 w-40'>
              <section className='flex h-44 flex-col text-black justify-center items-center text-7xl'>{duration.minutes}</section>
              <header className='flex h-16 bg-teal-700 text-white justify-center items-center text-3xl uppercase'>minutes</header>
            </div>
            <div className='bg-white h-60 w-40'>
              <section data-testid='timer-seconds' className='flex h-44 flex-col text-black justify-center items-center text-7xl'>{duration.seconds}</section>
              <header className='flex h-16 bg-teal-700 text-white justify-center items-center text-3xl uppercase'>seconds</header>
            </div>
          </div>
          <form onSubmit={handlePunchIn} className="w-full max-w-md">
            <div className="flex items-center border-b border-teal-500 py-2">
              {!activeItem
               ? <>
                <input aria-label="description-input" value={desc} onChange={(e)=>handleDescChange(e,e.target.value)} className="appearance-none w-2/5 h-16 text-3xl bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Description" />
                <button onClick={handlePunchIn} className="flex-shrink-0 bg-teal-600 hover:bg-teal-700 text-xl text-white py-1.5 px-2.5 rounded" type="button">
                  Start Timer
                </button> 
              </>
              : <>
                <div className='w-full pl-2 pt-3.5 text-left h-16 text-white text-3xl'>{activeItem.desc}</div>
                <button onClick={handleClickStop} className="flex-shrink-0 ml-3 border-2 border-teal-500 hover:border-teal-700 text-teal-500 hover:text-teal-800 text-xl py-1 px-2 rounded" type="button">
                  Stop Timer
                </button>
              </>
              }
            </div>
          </form>
        </>
    );
}

export default Punch;