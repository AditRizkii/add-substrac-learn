import React from "react";
import AppleQuiz from "../components/Courses/AppleQuiz"; // Komponen quiz apel

const AppleQuizPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bgpink flex items-center justify-center">
      <AppleQuiz />
    </div>
  );
};

export default AppleQuizPage;
