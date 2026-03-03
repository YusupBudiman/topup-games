"use client";

// components
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { getLanguage } from "../../i18n/locale";
import ModalLanguages from "../modals/ModalLanguages";
import SidebarMobile from "./SidebarMobile";
import ModalAuth from "../modals/ModalAuth";
import { useAuth } from "../../context/AuthContext";

// icon
import { HiOutlineUser, HiOutlineBell } from "react-icons/hi2";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Navbar() {
  const t = useTranslations("NavItems");
  const { user } = useAuth();
  const locale = useLocale();
  const currentLang = getLanguage(locale);

  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);

  // ✅ typing ref biar contains tidak error
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // ✅ click outside dropdown
  useEffect(() => {
    if (!isDropdown) return;

    function handleClickOutside(event: PointerEvent) {
      if (!dropdownRef.current) return;

      if (!(event.target instanceof Node)) return;

      if (!dropdownRef.current.contains(event.target)) {
        setIsDropdown(false);
      }
    }

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isDropdown]);

  return (
    <nav
      className="
        fixed  top-0 left-0 w-full h-12 z-49 text-white px-4 flex items-center justify-between
        lg:h-16 lg:px-8 
      "
    >
      {/* Logo */}
      <div className="flex items-center">
        <div className="relative w-5 h-5 lg:w-8 lg:h-8">
          <Image
            src="/logo-web.png"
            alt="logo-web"
            sizes="24px"
            fill
            className="object-cover"
          />
        </div>

        <span className="text-xs font-semibold italic ml-1 lg:text-base">
          Ysbuy
        </span>
      </div>

      {/* Right Items */}
      <div
        className="
          flex items-center gap-2
          md:flex-row-reverse
          lg:gap-6 lg:mr-4
        "
      >
        {/* Language */}
        <button
          onClick={() => setIsOpen(true)}
          className="cursor-pointer hover:text-blue-400"
        >
          {currentLang && (
            <div className="flex items-center gap-1">
              <div className="relative w-6 h-6">
                <Image
                  src={currentLang.flag}
                  alt={currentLang.code}
                  fill
                  sizes="24px"
                />
              </div>
              <span className="text-xs uppercase font-semibold lg:text-sm">
                {currentLang.code}
              </span>
            </div>
          )}
        </button>

        {user ? (
          <>
            {/* Avatar + Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsDropdown((prev) => !prev)}
                className="hidden md:flex items-center gap-2"
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden bg-gray-700">
                  {user.image ? (
                    <Image src={user.image} alt="user" fill />
                  ) : (
                    <div className="flex items-center justify-center h-full text-sm">
                      {user.username?.[0] || user.email[0]}
                    </div>
                  )}
                </div>

                <span className="hidden md:block text-sm">
                  {user.username || user.email}
                </span>

                <IoMdArrowDropdown />
              </button>

              {isDropdown && (
                <SidebarMobile
                  close={() => setIsDropdown(false)}
                  variant="dropdown"
                />
              )}
            </div>

            {/* Notification */}
            <button
              className="
                bg-transparent backdrop-blur px-2 py-1 rounded-full text-xs
                md:bg-transparent flex items-center gap-1 hover:text-blue-400
              "
            >
              <HiOutlineBell className="text-xl" />
              <span className="hidden md:inline lg:text-sm">{t("notif")}</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsAuthOpen(true)}
            className="
              bg-white/20 backdrop-blur px-2 py-1 rounded-full text-xs
              md:bg-transparent flex items-center gap-1 hover:text-blue-400
            "
          >
            <HiOutlineUser className="text-xl md:inline hidden" />
            <span className="text-[clamp(0.75rem,0.8vw,1rem)]">
              {t("login")}
            </span>
            <IoMdArrowDropdown className="text-xl md:inline hidden" />
          </button>
        )}

        {/* Mobile Menu */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden cursor-pointer"
        >
          <RxHamburgerMenu />
        </button>
      </div>

      {/* Modals */}
      {isOpen && <ModalLanguages close={() => setIsOpen(false)} />}
      {isSidebarOpen && <SidebarMobile close={() => setIsSidebarOpen(false)} />}
      {isAuthOpen && <ModalAuth close={() => setIsAuthOpen(false)} />}
    </nav>
  );
}
