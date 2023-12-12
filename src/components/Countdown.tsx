import  { useState, useEffect } from 'react';
import Box from '../partials/Box';


const Countdown = () => {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [value, setValue] = useState(0)


  useEffect(() => {

    let countdownInterval: number;

    if (isRunning) {
      countdownInterval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if(hours === 0){
                clearInterval(countdownInterval);
                setIsRunning(false)
            }else{
              setHours((prev) => prev - 1);
              setMinutes(59);
              setSeconds(59);
            }
          } else {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        }else {
          setSeconds((prev) => prev - 1);
        }

      }, 1000);

    }

    return () => clearInterval(countdownInterval);

  }, [isRunning, minutes, seconds]);



  const handleStart = () => {
    setIsRunning(true);
  };



  const handleReset = () => {
    setIsRunning(false);
    setHours(0)
    setMinutes(0);
    setSeconds(0);

  };



  const handlePause = () => {
    setIsRunning(false);
  };



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const value = Number(event.target.value);
    setValue(value)

    if (value >= 60) {
      setHours(Math.floor(value / 60));
      setMinutes(value % 60);
    } else {
      // Reset hours to zero when minutes are less than 60
      setHours(0); 
      setMinutes(value);

    }

  }

  return (

    <div className="">
      <label htmlFor="minutes" className="text-gray-600 text-sm font-bold mb-4 z-2">Enter Minutes</label><br />
      <input className='w-full h-8 p-3 mb-5 text-gray-700 rounded-md z-10 input-field font-bold' type="number" min={0} value={value} onChange={handleChange} />

           
      <div className="flex justify-center gap-3 mb-4">
        <Box time={hours} label='hour' />
        <Box time={minutes} label='min' />
        <Box time={seconds} label='sec' />
      </div>
      
      <div className="flex justify-center gap-3 mt-4">
      {!isRunning && (
        <button
          className="btn text-green-400 font-bold py-2 px-8 rounded"
          onClick={handleStart}
          >
            Start
        </button>
      )}

      {isRunning && (
        <button
          className="btn text-yellow-400 font-bold py-2 px-8 rounded"
          onClick={handlePause}
        >
          Pause
        </button>
      )}

      <button
        className="btn text-red-400 font-bold py-2 px-8 rounded"
        onClick={handleReset}
      >
        Reset
      </button>
      </div>
    </div>

  )
}



export default Countdown