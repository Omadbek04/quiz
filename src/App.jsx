import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import MainWrap from "./components/MainWrap";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScren from "./components/FinishScren";

import Timer from "./components/Timer";
import Footer from "./components/Footer";
import { useQuiz } from "./context/QuizContext";

function App() {
  const {status}=useQuiz()
  return (
    <div className="app">
      <Header />

      <MainWrap>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "active" && (<Progress/>)}
        {status === "ready" && (<StartScreen/>)}
        {status === "active" && (<>
        <Footer><Questions/><Timer /> <NextButton/></Footer></> )}
        {status === "finish" && (<FinishScren/>)}
      </MainWrap>
    </div>
  );
}
export default App;
