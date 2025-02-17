import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Landing from "../../components/landing/landing";

function LandingPage() {

  return (
    <div className="w-full h-screen bg-[#9f2de8]">      
      <Landing />
    </div>
  );
}

export default LandingPage;
