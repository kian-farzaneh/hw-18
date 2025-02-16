import React from "react";
import { Link, useNavigate } from "react-router-dom";

function LandingPage() {

    const navigate = useNavigate();

    const goToSetupPage = () => {
        navigate('/setup')
    }
  return (
    <>
      <div>LandingPage</div>
        <button onClick={goToSetupPage}>go to quiz page</button>
    </>
  );
}

export default LandingPage;
