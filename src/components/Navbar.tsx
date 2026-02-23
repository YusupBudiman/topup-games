"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useLocale } from "next-intl";
import { getLanguage } from "../i18n/locale";
import ModalLanguages from "./ModalLanguages";
import { HiOutlineUser } from "react-icons/hi2";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Navbar() {
  const t = useTranslations("NavPage");
  const locale = useLocale();
  const currentLang = getLanguage(locale);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="z-49  text-white p-4 flex justify-between w-full h-12">
      {/* Logo */}
      <div className="flex items-center">
        <div className="relative w-5 h-5">
          <Image
            src="/logo-web.png"
            alt="logo-web"
            sizes="24px"
            fill
            className="object-cover"
          />
        </div>
        <span className="text-xs font-semibold italic text-white ml-1">
          Ysbuy
        </span>
      </div>

      {/* Right Items */}
      <div className="flex items-center gap-4 md:flex-row-reverse">
        {/* Open Modal */}
        <button
          onClick={() => setIsOpen(true)}
          className="cursor-pointer hover:text-blue-400"
        >
          {currentLang && (
            <div className="flex items-center gap-1 ">
              <div className="relative w-6 h-6">
                <Image
                  src={currentLang.flag}
                  alt={currentLang.code}
                  fill
                  sizes="24px"
                />
              </div>
              <span className="text-xs uppercase font-semibold">
                {currentLang.code}
              </span>
            </div>
          )}
        </button>
        <button
          className="bg-white/20 backdrop-blur px-2 py-1 rounded-full text-xs
        md:bg-transparent flex items-center gap-1 hover:text-blue-400"
        >
          <HiOutlineUser className="text-xl md:inline hidden" />
          <span>{t("login")}</span>
          <IoMdArrowDropdown className="text-xl md:inline hidden" />
        </button>

        <div className="md:hidden cursor-pointer">
          <RxHamburgerMenu />
        </div>
      </div>

      {/* ✅ Conditional Rendering (SOLUSI UTAMA) */}
      {isOpen && <ModalLanguages close={() => setIsOpen(false)} />}
    </nav>
  );
}
