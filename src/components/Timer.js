import { useEffect } from "react"

export default function Timer({ dispatch, secondsRemaining }) {

     const mins = Math.floor(secondsRemaining / 60);
     const seconds = secondsRemaining % 60;

     useEffect(function () {

          const timer = setInterval(function () {
               dispatch({ type: "tick" })
          }, 1000);

          return () => clearInterval(timer);

     }, [dispatch]);


     return (

          <div div className="timer">{mins < 10 && "0"}{mins}:{seconds < 10 && "0"}{seconds}</div >

     );

};