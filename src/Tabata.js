import { AppContext } from "./AppProvider";
import React, { useContext, useState, useEffect } from "react";
import A from "./A";

function Tabata(props) {
  const {
    timeConvert,
    running,
    delay,
    singleRun,
    refIndex,
    setRefIndex,
    useInterval,
    removeTimer,
  } = useContext(AppContext);

  const [workMin, workSec] = timeConvert(props.workTime);
  const [restMin, restSec] = timeConvert(props.restTime);
  const [newTime, setNewTime] = useState(props.workTime);
  const [newMin, newSec] = timeConvert(newTime);
  const [currentRound, setCurrentRound] = useState(0);
  //To shift between workTime and restTime
  const [change, setChange] = useState(0);
  const [mode, setMode] = useState("");

  let isCurrent = `${props.index}` === `${refIndex}` && running && singleRun;

  // ******* Start *******//
  useInterval(
    () => {
      setNewTime(newTime - 1);
    },
    isCurrent ? delay : null
  );

  // ******* Go To Next *******//
  useEffect(() => {
    if (currentRound === parseInt(props.rounds) && newTime === 0) {
      setRefIndex(refIndex + 1);
      setMode("Work Time Now");
    } else if (newTime === -1) {
      if (change === 0) {
        setNewTime(props.restTime);
        setCurrentRound(currentRound + 1);
        setMode("Rest Time Now");
        setChange(1);
      } else {
        setNewTime(props.workTime);
        setMode("Work Time Now");
        setChange(0);
      }
    }
  }, [newTime, currentRound]);

  // ******* Reset *******//
  useEffect(() => {
    if (!running) {
      setNewTime(props.workTime);
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
        Work Time : {workMin} min {workSec} s <br /> Rest Time: {restMin}min
        {restSec}s <br /> Rounds: {props.rounds}{" "}
      </p>
      <p>Current Round: {currentRound}</p>
      {mode.length !== 0 && <small> {mode} </small>}
      {mode.length === 0 && <small> Work Time Now </small>}
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

export default Tabata;
