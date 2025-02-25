import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo-white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export function Footer() {
  return (
    <footer className="bg-blue-500 text-white py-8">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-0 ">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src={Logo}
                className="max-w-60 mb-3"
                alt="Logo Magna Odonto"
              />
            </div>
            <p className="mb-4">©2024 - Magna Odonto.</p>
            <p>Todos os direitos reservados.</p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <Link
              href="https://instagram.com"
              className="hover:opacity-75 transition-opacity"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="w-6 h-6 text-white"
              />
            </Link>
            <Link
              href="https://facebook.com"
              className="hover:opacity-75 transition-opacity"
            >
              <FontAwesomeIcon
                icon={faFacebookF}
                className="w-6 h-6 text-white"
              />
            </Link>
            <Link
              href="https://youtube.com"
              className="hover:opacity-75 transition-opacity"
            >
              <FontAwesomeIcon
                icon={faYoutube}
                className="w-6 h-6 text-white"
              />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-sm text-center md:text-left"></div>
      </div>
    </footer>
  );
}
