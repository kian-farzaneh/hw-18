import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { PiPowerFill } from "react-icons/pi";
import axios from "axios";

function Setup() {
  const [category, setCategory] = useState<any>([]);
  const [difficulity, setDifficulity] = useState<any>([]);
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<any>("");
  const [selectedDifficality, setSelectedDifficality] = useState<any>("");
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTokenAndCategories = async () => {
      try {
        const tokenResponse = await axios.get(
          "https://opentdb.com/api_token.php?command=request"
        );
        setToken(tokenResponse.data.token);
        console.log("Token fetched:", tokenResponse.data.token);

        const categoryResponse = await axios.get(
          "https://opentdb.com/api_category.php"
        );
        setCategory(categoryResponse.data.trivia_categories);
        console.log(
          "Categories fetched:",
          categoryResponse.data.trivia_categories
        );

        setDifficulity(["easy", "medium", "hard"]);

        setSelectedCategory(
          categoryResponse.data.trivia_categories[0]?.id || ""
        );
        setSelectedDifficality("easy"); 
      } catch (err) {
        console.error(err);
      }
    };
    fetchTokenAndCategories();
  }, []);

  const handleQuestionCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestionCount(Number(event.target.value));
  };

  const fetchQuestions = () => {
    if (
      !token ||
      !selectedCategory ||
      !selectedDifficality ||
      questionCount <= 0
    ) {
      console.log("Missing required data or invalid question count");
      return; 
    }
    axios
      .get(
        `https://opentdb.com/api.php?amount=${questionCount}&category=${selectedCategory}&difficulty=${selectedDifficality}&token=${token}`
      )
      .then((response) => {
        console.log("Response data:", response.data);
        navigate("/quiz", { state: { questions: response.data.results } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full h-screen pt-6 flex flex-col items-center gap-9">
      <h1 className="font-extrabold text-[50px] text-yellow-600">QUIZ</h1>
      <h2 className="text-white font-bold text-[34px]">Setup Quiz</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="number_question"
            className="text-white text-[20px] font-medium"
          >
            Number Of Question
          </label>
          <Input
            value={questionCount}
            onChange={handleQuestionCountChange}
            sx={{
              backgroundColor: "yellow.500",
              border: "none",
              width: "600px",
            }}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-white text-[20px] font-medium">
            Category Of Question
          </label>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{
              backgroundColor: "yellow.500",
              border: "none",
              width: "600px",
              fontWeight: "bold",
            }}
          >
            {category.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col">
          <label className="text-white text-[20px] font-medium">
            Difficulity
          </label>
          <Select
            value={selectedDifficality}
            onChange={(e) => setSelectedDifficality(e.target.value)}
            sx={{
              backgroundColor: "yellow.500",
              border: "none",
              width: "600px",
              fontWeight: "bold",
            }}
          >
            {difficulity.map((level: any, index: any) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <button className="text-white font-bold text-[30px]">Start</button>
        <PiPowerFill
          size={50}
          onClick={() => {
            console.log("Power button clicked");
            if (!token || !selectedCategory || !selectedDifficality) {
              console.log("Missing required data");
            } else {
              console.log(
                "All required data is present, fetching questions..."
              );
              fetchQuestions();
            }
          }}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Setup;
