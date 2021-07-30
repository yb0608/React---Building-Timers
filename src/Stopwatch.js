import { AppContext } from "./AppProvider";
import React, { useContext, useState, useEffect } from "react";
import A from "./A";

function Stopwatch(props) {
  const {
    timeConvert,
    running,
    singleRun,
    refIndex,
    setRefIndex,
    delay,
    useInterval,
    removeTimer,
  } = useContext(AppContext);

  const [min, sec] = timeConvert(props.timeCap);
  const [newTime, setNewTime] = useState(0);
  const [newMin, newSec] = timeConvert(newTime);
  let isCurrent = `${props.index}` === `${refIndex}` && running && singleRun;

  // ******* Start *******//
  useInterval(
    () => {
      setNewTime(newTime + 1);
    },
    isCurrent ? delay : null
  );

  // ******* Go To Next *******//
  useEffect(() => {
    if (`${newTime}` === `${props.timeCap}`) {
      setRefIndex(refIndex + 1);
    }
  }, [newTime, props.timeCap]);

  // ******* Reset *******//
  useEffect(() => {
    if (!running) {
      setNewTime(0);
    }
  }, [running]);

  return (
    <div
      className="single-clock"
      style={{ backgroundColor: isCurrent ? "rgb(165, 124, 243, 0.8)" : null }}
    >
      <br />
      <h2>{props.type}</h2>
      <p>
        TIME CAP : {min} min {sec} s
      </p>
      <div className="clock">
        <span>{newMin >= 10 ? newMin : "0" + newMin} </span>&nbsp;:&nbsp;
        <span> {newSec >= 10 ? newSec : "0" + newSec}</span>
      </div>
      <br />
      {(!running || !singleRun) && (
        <A
          className="buttons"
          id="remove"
          text="Remove"
          onClick={() => {
            removeTimer(props.cap, props.id);
          }}
        ></A>
      )}
      <br />
      <br />
    </div>
  );
}

export default Stopwatch;
