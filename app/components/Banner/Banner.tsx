"use client";
import Dropdownone from "./Dropdownone";
import Dropdowntwo from "./Dropdowntwo";

const Banner = () => {
  return (
    <main className="banner-image h-screen pb-20">
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-5xl pt-16 sm:pt-40 sm:pb-24">
          <div className="text-center">
            <h1 className="text-6xl font-bold tracking-tight text-gray-900 md:4px">
              Belajar <span className="text-purple">Matematika</span>
            </h1>
            <h2 className="text-4xl">
              <span className="text-purple">Penjumlahan</span> dan{" "}
              <span className="text-purple">Pengurangan</span> Tiga Angka
            </h2>
            <p className="mt-6 text-lg leading-8 text-black">
              Ayo belajar matematika dengan menyenangkan! Materi hari ini adalah
              penjumlahan dan pengurangan tiga angka.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Banner;
