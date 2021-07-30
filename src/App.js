import React, { useContext, useState } from "react";
import AppProvider, { AppContext } from "./AppProvider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import Stopwatch from "./Stopwatch";
import Countdown from "./Countdown";
import XY from "./XY";
import Tabata from "./Tabata";
import A from "./A";
import "./App.css";

// ******************************** HOME SCREEN ********************************//
const Home = () => {
  const {
    sum,
    message,
    running,
    singleRun,
    timeConvert,
    getTimers,
    runTimers,
    pauseTimers,
    resetTimers,
    startNotice,
    resetNotice,
    pauseNotice,
  } = useContext(AppContext);
  const [min, sec] = timeConvert(sum);

  const length = getTimers().length;
  return (
    <div>
      <div>
        <h1>Customize Your Workout Timer</h1>
        {length === 0 && <p>There are no timers added.</p>}
      </div>
      {length !== 0 && (
        <p>
          Total Work Out Time: {min} min {sec} s
          <br />
          <br />
        </p>
      )}
      {length !== 0 && (
        <p className="message">
          <strong>{message}</strong>
        </p>
      )}

      <br />
      <Timers />
      <br />
      {(!running || !singleRun) && (
        <Link to="/add">
          <A className="buttons" text="Add Timer(s)"></A>
        </Link>
      )}
      <br />
      {length > 1 && (
        <p className="message">
          <strong>{message}</strong>
        </p>
      )}
      <br />
      {length !== 0 && (
        <div>
          <A
            className="buttons"
            id="start"
            text="Start"
            onClick={() => {
              runTimers();
              startNotice();
            }}
          ></A>
          <A
            className="buttons"
            id="stop"
            text="Pause"
            onClick={() => {
              pauseTimers();
              pauseNotice();
            }}
          ></A>
          <A
            className="buttons"
            id="reset"
            text="Reset"
            onClick={() => {
              resetTimers();
              resetNotice();
            }}
          ></A>
        </div>
      )}
    </div>
  );
};

const Timers = () => {
  const { getTimers } = useContext(AppContext);

  return getTimers().map((t, timerIndex) => {
    if (t.type === "stopwatch") {
      return (
        <div key={t.id} id={t.id}>
          <Stopwatch
            id={t.id}
            type={t.type.toUpperCase()}
            index={timerIndex}
            timeCap={t.timeCap}
            cap={t.cap}
          />
        </div>
      );
    }
    if (t.type === "countdown") {
      return (
        <div key={t.id} id={t.id}>
          <Countdown
            id={t.id}
            type={t.type.toUpperCase()}
            index={timerIndex}
            startTime={t.startTime}
            cap={t.cap}
          />
        </div>
      );
    }
    if (t.type === "xy") {
      return (
        <div key={t.id} id={t.id}>
          <XY
            id={t.id}
            type={t.type.toUpperCase()}
            index={timerIndex}
            timePerRound={t.timePerRound}
            rounds={t.rounds}
            cap={t.cap}
          />
        </div>
      );
    }
    if (t.type === "tabata") {
      return (
        <div key={t.id} id={t.id}>
          <Tabata
            id={t.id}
            type={t.type.toUpperCase()}
            index={timerIndex}
            workTime={t.workTime}
            restTime={t.restTime}
            rounds={parseInt(t.rounds)}
            cap={t.cap}
          />
        </div>
      );
    }
  });
};

// ******************************** HOME SCREEN END ********************************//

