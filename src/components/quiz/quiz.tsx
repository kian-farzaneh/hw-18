import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions } = location.state || { questions: [] };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const answers = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ];
      setShuffledAnswers(shuffleArray(answers));
    }
  }, [currentQuestionIndex, questions]);

  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleAnswerClick = (selectedAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
  
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore((prev) => prev + 1);
    }
  
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const percentage = Math.round((score / questions.length) * 100);
      navigate("/result", { state: { score, total: questions.length, percentage } });
    }
  };
  

  if (!questions.length) {
    return <div className="text-white text-2xl">No questions available.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="w-full h-screen flex flex-col items-center gap-8">
      <h1 className="font-extrabold text-[50px] text-yellow-600 mt-5">QUIZ</h1>
      <div className="bg-white w-[800px] min-h-48 rounded-lg p-4 text-xl font-bold">
        <p dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
      </div>
      <div className="flex flex-col gap-3 justify-center items-center">
        {shuffledAnswers.map((answer, idx) => (
          <button
            key={idx}
            className="bg-[#00edd9] w-[650px] h-11 rounded-lg text-lg font-semibold hover:bg-[#00c4b3]"
            onClick={() => handleAnswerClick(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
      <p className="text-white text-lg mt-4">
        Question {currentQuestionIndex + 1} of {questions.length}
      </p>
    </div>
  );
}

export default Quiz;
