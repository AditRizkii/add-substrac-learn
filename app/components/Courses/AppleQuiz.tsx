"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import monkeyPng from "@/public/assets/courses/monkey.png";
import Image from "next/image";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const quizData = [
  {
    problem: "10 - 5 = ?",
    totalApples: 10,
    applesGiven: 5,
    solution: 5,
  },
  {
    problem: "8 - 3 = ?",
    totalApples: 8,
    applesGiven: 3,
    solution: 5,
  },
  {
    problem: "12 - 4 = ?",
    totalApples: 12,
    applesGiven: 4,
    solution: 8,
  },
  {
    problem: "15 - 6 = ?",
    totalApples: 15,
    applesGiven: 6,
    solution: 9,
  },
  {
    problem: "9 - 2 = ?",
    totalApples: 9,
    applesGiven: 2,
    solution: 7,
  },
  {
    problem: "20 - 10 = ?",
    totalApples: 20,
    applesGiven: 10,
    solution: 10,
  },
  {
    problem: "18 - 7 = ?",
    totalApples: 18,
    applesGiven: 7,
    solution: 11,
  },
  {
    problem: "14 - 5 = ?",
    totalApples: 14,
    applesGiven: 5,
    solution: 9,
  },
  {
    problem: "11 - 6 = ?",
    totalApples: 11,
    applesGiven: 6,
    solution: 5,
  },
  {
    problem: "13 - 8 = ?",
    totalApples: 13,
    applesGiven: 8,
    solution: 5,
  },
];

const AppleQuiz: React.FC = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [draggedApples, setDraggedApples] = useState(0); // Jumlah apel yang di-drag
  const currentQuestion = quizData[currentQuestionIndex];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedApples(draggedApples + 1); // Tambahkan apel yang di-drag
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "move";
  };

  const handleFinish = () => {
    const remainingApples = currentQuestion.totalApples - draggedApples; // Hitung apel tersisa

    if (remainingApples === currentQuestion.solution) {
      MySwal.fire({
        title: "<h1 class='text-2xl font-bold text-green-500'>Benar!</h1>",
        html: `<p class='text-lg'>Sisa apel: <span class="font-semibold text-green">${remainingApples}</span>. Anda menjawab dengan benar!</p>`,
        icon: "success",
        customClass: {
          popup: "bg-white rounded-lg shadow-lg",
          confirmButton:
            "bg-green text-white px-4 py-2 rounded hover:bg-bgdarkgreen",
        },
        confirmButtonText: "Lanjutkan",
      }).then(() => {
        if (currentQuestionIndex + 1 < quizData.length) {
          // Pindah ke soal berikutnya
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setDraggedApples(0); // Reset apel yang di-drag
        } else {
          // Latihan selesai
          MySwal.fire({
            title:
              "<h1 class='text-2xl font-bold text-purple'>Latihan Selesai!</h1>",
            html: `<p class='text-lg text-gray'>Anda telah menyelesaikan semua soal!</p>`,
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Kembali ke Beranda",
            cancelButtonText: "Ulangi Latihan",
            customClass: {
              popup: "bg-white rounded-lg shadow-lg",
              confirmButton:
                "bg-purple text-white px-4 py-2 rounded hover:bg-purpleDark",
              cancelButton:
                "bg-gray text-black px-4 py-2 rounded hover:bg-gray",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/"); // Kembali ke beranda
            } else {
              resetQuiz();
            }
          });
        }
      });
    } else {
      MySwal.fire({
        title: "<h1 class='text-2xl font-bold text-redApple'>Salah!</h1>",
        html: `<p class='text-lg text-gray'>Sisa apel: <span class="font-semibold text-red">${remainingApples}</span>. Jawaban Anda salah.</p>`,
        icon: "error",
        customClass: {
          popup: "bg-white rounded-lg shadow-lg",
          confirmButton: "bg-red text-white px-4 py-2 rounded hover:bg-red",
        },
        confirmButtonText: "Coba Lagi",
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setDraggedApples(0);
  };

  return (
    <div className="p-6 bg-bgpink min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4 text-purple">
        Soal: {currentQuestion.problem}
      </h1>

      {/* Area Apel */}
      <div className="flex flex-wrap items-center justify-center mb-4">
        {Array.from({
          length: currentQuestion.totalApples - draggedApples,
        }).map((_, index) => (
          <div
            key={index}
            draggable
            onDragStart={handleDragStart}
            className="relative w-32 h-32 cursor-grab"
          >
            {/* Apple Body */}
            <div className="absolute top-8 left-4 w-24 h-24 bg-redApple rounded-full shadow-lg"></div>

            {/* Apple Leaf */}
            <div className="absolute top-0 left-12 w-8 h-4 bg-green rounded-t-full transform rotate-45"></div>

            {/* Apple Stem */}
            <div className="absolute top-0 left-14 w-2 h-6 bg-monkeyBrown rounded"></div>
          </div>
        ))}
      </div>

      {/* Area Monyet */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-32 h-32 bg-green rounded-full flex items-center justify-center"
      >
        <Image
          src={monkeyPng}
          alt={"monyet"}
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Tombol Selesai */}
      <button
        onClick={handleFinish}
        className="mt-6 bg-purple text-white px-6 py-2 rounded-lg shadow-lg hover:bg-bgpurple"
      >
        Selesai
      </button>
    </div>
  );
};

export default AppleQuiz;
