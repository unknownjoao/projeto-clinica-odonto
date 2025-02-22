/* "use client";
import Image from "next/image";
import LogoDark from "../assets/logo-blue-dark.png";
import LogoWhite from "../assets/logo-white.png";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import AppointmentModal from "./AppointmentModal"; // Certifique-se de ajustar o caminho do import

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <header
        className={`w-full h-20 relative flex flex-wrap items-center ${
          isMenuOpen ? "bg-primary-blue" : "bg-primary-light-blue"
        } transition-colors duration-300 z-20`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between max-w-7xl">
          <Link href="/" className="flex items-center">
            <Image
              src={LogoDark}
              alt="Magna Odonto Logo"
              width={150}
              height={50}
              className="h-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8 ">
            <Link
              href="#home"
              className={`p-[27px] flex items-center text-primary-dark-blue border-b-2 ${
                isActive("#home")
                  ? "border-primary-dark-blue font-bold "
                  : "border-transparent hover:border-hover-blue font-normal"
              }`}
            >
              Início
            </Link>
            <Link
              href="#services"
              className={`p-[27px] flex items-center text-primary-dark-blue border-b-2 ${
                isActive("#services")
                  ? "border-primary-dark-blue font-bold "
                  : "border-transparent hover:border-hover-blue font-normal"
              }`}
            >
              Serviços
            </Link>
            <Link
              href="#about"
              className={`p-[27px] flex items-center text-primary-dark-blue border-b-2 ${
                isActive("#about")
                  ? "border-primary-dark-blue font-bold "
                  : "border-transparent hover:border-hover-blue font-normal"
              }`}
            >
              Sobre
            </Link>
            <Link
              href="/contato"
              className={`p-[27px] flex items-center text-primary-dark-blue border-b-2 ${
                isActive("/contato")
                  ? "border-primary-dark-blue font-bold "
                  : "border-transparent hover:border-hover-blue font-normal"
              }`}
            >
              Contato
            </Link>
          </nav>

          <button
            onClick={toggleModal}
            className="bg-primary-dark-blue hidden md:block text-white px-6 py-2 rounded-full hover:bg-hover-blue transition-colors font-bold"
          >
            AGENDAR CONSULTA
          </button>

          <button className="md:hidden z-50" onClick={toggleMenu}>
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary-dark-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        <div
          className={`fixed inset-0 bg-[#003B71] transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <div className="container ml-6 flex flex-col ">
            <Image
              src={LogoWhite}
              alt="Magna Odonto Logo"
              width={150}
              height={50}
            />
          </div>
          <div className="flex flex-col items-center pt-20 px-6 space-y-8">
            <Link
              href="/"
              className={`text-white text-xl font-medium ${
                isActive("/") ? "opacity-75" : ""
              }`}
              onClick={toggleMenu}
            >
              Início
            </Link>
            <Link
              href="/sobre"
              className={`text-white text-xl font-medium ${
                isActive("/sobre") ? "opacity-75" : ""
              }`}
              onClick={toggleMenu}
            >
              Sobre
            </Link>
            <Link
              href="/servicos"
              className={`text-white text-xl font-medium ${
                isActive("/servicos") ? "opacity-75" : ""
              }`}
              onClick={toggleMenu}
            >
              Serviços
            </Link>
            <button
              onClick={() => {
                toggleMenu();
                toggleModal();
              }}
              className="bg-white text-[#003B71] px-8 py-3 rounded-full text-center font-medium mt-8"
            >
              AGENDE SUA CONSULTA
            </button>

            <div className="flex space-x-6 mt-8">
              <Link href="https://instagram.com" className="text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link href="https://facebook.com" className="text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              <Link href="https://youtube.com" className="text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {isModalOpen && <AppointmentModal onClose={toggleModal} />}
    </>
  );
} */