// ******************************** ADD SCREEN ********************************//
const Add = () => {
  const [type, setType] = useState("");
  const history = useHistory();
  const {
    addTimer,
    setTimeCap,
    setStartTime,
    setTimePerRound,
    setWorkTime,
    setRestTime,
    setRounds,
    setSum,
    sum,
    timeCap,
    startTime,
    timePerRound,
    workTime,
    restTime,
    rounds,
  } = useContext(AppContext);

  return (
    <div>
      <br />
      <br />
      <Link to="/">
        <A className="buttons" text="Home"></A>
      </Link>
      <div className="selection">
        <h1>SELECT YOUR TIMER</h1>
        <A
          className="buttons"
          onClick={() => {
            setType("stopwatch");
          }}
          text="STOPWATCH"
        ></A>
        <A
          className="buttons"
          onClick={() => {
            setType("countdown");
          }}
          text="COUNTDOWN TIMER"
        ></A>
        <A
          className="buttons"
          onClick={() => {
            setType("xy");
          }}
          text="XY TIMER"
        ></A>
        <A
          className="buttons"
          onClick={() => {
            setType("tabata");
          }}
          text="TABATA"
        ></A>
      </div>

      <div>
        {type === "stopwatch" && (
          <div>
            <br />
            <label>SET YOUR TIME CAP HERE: </label>
            <input
              type="number"
              placeholder="seconds"
              onChange={(e) => {
                setTimeCap(parseInt(e.target.value));
              }}
            ></input>
            <br />
            <br />
            <A
              className="buttons"
              onClick={() => {
                addTimer({ type: type, timeCap: timeCap, cap: timeCap });
                history.push("/");
                setSum(parseInt(sum) + parseInt(timeCap));
              }}
              text="Add"
            ></A>
          </div>
        )}

        {type === "countdown" && (
          <div>
            <br />
            <label>SET YOUR START TIME HERE: </label>
            <input
              type="number"
              placeholder="seconds"
              onChange={(e) => {
                setStartTime(parseInt(e.target.value));
              }}
            ></input>
            <br />
            <br />
            <A
              className="buttons"
              onClick={() => {
                addTimer({ type: type, startTime: startTime, cap: startTime });
                history.push("/");
                setSum(parseInt(sum) + parseInt(startTime));
              }}
              text="Add"
            ></A>
          </div>
        )}

        {type === "xy" && (
          <div>
            <br />
            <label> TIME/Round : </label>
            <input
              type="number"
              placeholder="seconds"
              onChange={(e) => {
                setTimePerRound(parseInt(e.target.value));
              }}
            ></input>
            <label>Rounds : </label>
            <input
              type="number"
              placeholder="rounds"
              onChange={(e) => {
                setRounds(parseInt(e.target.value));
              }}
            ></input>
            <br />
            <br />
            <A
              className="buttons"
              onClick={() => {
                const cap = parseInt(timePerRound) * parseInt(rounds);
                addTimer({
                  type: type,
                  timePerRound: timePerRound,
                  rounds: rounds,
                  cap: cap,
                });
                history.push("/");
                setSum(parseInt(sum) + cap);
              }}
              text="Add"
            ></A>
          </div>
        )}

        {type === "tabata" && (
          <div>
            <br />
            <label> WORK TIME : </label>
            <input
              type="number"
              placeholder="seconds"
              onChange={(e) => {
                setWorkTime(parseInt(e.target.value));
              }}
            ></input>
            <label> REST TIME : </label>
            <input
              type="number"
              placeholder="seconds"
              onChange={(e) => {
                setRestTime(parseInt(e.target.value));
              }}
            ></input>
            <label>Rounds : </label>
            <input
              type="number"
              placeholder="rounds"
              onChange={(e) => {
                setRounds(parseInt(e.target.value));
              }}
            ></input>
            <br />
            <br />
            <A
              className="buttons"
              onClick={() => {
                const cap =
                  (parseInt(workTime) + parseInt(restTime)) * parseInt(rounds);

                addTimer({
                  type: type,
                  workTime: workTime,
                  restTime: restTime,
                  rounds: rounds,
                  cap: cap,
                });

                history.push("/");
                setSum(parseInt(sum) + cap);
              }}
              text="Add"
            ></A>
          </div>
        )}
      </div>
    </div>
  );
};

// ******************************** ADD SCREEN END ********************************//

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route path="/add">
            <Add />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </AppProvider>
  );
}
