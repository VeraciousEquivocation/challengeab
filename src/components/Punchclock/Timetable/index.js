import React,{useState, useCallback} from 'react';
import { format } from 'date-fns'
import clsx from 'clsx'
import scss from './timetable.module.scss'


const Timetable = ({duration,activityHistory}) => {
    const [filter,setfilter] = useState('')

    // filter
    const handleClick = useCallback((e,desc) => {
        e.preventDefault()
        if(!desc)
            setfilter('')
        else
            setfilter(desc)
    },[filter])

    const handleMapRows = useCallback(()=>{
        if(filter) {
            return activityHistory.filter((obj) => {
                return obj.desc === filter
            }).map((obj,idx)=> {
            return (
                <section key={idx} className={clsx('flex text-white text-lg bg-gray-800 border-b-2 border-teal-800',[(idx === (activityHistory.length - 1))&&'border-none'],[idx%2!==0&&'bg-gray-900'])}>
                    <section data-testid={`start-${idx}`} className={clsx(scss.start,'p-3')}>{format(new Date(obj.start), 'MMM dd, yyy, K:mm:ss')}</section>
                    <section data-testid={`stop-${idx}`} className={clsx(scss.stop,'p-3')}>{obj.stop && format(new Date(obj.stop),'MMM dd, yyy, K:mm:ss')}</section>
                    <section data-testid={`duration-${idx}`} className={clsx(scss.duration,'p-3')}>
                        {(idx === (activityHistory.length - 1)) 
                            ? `${duration.days}:${duration.hours}:${duration.minutes}:${duration.seconds}`
                            :`${obj.duration.days}:${obj.duration.hours}:${obj.duration.minutes}:${obj.duration.seconds}`
                        }
                    </section>
                    <section data-testid={`desc-${idx}`} className={clsx(scss.desc,'p-3')}>{obj.desc}</section>
                </section>
            )
        })
        } else {
            return activityHistory.map((obj,idx)=> {
                return (
                    <section key={idx} className={clsx('flex text-white text-lg bg-gray-800 border-b-2 border-teal-800',[(idx === (activityHistory.length - 1))&&'border-none'],[idx%2!==0&&'bg-gray-900'])}>
                        <section data-testid={`start-${idx}`} className={clsx(scss.start,'p-3')}>{format(new Date(obj.start), 'MMM dd, yyy, K:mm:ss')}</section>
                        <section data-testid={`stop-${idx}`} className={clsx(scss.stop,'p-3')}>{obj.stop && format(new Date(obj.stop),'MMM dd, yyy, K:mm:ss')}</section>
                        <section data-testid={`duration-${idx}`} className={clsx(scss.duration,'p-3')}>
                            {(idx === (activityHistory.length - 1)&&!obj.stop ) 
                                ? `${duration.days}:${duration.hours}:${duration.minutes}:${duration.seconds}`
                                :`${obj.duration.days}:${obj.duration.hours}:${obj.duration.minutes}:${obj.duration.seconds}`
                            }
                        </section>
                        <section data-testid={`desc-${idx}`} onClick={(e)=>handleClick(e,obj.desc)} className={clsx(scss.desc,'transition-all p-3 hover:bg-teal-800 cursor-pointer')}>{obj.desc}</section>
                    </section>
                )
            })
        }
    },[activityHistory,duration,filter])

    return (
        <>
            <header className='text-3xl text-white mt-12 mb-4 uppercase'>Activities</header>
            <div className='drop-shadow-3xl pb-16'>
            {filter && <div className='inline-block'>
                <div onClick={handleClick} className='relative flex bg-teal-700 overflow-hidden text-white text-xl mb-4 rounded-full py-1 px-4 hover:bg-teal-800 cursor-pointer'><span className='mr-6'>{filter}</span><span className='absolute right-2 ml-auto rounded-full px-2 py-1 bg-teal-900 text-sm font-bold'>X</span></div>
            </div>
            }
            <div className='flex'>
                <header className='flex rounded-tl-lg rounded-tr-lg bg-teal-800 text-xl text-white'>
                    <section className={clsx(scss.start,' p-3')}>Start Time</section>
                    <section className={clsx(scss.stop,'p-3')}>End Time</section>
                    <section className={clsx(scss.duration,'p-3')}>Duration</section>
                    <section className={clsx(scss.desc,' p-3')}>Description</section>
                </header>
            </div>
            {activityHistory.length > 0
            ? handleMapRows()
            :
            <section className='flex'>
                <section className={clsx(scss.start,'bg-gray-800 p-3')}></section>
                <section className={clsx(scss.stop,'bg-gray-800 p-3')}></section>
                <section className={clsx(scss.duration,'bg-gray-800 p-3')}></section>
                <section className={clsx(scss.desc,'bg-gray-800 p-3')}></section>
            </section>
            }
            </div>
        </>
    );
}

export default Timetable;