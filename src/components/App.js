import { useEffect, useReducer } from "react";
import Header from "./Header";
import { Main, Loader, Error, Footer } from "./_element.js";
import { SECS_PER_QUESTİON } from "./_config.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import NextButton from "./NextButton.js";
import Progress from "./Progress.js";
import FinishScreen from "./FinishScreen.js";
import Timer from "./Timer.js";


const initialState = {

     questions: [],
     status: "loading", // "loading" , "error" , "ready" , "active" , "finished"
     index: 0,
     answer: null,
     points: 0,
     highscore: 0,
     secondsRemaining: null,

};


function reducer(state, action) {

     switch (action.type) {

          case "dataReceived":
               return { ...state, questions: action.payload, status: "ready" }

          case "dataFailed":
               return { ...state, status: "error" }

          case "start":
               return { ...state, status: "active", secondsRemaining: state.questions?.length * SECS_PER_QUESTİON }

          case "finish":
               return {
                    ...state, status: "finished",
                    highscore:
                         state.points > state.highscore ?
                              state.points :
                              state.highscore
               }

          case "restart":
               return { ...initialState, questions: state.questions, status: "active" }

          case "newAnswer":

               const question = state.questions[state.index];

               return {
                    ...state,
                    answer: action.payload,
                    points: action.payload === question.correctOption ? state.points + question.points : state.points
               }

          case "newQuestion":
               return { ...state, answer: null, index: state.index + 1 }

          case "tick":
               return {
                    ...state, secondsRemaining: state.secondsRemaining--,
                    status:
                         state.secondsRemaining === 0 ? "finished" : state.status
               }

          default:
               throw new Error("Action Unkonwn");

     };

};


export default function App() {


     const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);

     const numQuestions = questions.length;

     let maxPossiblePoints = 0;
     for (const question of questions) {
          maxPossiblePoints += question.points;
     };


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

                    {status === "error" && <Error />}

                    {status === "ready" &&

                         <StartScreen
                              questionsNum={numQuestions}
                              dispatch={dispatch} />}

                    {status === "active" &&

                         <>
                              <Progress
                                   answer={answer}
                                   index={index}
                                   numQuestions={numQuestions}
                                   points={points}
                                   maxPossiblePoints={maxPossiblePoints} />

                              <Question
                                   question={questions[index]}
                                   dispatch={dispatch}
                                   answer={answer} />

                              <Footer>

                                   <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
                                   <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />

                              </Footer>

                         </>
                    }

                    {status === "finished" &&

                         <FinishScreen dispatch={dispatch} points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} />}

               </Main>

          </div >


     );

};