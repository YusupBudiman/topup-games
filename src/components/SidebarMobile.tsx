"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { Link } from "../i18n/navigation";
import { useTranslations } from "next-intl";
import Vipcard from "./ui/VipCard";
import { navItems } from "../data/navItems";
import ModalAuth from "./ModalAuth";
import AuthSection from "./AuthSection";
import LogoutButton from "./ui/BtnLogout";
import { useAuth } from "../context/AuthContext";

// icon
import { IoMdClose } from "react-icons/io";
import { RiShieldCheckFill } from "react-icons/ri";

type Props = {
  close: () => void;
  variant?: "sidebar" | "dropdown";
};

export default function SidebarMobile({ close, variant = "sidebar" }: Props) {
  const isSidebar = variant === "sidebar";

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const vipCardT = useTranslations("VipCard");
  const navItemsT = useTranslations("NavItems");
  const FooterT = useTranslations("Footer");

  const descBtn = useMemo(() => vipCardT("desc_btn"), [vipCardT]);
  const btnText = useMemo(() => vipCardT("button"), [vipCardT]);
  const logoutText = useMemo(() => navItemsT("logout"), [navItemsT]);

  const { user, logout } = useAuth();

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  /** 🔥 Close */
  const handleClose = useCallback(() => {
    if (!isSidebar) {
      close();
      return;
    }

    setIsVisible(false);
    setTimeout(close, 250);
  }, [close, isSidebar]);

  /** 🔥 Logout */
  const handleLogout = useCallback(async () => {
    try {
      await logout();
      handleClose();
    } catch {
      console.error("Logout gagal");
    }
  }, [logout, handleClose]);

  return (
    <>
      {/* Wrapper */}
      <div
        onClick={handleClose}
        className={
          isSidebar
            ? `fixed inset-0 z-49 md:hidden flex justify-end transition-all duration-300 ${
                isVisible ? "bg-black/40" : "bg-transparent pointer-events-none"
              }`
            : "absolute right-0 top-full mt-2 w-64 z-50"
        }
      >
        {/* Container */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={
            isSidebar
              ? `bg-[#14182b] p-4 flex flex-col w-74 h-full
                 transform transition-transform duration-300 ease-out
                 ${isVisible ? "translate-x-0" : "translate-x-full"}`
              : `bg-[#14182b] p-3 rounded-lg shadow-lg border border-white/10
   transition-all duration-200 origin-top-right
   ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`
          }
        >
          {/* Sidebar Header */}
          {isSidebar && (
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center">
                <div className="relative w-5 h-5">
                  <Image src="/logo-web.png" alt="logo-web" fill sizes="24px" />
                </div>
                <span className="text-white text-sm font-semibold italic ml-1">
                  Ysbuy
                </span>
              </div>

              <button onClick={handleClose}>
                <IoMdClose className="text-white text-xl" />
              </button>
            </div>
          )}

          {/* Auth */}
          <div className="mb-4">
            <AuthSection
              user={user}
              desc={descBtn}
              buttonText={btnText}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          </div>

          {/* VIP only sidebar */}
          {isSidebar && (
            <div className="mb-5">
              <Vipcard
                href="/vip"
                title={vipCardT("title")}
                desc={vipCardT("desc")}
              />
            </div>
          )}

          {/* Menu */}
          <div className={`flex flex-col ${isSidebar ? "gap-6" : "gap-2"}`}>
            {navItems
              .filter((item) => item.showInMobile)
              .map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={handleClose}
                    className={`flex items-center gap-3 transition ${
                      isSidebar
                        ? "text-gray-100 hover:text-blue-400"
                        : "text-gray-200 hover:bg-white/10 p-2 rounded-md"
                    }`}
                  >
                    <Icon className="text-xl" />
                    <span className="text-sm">{navItemsT(item.key)}</span>
                  </Link>
                );
              })}

            {/* Logout */}
            {user && (
              <div
                className={`flex items-center gap-3 transition ${
                  isSidebar
                    ? "text-gray-100 hover:text-blue-400"
                    : "text-gray-200 hover:bg-white/10 p-2 rounded-md"
                }`}
              >
                <LogoutButton onLogout={handleLogout} text={logoutText} />
              </div>
            )}
          </div>

          {/* Footer sidebar only */}
          {isSidebar && (
            <div className="h-20 mt-auto -mx-4 -mb-4 pb-4 bg-[#101424] flex items-end justify-center gap-1">
              <RiShieldCheckFill className="text-gray-300 text-md" />
              <h1 className="text-gray-300 text-xs">
                {FooterT("title_sidebar")}
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isAuthOpen && (
        <ModalAuth
          close={() => {
            close();
            setIsAuthOpen(false);
          }}
        />
      )}
    </>
  );
}
