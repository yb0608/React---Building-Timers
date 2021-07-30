import React, { useState, useEffect, useRef } from "react";

// ******************************** CONTEXT ********************************//

const AppContextClass = React.createContext({});

// ********************** Timers **********************//
const AppProvider = ({ children }) => {
  const [timers, setTimers] = useState([]);
  const [timeCap, setTimeCap] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [timePerRound, setTimePerRound] = useState(0);
  const [workTime, setWorkTime] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [sum, setSum] = useState(0);
  const [remain, setRemain] = useState(0);
  const [refIndex, setRefIndex] = useState(0);
  const [singleRun, setSingleRun] = useState(false);
  const [running, setRunning] = useState(false);

  const addTimer = (timer) => {
    setTimers((prevTimers) => [
      ...prevTimers,
      {
        id: new Date().getTime(),
        ...timer,
      },
    ]);
  };

  const getTimers = () => timers;

  // ********************** Run Timer Function **********************//

  const runTimers = () => {
    // context state
    setRunning(true);
    //single timer state
    setSingleRun(true);
  };

  const pauseTimers = () => {
    setSingleRun(false);
  };

  const resetTimers = () => {
    setRunning(false);
    setSingleRun(false);
    setRefIndex(0);
  };

  const delay = 1000;
  function useInterval(callback, delay) {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  // Time up //
  useEffect(() => {
    if (refIndex === timers.length && running) {
      resetTimers();
      finishNotice();
    }
  }, [refIndex, running]);

  // ********************** Remove Timer Function **********************//

  const removeTimer = (cap, id) => {
    //find the timer, return new array of timers
    const newTimers = timers.filter((t) => `${t.id}` !== `${id}`);
    // return new timers
    setTimers(newTimers);
    // update sum time
    setSum(sum - cap);
  };

  // ********************** State Message **********************//

  const [message, setMessage] = useState("");

  const startNotice = () => {
    return setMessage("Timer(s) Started.");
  };

  const pauseNotice = () => {
    return setMessage("Timer(s) Paused.");
  };

  const resetNotice = () => {
    return setMessage("Timer(s) Reset.");
  };

  const finishNotice = () => {
    return setMessage("Time Is Up.");
  };

  // ********************** Time Convert **********************//

  const timeConvert = (timeInput) => {
    var min, sec;
    timeInput = parseInt(timeInput);
    if (0 <= timeInput <= 59) {
      sec = timeInput;
      min = 0;
    }
    if (timeInput > 60) {
      min = Math.floor(timeInput / 60);
      sec = timeInput % 60;
    }
    if (timeInput === 60) {
      sec = 0;
      min = 1;
    }
    return [min, sec];
  };

  // ********************** For App **********************//

  return (
    <AppContextClass.Provider
      value={{
        AppProvider,
        addTimer,
        getTimers,
        message,
        startNotice,
        resetNotice,
        finishNotice,
        pauseNotice,
        timeCap,
        setTimeCap,
        startTime,
        setStartTime,
        timePerRound,
        setTimePerRound,
        workTime,
        setWorkTime,
        restTime,
        setRestTime,
        rounds,
        setRounds,
        sum,
        setSum,
        running,
        setRunning,
        refIndex,
        setRefIndex,
        singleRun,
        runTimers,
        remain,
        setRemain,
        pauseTimers,
        resetTimers,
        timeConvert,
        removeTimer,
        delay,
        useInterval,
      }}
    >
      {children}
    </AppContextClass.Provider>
  );
};

export { AppContextClass as AppContext };
export default AppProvider;
// ******************************** CONTEXT END ********************************//
