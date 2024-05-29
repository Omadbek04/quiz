import { useQuiz } from "../context/QuizContext";
import Options from "./Options";

const Questions = () => {
  const { question,index}=useQuiz()
  return (
    <div>
      <h4>{question[index].question}</h4>
   <Options options={question[index].options} correctOption={question[index].correctOption}/>
    </div>
  );
};

export default Questions;
