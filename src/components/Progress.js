export default function Progress({ answer, index, numQuestions, points, maxPossiblePoints }) {

     const hasAnswered = answer !== null;

     return (

          <header className="progress">

               <progress max={numQuestions} value={index + hasAnswered} />

               <p>Question <strong>{(index + 1)}</strong> / {numQuestions}</p>

               <p><strong>{points}</strong> / {maxPossiblePoints}</p>

          </header>
     );

};