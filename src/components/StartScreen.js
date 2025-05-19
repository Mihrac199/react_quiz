export default function StartScreen({ questionsNum, dispatch }) {

     return (

          <div className="start">

               <h2>Welcome To The React Quiz...</h2>
               <h3>{questionsNum} Question To Test Your React Mastery.</h3>
               <button className="btn btn-ui" onClick={() => dispatch({ type: "start" })}>Let's Start</button>

          </div>

     );

};