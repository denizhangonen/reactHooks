import React, { useState, useEffect } from "react";

const Timer = props => {
  const [timerCount, setTimerCount] = useState(props.clickAmount);

  useEffect(() => {
    document.title = timerCount;
  }, [timerCount]);

  const calcFromTheFuture = () => {
    console.log("Yeap?");
    setTimeout(() => {
      console.log("Yeap1000?");
      setTimerCount(timerCount + 1);
      console.log(timerCount)
    }, 1000);
  };

  return (
    <div>
      <p>Das ist timer: {props.clickAmount}</p>
      <p onClick={() => calcFromTheFuture()}>Das ist timer: {timerCount}</p>
    </div>
  );
};

export default Timer;
