import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

const quizData = {
  penjumlahan: [
    {
      problem: "275 + 122",
      solution: "397",
      options: ["397", "400", "395", "390"],
    },
    {
      problem: "541 + 231",
      solution: "772",
      options: ["772", "780", "765", "770"],
    },
  ],
  pengurangan: [
    {
      problem: "541 - 231",
      solution: "310",
      options: ["310", "300", "315", "320"],
    },
    {
      problem: "275 - 122",
      solution: "153",
      options: ["153", "150", "160", "155"],
    },
  ],
};

const Quiz: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const searchParams = useSearchParams();
  const materi = searchParams.get("materi");

  // Pilih soal berdasarkan materi, jika materi tidak valid, default ke 'penjumlahan'
  const questions =
    quizData[materi as "penjumlahan" | "pengurangan"] || quizData.penjumlahan;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (selected: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    let newScore = score; // Variabel sementara untuk melacak skor

    if (selected === currentQuestion.solution) {
      newScore += 1; // Tambahkan skor langsung ke variabel sementara
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setScore(newScore); // Perbarui skor
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setScore(newScore); // Pastikan skor diperbarui sebelum showResult
      showResult(newScore); // Kirim skor final ke fungsi hasil
    }
  };

  const showResult = (finalScore: number) => {
    Swal.fire({
      title: "Latihan Selesai!",
      text: `Skor Anda: ${finalScore} dari ${questions.length}`,
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Ulangi Latihan",
      cancelButtonText: "Kembali ke Beranda",
      confirmButtonColor: "#611F69",
      cancelButtonColor: "#8C8C8C",
    }).then((result) => {
      if (result.isConfirmed) {
        resetQuiz();
      } else {
        onBack(); // Kembali ke beranda
      }
    });
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-white shadow-md p-6 rounded-lg border border-purpleLight">
      <h3 className="text-xl font-bold mb-4 text-purple">
        {`Soal ${currentQuestionIndex + 1} dari ${questions.length}`}
      </h3>
      <p className="text-lg font-bold text-purpleDark mb-4">
        {currentQuestion.problem}
      </p>
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="bg-purpleLight text-white p-3 rounded-lg shadow hover:bg-purpleDark"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
