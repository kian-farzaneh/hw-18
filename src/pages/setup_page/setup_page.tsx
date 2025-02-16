import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SetupPage() {
  const navigate = useNavigate();

  const goToQuizPage = () => {
    navigate("/quiz");
  };
  
  return (
    <>
      <div>setup_page</div>
      <button onClick={goToQuizPage}>go to quiz page</button>
    </>
  );
}

export default SetupPage;
