"use client";
import Image from "next/image";
import { useState } from "react";

import AppointmentModal from "./AppointmentModal";
import Woman from "@/assets/woman.png";

export function HeroBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <section id="home" className="relative w-full bg-primary-light-blue">
      <div className="container mx-auto px-4 pt-7 flex flex-col md:flex-row items-center justify-between max-w-7xl">
        {/* Texto à esquerda */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="mb-12 uppercase font-bold text-primary-dark-blue">
            Boas-Vindas a Magna Odonto <span className="ml-1">🌟</span>
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-headline mb-6 leading-tight">
            Cuidados odontológicos <br /> simplificados para todos
          </h1>
          <p className="text-gray-paragraph text-lg mb-8">
            Os dentistas da Clínica Magna Odonto vão além dos problemas
            aparentes para tratar a causa raiz de sua saúde bucal,
            proporcionando um tratamento eficaz e duradouro.
          </p>
          <button
            onClick={toggleModal}
            className=" self-start items-center gap-2 font-bold bg-primary-dark-blue text-white px-6 py-3 rounded-full hover:bg-hover-blue transition-colors"
          >
            AGENDE SUA CONSULTA
          </button>
        </div>

        {/* Imagem à direita em telas maiores */}
        <div className="w-full lg:w-1/2 flex justify-center md:justify-end">
          <Image
            src={Woman}
            alt="Paciente sorrindo em atendimento odontológico"
            height={540}
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      {isModalOpen && <AppointmentModal onClose={toggleModal} />}
    </section>
  );
}
