import React from "react";
import { Link, useNavigate } from "react-router-dom";

function ResultPage() {

  const navigate = useNavigate();

  const goToLandingPage = () => {
    navigate("/");
  };
  
  return (
    <>
      <div>ResultPage</div>
      <button onClick={goToLandingPage}>go to LandingPage</button>
    </>
  );
}

export default ResultPage;
