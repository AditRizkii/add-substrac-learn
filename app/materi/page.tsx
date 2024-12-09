"use client";
import React, { useState } from "react";
import Quiz from "../components/Courses/Quiz";
import { useSearchParams, useRouter } from "next/navigation";

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const contohSoal = {
    penjumlahan: [
      {
        problem: "275 + 122",
        solution: "397",
      },
      {
        problem: "541 + 231",
        solution: "772",
      },
    ],
    pengurangan: [
      {
        problem: "275 - 122",
        solution: "153",
      },
      {
        problem: "541 - 231",
        solution: "310",
      },
    ],
  };

  const bersusun = {
    penjumlahan: [
      {
        ratusan: 2,
        puluhan: 7,
        satuan: 5,
      },
      {
        ratusan: 1,
        puluhan: 2,
        satuan: 2,
      },
      {
        ratusan: 3,
        puluhan: 9,
        satuan: 7,
      },
    ],
    pengurangan: [
      {
        ratusan: 5,
        puluhan: 4,
        satuan: 1,
      },
      {
        ratusan: 2,
        puluhan: 3,
        satuan: 1,
      },
      {
        ratusan: 3,
        puluhan: 1,
        satuan: 0,
      },
    ],
  };

  const materi = searchParams.get("materi");

  // Pilih soal berdasarkan materi, jika materi tidak valid, default ke 'penjumlahan'
  const soalDipilih =
    contohSoal[materi as "penjumlahan" | "pengurangan"] ||
    contohSoal.penjumlahan;

  const bersusunDipilih =
    bersusun[materi as "penjumlahan" | "pengurangan"] || bersusun.penjumlahan;

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-5xl mx-auto p-6">
        {!showQuiz ? (
          <div>
            <h2 className="text-3xl font-bold mb-4 text-center text-purple">
              Modul Pembelajaran
            </h2>
            <p className="mb-4 text-lg text-purpleDark">
              Mari belajar cara {materi || "penjumlahan"} dengan mudah! Berikut
              adalah contoh penjelasannya.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cara Mendatar */}
              <div className="bg-bgWhite shadow-md p-4 rounded-lg border border-purpleLight">
                <h3 className="font-bold text-lg text-purpleDark">
                  Cara Mendatar
                </h3>
                <ul className="list-disc ml-4 mt-2 text-purple">
                  {soalDipilih.map((soal, index) => (
                    <li key={index}>
                      <strong>
                        {soal.problem} = {soal.solution}
                      </strong>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cara Bersusun */}
              <div className="bg-bgWhite shadow-md p-4 rounded-lg border border-purpleLight">
                <h3 className="font-bold text-lg text-purpleDark">
                  Cara Bersusun
                </h3>
                <p className="text-purple">
                  Susun angka dari satuan, puluhan, lalu ratusan.
                </p>
                <div className="bg-grey500 p-2 mt-2 rounded-lg">
                  <table className="table-auto w-full text-center">
                    <thead>
                      <tr>
                        <th className="p-2 text-purple">Ratusan</th>
                        <th className="p-2 text-purple">Puluhan</th>
                        <th className="p-2 text-purple">Satuan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bersusunDipilih.map((row, index) => (
                        <tr key={index}>
                          <td className=" text-purple">{row.ratusan}</td>
                          <td className=" text-purple">{row.puluhan}</td>
                          <td className=" text-purple">{row.satuan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
              <button
                onClick={() => setShowQuiz(true)}
                className="bg-purple text-white px-6 py-2 rounded-lg text-lg shadow-lg hover:bg-purpleDark"
              >
                Mulai Latihan
              </button>
              <button
                onClick={() => router.push("/apple-quiz")}
                className="bg-green text-white px-6 py-2 rounded-lg text-lg shadow-lg hover:bg-bgdarkgreen"
              >
                Latihan Apel
              </button>
            </div>
          </div>
        ) : (
          <Quiz onBack={() => setShowQuiz(false)} />
        )}
      </main>
    </div>
  );
}
