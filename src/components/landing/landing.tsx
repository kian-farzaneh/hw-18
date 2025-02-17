import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillRocketFill } from "react-icons/bs";

function Landing() {
  const navigate = useNavigate();
  const goToSetupPage = () => {
    navigate("/setup");
  };

  return (
    <div className="w-full h-screen flex flex-col justify-evenly items-center gap-60">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-extrabold text-[50px] text-yellow-600">QUIZ</h1>
        <p className="text-white font-bold text-[40px]">Welcome To Quiz App</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <p onClick={goToSetupPage} className="text-white font-bold text-2xl cursor-pointer">Get Started</p>
        <BsFillRocketFill size={45} />
      </div>
    </div>
  );
}

export default Landing;
