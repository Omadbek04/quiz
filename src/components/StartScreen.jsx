import { useQuiz } from "../context/QuizContext";

const StartScreen = () => {
  const { numberOfQuestions, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2 className="h2"> Welcome ro The React Quiz</h2>
      <h3 className="h3">
        {" "}
        {numberOfQuestions} Questions to test your React mastery
      </h3>
      <button className="btn" onClick={() => dispatch({ type: "start" })}>
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
