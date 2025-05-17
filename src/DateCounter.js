import { useState } from "react";


export default function DateCounter() {

  /*******************************************************************************/

  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  /*******************************************************************************/

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  /*******************************************************************************/

  function dec() {
    // setCount((count) => count - 1);
    setCount((count) => count - step);
  };


  function inc() {
    // setCount((count) => count + 1);
    setCount((count) => count + step);
  };


  function defineCount(e) {
    setCount(Number(e.target.value));
  };


  function defineStep(e) {
    setStep(Number(e.target.value));
  };


  function reset() {
    setCount(0);
    setStep(1);
  };

  /*******************************************************************************/

  return (

    <div className="counter">

      <div>

        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />

        <span>{step}</span>

      </div>

      <div>

        <button onClick={dec}>-</button>

        <input value={count} onChange={defineCount} />

        <button onClick={inc}>+</button>

      </div>

      <p>{date.toDateString()}</p>

      <div>

        <button onClick={reset}>Reset</button>

      </div>

    </div>

  );

};