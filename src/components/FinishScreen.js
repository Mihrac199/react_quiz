export default function FinishScreen({ dispatch, points, maxPossiblePoints, highscore }) {

     const percentage = (points * 100) / maxPossiblePoints;

     let emoji;
     if (percentage === 100) emoji = "🥇";
     if (percentage >= 80 && percentage < 100) emoji = "🥈";
     if (percentage >= 50 && percentage < 80) emoji = "🥉";
     if (percentage > 0 && percentage < 50) emoji = "😠";
     if (percentage === 0) emoji = "🧠";

     return (

          <>

               <p className="result">
                    <span>{emoji}</span>You Scored <strong>{points}</strong> Out Of <strong>{maxPossiblePoints}</strong> <strong>{Math.ceil(percentage)}%</strong>
               </p>

               <p className="highscore">
                    <strong>Highscore: {highscore} Points</strong>
               </p>

               <button
                    className="btn btn-ui"
                    onClick={() => dispatch({ type: "restart" })}>Restart
               </button>

          </>
     );

};