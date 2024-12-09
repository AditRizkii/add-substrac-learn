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
    {
      problem: "611 + 225",
      solution: "836",
      options: ["836", "830", "845", "840"],
    },
    {
      problem: "215 + 123",
      solution: "338",
      options: ["338", "340", "330", "342"],
    },
    {
      problem: "245 + 221",
      solution: "466",
      options: ["466", "460", "470", "468"],
    },
    {
      problem: "136 + 122",
      solution: "258",
      options: ["258", "260", "255", "262"],
    },
    {
      problem: "405 + 411",
      solution: "816",
      options: ["816", "820", "810", "818"],
    },
    {
      problem: "177 + 208",
      solution: "385",
      options: ["385", "380", "390", "388"],
    },
    {
      problem: "821 + 186",
      solution: "1007",
      options: ["1007", "1010", "1005", "1008"],
    },
    {
      problem: "579 + 226",
      solution: "805",
      options: ["805", "800", "810", "808"],
    },
    {
      problem: "624 + 395",
      solution: "1019",
      options: ["1019", "1020", "1015", "1022"],
    },
    {
      problem: "547 + 188",
      solution: "735",
      options: ["735", "730", "740", "738"],
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
    {
      problem: "625 - 102",
      solution: "523",
      options: ["523", "520", "530", "525"],
    },
    {
      problem: "720 - 115",
      solution: "605",
      options: ["605", "600", "610", "608"],
    },
    {
      problem: "625 - 121",
      solution: "504",
      options: ["504", "500", "510", "508"],
    },
    {
      problem: "375 - 116",
      solution: "259",
      options: ["259", "260", "255", "258"],
    },
    {
      problem: "620 - 150",
      solution: "470",
      options: ["470", "465", "475", "468"],
    },
    {
      problem: "776 - 183",
      solution: "593",
      options: ["593", "590", "595", "588"],
    },
    {
      problem: "885 - 366",
      solution: "519",
      options: ["519", "520", "525", "518"],
    },
    {
      problem: "811 - 200",
      solution: "611",
      options: ["611", "610", "615", "608"],
    },
    {
      problem: "889 - 227",
      solution: "662",
      options: ["662", "660", "665", "668"],
    },
    {
      problem: "703 - 161",
      solution: "542",
      options: ["542", "540", "545", "538"],
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
