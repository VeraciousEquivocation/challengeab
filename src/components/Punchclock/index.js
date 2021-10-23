import React,{useEffect,useState} from 'react';
import { intervalToDuration } from 'date-fns'
import produce from "immer"
import Punch from './Punch'
import Timetable from './Timetable'

// parent component for data handling/sharing of activity history

const Punchclock = ({active,policyId}) => {
    const [activityHistory, setActivityHistory] = useState([])
    const [duration, setduration] = useState({days:0,hours:0,minutes:0,seconds:0})

    // Check session storage for data
    useEffect(()=>{
        if(sessionStorage.getItem('activityhistory')) {
          let parsedData = JSON.parse(sessionStorage.getItem('activityhistory'))
          setActivityHistory(parsedData)
        }
    },[])

    // update session storage when activities are updated
    useEffect(()=>{
      sessionStorage.setItem('activityhistory', JSON.stringify(activityHistory));
    },[activityHistory])

    const handleClickStart = (desc) => {
      let newEntry = {
        id: activityHistory.length,
        start: new Date(Date.now()),
        desc: desc,
      }
      const baseState = activityHistory;

      setActivityHistory(produce(baseState, draftState => {
        draftState.push(newEntry)
      }))
    }

    const handleClickStop = (desc) => {
      const baseState = activityHistory;
      setActivityHistory(produce(baseState, draftState => {
        let updatedEntry = draftState[draftState.length-1];
        updatedEntry.stop = new Date(Date.now());
        updatedEntry.duration = intervalToDuration({start:new Date(baseState[baseState.length - 1].start), end:new Date(Date.now())});
      }))
    }

    if(!activityHistory) return null
    return (
        <>
            <Punch duration={duration} setduration={setduration} handleClickStart={handleClickStart} handleClickStop={handleClickStop} activeItem={activityHistory.filter(key=>{return !key.stop})[0]}/>
            <Timetable duration={duration} activityHistory={activityHistory} />
        </>
    );
}

export default Punchclock;