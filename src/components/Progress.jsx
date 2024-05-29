import { useQuiz } from "../context/QuizContext";

const Progress = () => {
  const { index, numberOfQuestions, points, totalQustionPoint } = useQuiz();
  return (
    <>
      <progress value={index} max={numberOfQuestions} />
      <header className="progress">
        <p>
          {index + 1} / {numberOfQuestions}
        </p>
        <p>
          {points} / {totalQustionPoint}
        </p>
      </header>
    </>
  );
};

export default Progress;