"use client";
import Image from "next/image";
import LogoDark from "../assets/logo-blue-dark.png";
import LogoWhite from "../assets/logo-white.png";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AppointmentModal from "./AppointmentModal";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) < 20) return;

      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    const handleScroll = () => {
      // Encontra todas as seções
      const sections = ["home", "services", "about"]
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      // Encontra qual seção está mais visível na tela
      const current = sections.reduce((visible, section) => {
        if (!section) return visible;

        const rect = section.getBoundingClientRect();
        const offset = window.innerHeight * 0.3; // 30% da altura da janela

        // Seção está visível se estiver dentro da área de visualização com offset
        if (rect.top <= offset && rect.bottom >= offset) {
          return section.id;
        }
        return visible;
      }, "home");

      setActiveSection(current);
    };

    window.addEventListener("scroll", controlHeader);
    window.addEventListener("scroll", handleScroll);

    // Executa uma vez para definir a seção inicial
    handleScroll();

    return () => {
      window.removeEventListener("scroll", controlHeader);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Bloqueia o scroll
    } else {
      document.body.style.overflow = ""; // Restaura o comportamento padrão
    }

    return () => {
      document.body.style.overflow = ""; // Garante que o scroll volte ao normal quando o componente desmontar
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const isActive = (sectionId: string) => {
    return activeSection === sectionId.replace("#", "");
  };

  return (
    <>
      <header
        className={`w-full h-20 fixed top-0 left-0 right-0 flex flex-wrap items-center 
          ${
            isMenuOpen
              ? "bg-primary-blue"
              : isScrolled
              ? "bg-primary-dark-blue"
              : "bg-primary-light-blue"
          } 
          transition-all duration-300 z-20
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
          ${!isVisible ? "shadow-lg" : ""}`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between max-w-7xl">
          <Link href="/" className="flex items-center">
            <Image
              src={isScrolled ? LogoWhite : LogoDark}
              alt="Magna Odonto Logo"
              width={150}
              height={50}
              className="h-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#home"
              className={`p-[27px] flex items-center border-b-2 transition-all duration-300
                ${isScrolled ? "text-white" : "text-primary-dark-blue"}
                ${
                  isActive("#home")
                    ? isScrolled
                      ? "border-primary-light-blue font-bold"
                      : "border-primary-dark-blue font-bold"
                    : "border-transparent hover:border-primary-light-blue font-normal"
                }
              `}
            >
              Início
            </Link>

            <Link
              href="#services"
              className={`p-[27px] flex items-center border-b-2 transition-all duration-300
                ${isScrolled ? "text-white" : "text-primary-dark-blue"}
                ${
                  isActive("#services")
                    ? isScrolled
                      ? "border-primary-light-blue font-bold"
                      : "border-primary-dark-blue font-bold"
                    : "border-transparent hover:border-primary-light-blue font-normal"
                }
              `}
            >
              Serviços
            </Link>

            <Link
              href="#about"
              className={`p-[27px] flex items-center border-b-2 transition-all duration-300
                ${isScrolled ? "text-white" : "text-primary-dark-blue"}
                ${
                  isActive("#about")
                    ? isScrolled
                      ? "border-primary-light-blue font-bold"
                      : "border-primary-dark-blue font-bold"
                    : "border-transparent hover:border-primary-light-blue font-normal"
                }
              `}
            >
              Sobre
            </Link>

            <Link
              href="/contato"
              className={`p-[27px] flex items-center border-b-2 transition-all duration-300
                ${isScrolled ? "text-white" : "text-primary-dark-blue"}
                ${
                  pathname === "/contato"
                    ? isScrolled
                      ? "border-primary-light-blue font-bold"
                      : "border-primary-dark-blue font-bold"
                    : "border-transparent hover:border-primary-light-blue font-normal"
                }
              `}
            >
              Contato
            </Link>
          </nav>

          <button
            onClick={toggleModal}
            className={`hidden md:block  px-6 py-2 rounded-full transition-colors font-bold
              ${
                isScrolled
                  ? "bg-primary-light-blue text-primary-dark-blue hover:bg-hover-blue hover:text-white "
                  : "bg-primary-dark-blue hover:bg-hover-blue text-white "
              }`}
          >
            AGENDAR CONSULTA
          </button>

          <button className="md:hidden z-50" onClick={toggleMenu}>
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${
                  isScrolled ? "text-white" : "text-primary-dark-blue"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        <div
          className={`fixed inset-0 bg-primary-dark-blue transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <div className="container ml-6 flex flex-col">
            <Image
              src={LogoWhite}
              alt="Magna Odonto Logo"
              width={150}
              height={50}
            />
          </div>
          <div className="flex flex-col h-screen items-center pt-20 px-6 space-y-8 bg-primary-dark-blue">
            <Link
              href="#home"
              className={`text-white text-xl font-medium ${
                isActive("#home") ? "opacity-75" : ""
              }`}
              onClick={toggleMenu}
            >
              Início
            </Link>
            <Link
              href="#about"
              className={`text-white text-xl font-medium ${
                isActive("#about") ? "opacity-75" : ""
              }`}
              onClick={toggleMenu}
            >
              Sobre
            </Link>
            <Link
              href="#services"
              className={`text-white text-xl font-medium ${
                isActive("#services") ? "opacity-75" : ""
              }`}
              onClick={toggleMenu}
            >
              Serviços
            </Link>
            <button
              onClick={() => {
                toggleMenu();
                toggleModal();
              }}
              className="bg-white text-[#003B71] px-8 py-3 rounded-full text-center font-medium mt-8"
            >
              AGENDE SUA CONSULTA
            </button>

            <div className="flex space-x-6 mt-8">
              <Link href="https://instagram.com" className="text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link href="https://facebook.com" className="text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              <Link href="https://youtube.com" className="text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer div to prevent content from jumping */}
      <div className="h-20"></div>

      {isModalOpen && <AppointmentModal onClose={toggleModal} />}
    </>
  );
}
