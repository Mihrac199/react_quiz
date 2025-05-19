import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import { Loader, Error } from "./_element.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";


const initialState = {

     questions: [],

     // "loading" , "error" , "ready" , "active" , "finished"
     status: "loading"

};


function reducer(state, action) {

     switch (action.type) {

          case "dataReceived":
               return { ...state, questions: action.payload, status: "ready" }

          case "dataFailed":
               return { ...state, status: "error" }

          case "start":
               return { ...state, status: "active" }

          default:
               throw new Error("Action Unkonwn");

     };

};


export default function App() {


     const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

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
                    {status === "ready" && <StartScreen questionsNum={numQuestions} dispatch={dispatch} />}
                    {status === "active" && <Question />}
                    {status === "error" && <Error />}
               </Main>

          </div >


     );

};