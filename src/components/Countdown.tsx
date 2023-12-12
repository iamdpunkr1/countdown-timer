import  { useState, useEffect } from 'react';


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

    <div className="text-center mt-8">
      <label htmlFor="minutes" className="text-sm">Enter Minutes</label><br />
      <input type="number" min={0} value={value} onChange={handleChange} />
      
      <div className="text-4xl">
        {String(hours).padStart(2,'0') }:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <p className='mb-3'>hour : min : sec</p>

      {!isRunning && (
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleStart}
          >
            Play
        </button>
      )}

      {isRunning && (
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          onClick={handlePause}
        >
          Pause
        </button>
      )}

      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>

  )
}



export default Countdown