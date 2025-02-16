import React from "react";
import { Link, useNavigate } from "react-router-dom";

function QuizPage() {
    
  const navigate = useNavigate();

  const goToResultPage = () => {
    navigate("/result");
  };

  return (
    <>
      <div>QuizPage</div>
      <button onClick={goToResultPage}>go to result page</button>
    </>
  );
}

export default QuizPage;
