export default function Option({ question, dispatch, answer }) {

     const hasAnswered = answer !== null;

     return (

          <div className="options">

               {question.options.map((option, index) =>

                    <button
                         className={`btn btn-option 
                                   ${answer === index ? "answer" : ""}
                                   ${hasAnswered ?
                                   (index === question.correctOption ? "correct" : "wrong")
                                   : ""}`}
                         onClick={() => dispatch({ type: "newAnswer", payload: index })}
                         disabled={hasAnswered}
                         key={option}>{option}</button>

               )
               }

          </div >

     )

};