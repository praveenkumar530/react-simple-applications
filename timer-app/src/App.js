import React, { useState, useEffect, Fragment } from "react";
import './App.css'

const App = () => {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const [displayTime, setDisplayTime] = useState("00:00");

  const toggle = () => {
    setIsActive(!isActive);
  };

  const start = () => {
    if (min >= 0 && sec >= 0) {
      let totalSeconds = min * 60 + sec;

      convertSec(totalSeconds);
      setSeconds(totalSeconds - 1);
      setIsActive(true);
    }
  };

  const reset = () => {
    setSeconds(0);
    setMin(0);
    setSec(0);
    setIsActive(false);
    setDisplayTime("00:00");
  };

  useEffect(() => {
    let interval = null;
    if (seconds >= 0) {
      if (isActive) {
        interval = setInterval(() => {
          convertSec(seconds);
        }, 1000);
      } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const convertSec = (s) => {
    let m = Math.floor(s / 60);

    s -= m * 60;
    if (m === 0) {
      m = "00";
    } else if (m.toString().length === 1) {
      m = "0" + m;
    }

    if (s === 0) {
      s = "00";
    } else if (s.toString().length === 1) {
      s = "0" + s;
    }

    const tmp = [];

    m && tmp.push(m + ":");

    tmp.push(s);

    setSeconds((seconds) => seconds - 1);
    setDisplayTime(tmp.join(""));
  };

  return (
    <Fragment>
      <div className="header">Timer App </div>
      <div className="app" style={{ marginTop: "30px" }}>
        <div className="input__controls">
          <label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
            />
            minutes
          </label>
          <label>
            <input
              type="number"
              value={sec}
              onChange={(e) => setSec(Number(e.target.value))}
            />
            seconds
          </label>
        </div>
        <div className="buttons">
          <button onClick={() => start()}>START</button>
          <button onClick={() => toggle()}>PAUSE / RESUME</button>
          <button onClick={() => reset()}>RESET</button>
        </div>

        <h1 className="display" data-testid="running-clock">
          {displayTime}
        </h1>
      </div>
    </Fragment>
  );
};

export default App;
