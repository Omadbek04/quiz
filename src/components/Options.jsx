import { useQuiz } from "../context/QuizContext";

const Options = ({options,correctOption } ) => {
  const { dispatch, answer }= useQuiz();
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {options.map((option, index) => {
        return (
          <button
            key={index}
            className={`btn btn-option 
          ${answer === index ? "answer" : ""} 
          ${hasAnswer ? (correctOption === index ? "correct" : "wrong") : ""}
          `}
            onClick={() => dispatch({ type: "answer", payload: index })}
            disabled={hasAnswer}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
