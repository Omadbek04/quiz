import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

const Timer = () => {
  const { timer, dispatch } = useQuiz();
  
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [dispatch]);

  return (
    <div>
      <button className="btn btn-ui timer">
        {Math.floor(timer / 60)}:{timer % 60}
      </button>
    </div>
  );
};

export default Timer;
