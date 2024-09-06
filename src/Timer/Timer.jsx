import { useEffect, useState, useRef } from 'react';

const Timer = () => {

const [isRunning, setIsRunning] = useState(false);
const [elapsedTime, setElapsedTime] = useState(0);
const [lapTimes, setLapTimes] = useState([]);
const intervalIdRef = useRef(null);
const startTimeRef = useRef(0);

useEffect(() => {

  if(isRunning){
    intervalIdRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTimeRef.current);
    }, 100);
  } else {
    clearInterval(intervalIdRef.current);
  }

  return () => {
    clearInterval(intervalIdRef.current);
  };

}, [isRunning]);

const start = () => {
  setIsRunning(true);
  startTimeRef.current = Date.now() - elapsedTime;
}

const pause = () => {
  setIsRunning(false);
  setLapTimes([...lapTimes, formatTime()]);
}

const reset = () => {
  setElapsedTime(0);
  setLapTimes([]);
  setIsRunning(false);
}

const resume = () => {
  setIsRunning(true);
  startTimeRef.current = Date.now() - elapsedTime;
}

const formatTime = () => {

  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
  let seconds = Math.floor(elapsedTime / (1000) %60);
  let milliseconds = Math.floor((elapsedTime % 1000) / 10);

  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");
  milliseconds = String(milliseconds).padStart(2, "0");

    return `${minutes}:${seconds}:${milliseconds}`;
}

  return (
    <section className='flex items-center justify-center min-h-screen bg-blue-200'>
      <div className='w-[280px] h-[175px] flex flex-col items-center justify-center border-4 border-white shadow-[0px_6px_10px#ffffff] rounded-2xl gap-2 bg-pink-300'>
      <h1 className='text-4xl text-white font-monospace font-bold'>{formatTime()}</h1>
        <div className='grid grid-cols-4 gap-2'>
          <button className='bg-green-500 w-[60px] h-[30px] text-white font-semibold shadow-[0px_1px_6px#f7f7f7] transition hover:bg-green-400 rounded-xl'onClick={start}>Start</button>
          <button className='bg-blue-700 w-[60px] h-[30px] text-white font-semibold shadow-[0px_1px_6px#f7f7f7] transition hover:bg-blue-500 rounded-xl'onClick={reset}>Reset</button>
          <button className='bg-red-600 w-[60px] h-[30px] text-white font-semibold shadow-[0px_1px_6px#f7f7f7] transition hover:bg-red-400 rounded-xl'onClick={pause}>Pause</button>
          <button className='bg-yellow-400 w-[60px] h-[30px] text-white font-semibold shadow-[0px_1px_6px#f7f7f7] transition hover:bg-yellow-300 rounded-xl' onClick={resume}>Resume</button>
        </div>
        <div className='mt-5 w-full max-h-40 overflow-y-auto'>
            <h2 className='text-white text-center font-semibold'>Lap Times:</h2>
            <ul className='list-disc pl-5'>
              {lapTimes.map((lap, index) => (
                <li key={index} className='py-1'>{lap}</li>
              ))}
            </ul>
          </div>
      </div>
    </section>
  );
}

export default Timer