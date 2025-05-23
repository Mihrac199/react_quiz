import { useEffect, useReducer } from "react";
import Header from "./Header";
import { Main, Loader, Error } from "./_element.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";


const initialState = {

     questions: [],
     status: "loading", // "loading" , "error" , "ready" , "active" , "finished"
     index: 0,
     answer: null,
     points: 0,

};


function reducer(state, action) {

     switch (action.type) {

          case "dataReceived":
               return { ...state, questions: action.payload, status: "ready" }

          case "dataFailed":
               return { ...state, status: "error" }

          case "start":
               return { ...state, status: "active" }

          case "newAnswer":

               const question = state.questions[state.index];

               return {
                    ...state,
                    answer: action.payload,
                    points: action.payload === question.correctOption ? state.points + question.points : state.points
               }

          default:
               throw new Error("Action Unkonwn");

     };

};


export default function App() {


     const [{ questions, status, index, answer }, dispatch] = useReducer(reducer, initialState);

     const numQuestions = questions.length;


     useEffect(function () {

          fetch("http://localhost:9000/questions")
               .then(res => res.json())
               .then(data => dispatch({ type: "dataReceived", payload: data }))
               .catch(err => dispatch({ type: "dataFailed", payload: err }));

     }, []);


     return (

          <div className="app">

               <Header />

               <Main>
                    {status === "loading" && <Loader />}

                    {status === "ready" && <StartScreen
                         questionsNum={numQuestions}
                         dispatch={dispatch} />}

                    {status === "active" && <Question
                         question={questions[index]}
                         dispatch={dispatch}
                         answer={answer} />}

                    {status === "error" && <Error />}
               </Main>

          </div >


     );

};