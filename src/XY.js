import AppProvider, { AppContext } from "./AppProvider";
import React, { useContext, useState, useEffect } from "react";
import A from "./A";

function XY(props) {
  const {
    timeConvert,
    running,
    singleRun,
    delay,
    useInterval,
    refIndex,
    setRefIndex,
    removeTimer,
  } = useContext(AppContext);

  const [min, sec] = timeConvert(props.timePerRound);
  const [newTime, setNewTime] = useState(props.timePerRound);
  const [newMin, newSec] = timeConvert(newTime);
  const [currentRound, setCurrentRound] = useState(0);
  let isCurrent = `${props.index}` === `${refIndex}` && running && singleRun;

  // ******* Start *******//
  useInterval(
    () => {
      setNewTime(newTime - 1);
    },
    isCurrent ? delay : null
  );

  // ******* Set currentRound to 1 indicates timer started *******//
  // ******* Initial is 0 to avoid confusion *******//
  useEffect(() => {
    if (isCurrent && currentRound === 0) {
      setCurrentRound(1);
    }
  }, [isCurrent, currentRound]);

  // ******* Go To Next *******//
  useEffect(() => {
    if (currentRound === props.rounds && newTime === 0) {
      setNewTime(0);
      setRefIndex(refIndex + 1);
    } else if (newTime < 0) {
      setCurrentRound(currentRound + 1);
      setNewTime(props.timePerRound);
    }
  }, [newTime, currentRound]);

  // ******* Reset *******//
  useEffect(() => {
    if (!running) {
      setNewTime(props.timePerRound);
      setCurrentRound(0);
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
        Time/Round : {min} min {sec} s | Rounds: {props.rounds}
      </p>
      <p>Current Round: {currentRound}</p>
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

export default XY;
