"use client";

import React, { useState } from "react";
import Image from "next/image";
import GuyImage from "../assets/guy.png";
import AppointmentModal from "./AppointmentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <section
      id="contact"
      className="w-full max-w-7xl mx-auto py-12 px-4 md:px-0 "
    >
      <div className=" container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-headline mb-4">
            Entre em contato com a gente!
          </h2>

          {/* Informações de contato */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="w-6 h-6 text-primary-dark-blue"
              />

              <span className="text-gray-paragraph">
                Av. Jatuarana n°4941, Nova Floresta. Sala 01
                <br />
                Porto Velho - RO
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="w-6 h-6 text-primary-dark-blue"
              />
              <span className="text-gray-paragraph">(69) 99623-1234</span>
            </div>
          </div>

          {/* Botão de Agendar */}
          <button
            onClick={toggleModal}
            className=" self-start items-center gap-2 font-bold bg-primary-dark-blue text-white px-6 py-3 rounded-full hover:bg-hover-blue transition-colors"
          >
            AGENDE SUA CONSULTA
          </button>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2">
          <Image
            src={GuyImage}
            alt="Paciente sorrindo "
            max-width={575}
            className="h-auto"
          />
        </div>
      </div>
      {isModalOpen && <AppointmentModal onClose={toggleModal} />}
    </section>
  );
}
