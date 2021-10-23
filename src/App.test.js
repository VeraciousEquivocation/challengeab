import React,{useEffect} from 'react';
import { render, screen,act } from '@testing-library/react';
import user from '@testing-library/user-event'
import { format } from 'date-fns'
import App from './App';

const RealDate = Date.now

// Fake timers using Jest
beforeEach(() => {
  jest.useFakeTimers()
  global.Date.now = jest.fn(()=>new Date(1633860610000))
})
afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})
afterAll(()=>{
  global.Date.now = RealDate
})

test('check start/stop and what user sees', async () => {
  render(<App />);

  // make sure user cannot run the timer without a description
  const startBtn = screen.getByText('Start Timer');
  user.click(startBtn)
  expect(screen.queryByText('Stop Timer')).not.toBeInTheDocument()
  
  // add description to input
  const input = screen.getByLabelText('description-input')
  user.type(input, 'jogging')
  
  expect(input.value).toBe('jogging')

  user.click(startBtn)

  // awaiting state update, check for button replacement
  expect(await screen.findByText('Stop Timer')).toBeInTheDocument()
  
  // advance fake date and fake timer by 3
  // appear to need to advance fake date before fake timer.
  global.Date.now = jest.fn(()=>new Date(1633860613000))

  // act is required due to updating state in useEffect
  act(()=>jest.advanceTimersByTime(3000))

  // check that the seconds in the timer display has updated
  const timerSeconds = await screen.findByTestId('timer-seconds')
  expect(timerSeconds.textContent).toEqual('3')

  // stopping timer to set the activityhistory data
  const stopBtn = screen.getByText('Stop Timer');
  user.click(stopBtn)
  
  // grab the updated table elements the user should see
  const started = await screen.findByTestId('start-0')
  const stopped = await screen.findByTestId('stop-0')
  const duration = await screen.findByTestId('duration-0')
  const desc = await screen.findByTestId('desc-0')

  // grab seconds for comparison
  let startedAtSeconds = parseInt(started.textContent.slice(-2))
  let stoppedAtSeconds = parseInt(stopped.textContent.slice(-2))
  
  // format the fake dates for comparison
  const testLocalStartDate = format(new Date(1633860610000), 'MMM dd, yyy, K:mm:ss')
  const testLocalEndDate = format(new Date(1633860613000), 'MMM dd, yyy, K:mm:ss')

  // test what user should see
  expect(startedAtSeconds).toBeLessThan(stoppedAtSeconds)
  expect(started.textContent).toEqual(testLocalStartDate)
  expect(stopped.textContent).toEqual(testLocalEndDate)
  expect(duration.textContent).toEqual('0:0:0:3')
  expect(desc.textContent).toEqual('jogging')

});
