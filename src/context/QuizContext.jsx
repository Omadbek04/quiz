import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext({});

const SECONDS_PRE_QUESTIONS = 20;

const initialState = {
  question: [
    {
      question: "HTML nima uchun ishlatiladi?",
      options: ["Sayt dizaynini o'zgartirish uchun", "Veb-sahifalarning tuzilishini yaratish uchun", "Ma'lumotlarni saqlash uchun", "Serverni boshqarish uchun"],
      correctOption: 1,
      points: 10,
    },
    {
      question: "HTML hujjati qaysi teg bilan boshlanadi?",
      options: ["<head>", "<title>", "<body>", "<html>"],
      correctOption: 3,
      points: 10,
    },
    {
      question: "HTML sahifasining asosiy tuzilma qismlarini ko'rsating",
      options: ["<header> <footer> <div> <span>", "<html> <head> <body>", "<title> <link> <meta> <script>", "<table> <tr> <td> <th>"],
      correctOption: 1,
      points: 10,
    },
    {
      question: "Qaysi teg HTML sahifasida sarlavha yaratadi?",
      options: ["<p>", "<title>", "<h1>", "<div>"],
      correctOption: 2,
      points: 10,
    },
    {
      question: "HTMLda havola yaratish uchun qaysi teg ishlatiladi?",
      options: ["<link>", "<a>", "<href>", "<img>"],
      correctOption: 1,
      points: 10,
    },
    {
      question: "Qaysi teg matnni qalin qilish uchun ishlatiladi?",
      options: ["<i>", "<b>", "<u>", "<em>"],
      correctOption: 1,
      points: 10,
    },
    {
      question: "HTMLda ro'yxat yaratish uchun qaysi teg ishlatiladi?",
      options: ["<ol> <li>", "<ul> <li>", "<li> <ul>", "<li> <ol>"],
      correctOption: 1,
      points: 10,
    },
    {
      question: "HTMLda rasmlarni qo'shish uchun qaysi teg ishlatiladi?",
      options: ["<img>", "<picture>", "<src>", "<figure>"],
      correctOption: 0,
      points: 10,
    },
    {
      question: "Qaysi teg HTML hujjatiga tashqi CSS faylini bog'lash uchun ishlatiladi?",
      options: ["<script>", "<link>", "<style>", "<css>"],
      correctOption: 1,
      points: 10,
    },
    {
      question: "HTMLda matnni qator tashlash uchun qaysi teg ishlatiladi?",
      options: ["<br>", "<break>", "<line>", "<hr>"],
      correctOption: 0,
      points: 10,
    },
    {
      question: "CSS nima uchun ishlatiladi?",
      options: ["Veb-sahifalarning tuzilishini yaratish uchun", "Sayt dizaynini o'zgartirish uchun", "Ma'lumotlarni saqlash uchun", "Serverni boshqarish uchun"],
      correctOption: 1,
      points: 10,
    },
    {
      question: "CSS faylini HTML hujjatiga qaysi teg yordamida bog'lash mumkin?",
      options: ["<script>", "<link>", "<style>", "<css>"],
      correctOption: 1,
      points: 10,
    },
    {
      question: "CSSda rangni o'rnatish uchun qaysi xususiyat ishlatiladi?",
      options: ["font-color", "text-color", "color", "background-color"],
      correctOption: 2,
      points: 10,
    },
    {
      question: "CSSda font o'lchamini o'zgartirish uchun qaysi xususiyat ishlatiladi?",
      options: ["font-style", "font-weight", "font-size", "text-transform"],
      correctOption: 2,
      points: 10,
    },
    {
      question: "CSSda sahifa orqa fonini o'rnatish uchun qaysi xususiyat ishlatiladi?",
      options: ["color", "background-color", "font-color", "bg-color"],
      correctOption: 1,
      points: 10,
    },
    {
      question: "CSSda elementni markaziy joylashtirish uchun qaysi xususiyat ishlatiladi?",
      options: ["align-center", "text-center", "text-align", "align-middle"],
      correctOption: 2,
      points: 10,
    },
    {
      question: "CSSda border o'rnatish uchun qaysi xususiyat ishlatiladi?",
      options: ["border", "outline", "frame", "box"],
      correctOption: 0,
      points: 10,
    },
    {
      question: "CSSda padding o'rnatish uchun qaysi xususiyat ishlatiladi?",
      options: ["margin", "spacing", "padding", "border-spacing"],
      correctOption: 2,
      points: 10,
    },
    {
      question: "CSSda elementlar orasidagi bo'shliqni o'rnatish uchun qaysi xususiyat ishlatiladi?",
      options: ["margin", "padding", "spacing", "border-spacing"],
      correctOption: 0,
      points: 10,
    },
    {
      question: "CSSda matnning kattaligini o'zgartirish uchun qaysi xususiyat ishlatiladi?",
      options: ["text-style", "font-size", "font-style", "text-size"],
      correctOption: 1,
      points: 10,
    },
  ], //[] bolishi kerak edi
  status: "ready", //loading bolishi kerak edi
  index: 0,
  answer: null,
  points: 0,
  timer: 0,
  record: 0,
};

function reducer(state, action) {
  switch (action.type) {
    // case "dataRecived":
    // return (state = { ...state, question: action.payload, status: "ready" });
    case "dataFailed":
      return (state = { ...state, status: "error" });
    case "start":
      return (state = {
        ...state,
        status: "active",
        timer: state.question.length * SECONDS_PRE_QUESTIONS,
      });
    case "answer": {
      return { ...state, answer: action.payload };
    }
    case "newAnswer": {
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        points: state.answer === state.question[state.index].correctOption ? state.points + state.question[state.index].points : state.points,
      };
    }
    case "restart": {
      return { ...state, status: "ready", answer: null, index: 0, points: 0 };
    }
    case "tick": {
      return {
        ...state,
        timer: (state.timer -= 1),
        status: state.timer <= 0 ? "finish" : state.status,
      };
    }
    case "finish":
      return {
        ...state,
        status: "finish",
        record: state.points >= state.record ? state.points : state.record,
      };
    default:
      throw new Error("No such action");
  }
}

const QuizContextProvider = ({ children }) => {
  const [{ question, status, index, answer, points, timer, record }, dispatch] = useReducer(reducer, initialState);

  let numberOfQuestions = question.length;
  const totalQustionPoint = question.length > 0 && question.reduce((calc, b) => calc + b.points, 0);

  // useEffect(() => {
  //   fetch(`http://localhost:7777/questions`)
  //     .then((res) => res.json())
  //     .then((data) => dispatch({ type: "dataRecived", payload: data }))
  //     .catch((error) => dispatch({ type: "dataFailed" }));
  // }, []);
  return (
    <QuizContext.Provider
      value={{
        index,
        question,
        status,
        answer,
        points,
        timer,
        dispatch,
        numberOfQuestions,
        totalQustionPoint,
        record,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);

export default QuizContextProvider;
