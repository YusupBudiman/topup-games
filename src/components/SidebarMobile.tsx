"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "../i18n/navigation";
import { useTranslations } from "next-intl";
import Vipcard from "./ui/VipCard";
import { navItems } from "../data/navItems";
import api from "@/lib/axios";
import ModalAuth from "./ModalAuth";

// icon
import { IoMdClose } from "react-icons/io";
import { RiShieldCheckFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";

type User = {
  id: string;
  email: string;
  username?: string;
  image?: string;
};

export default function SidebarMobile({ close }: { close: () => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const vipCardT = useTranslations("VipCard");
  const navItemsT = useTranslations("NavItems");
  const FooterT = useTranslations("Footer");

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get("/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(close, 300);
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      handleClose();
    } catch (error) {
      console.error("Logout gagal");
    }
  };

  return (
    <>
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-49 md:hidden flex justify-end transition-all duration-300
      ${isVisible ? "bg-black/40 " : "bg-transparent pointer-events-none"}`}
      >
        {/* Sidebar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-[#14182b] p-4 flex flex-col w-74 h-full
        transform transition-transform duration-300 ease-out
        ${isVisible ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Logo & Exit */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center">
              <div className="relative w-5 h-5">
                <Image src="/logo-web.png" alt="logo-web" fill sizes="24px" />
              </div>
              <span className="text-white text-sm font-semibold italic">
                Ysbuy
              </span>
            </div>

            <button onClick={handleClose}>
              <IoMdClose className="text-white text-xl" />
            </button>
          </div>

          {/* Auth Section */}
          <div className="mb-5">
            {loading ? (
              <div className="text-gray-400 text-xs">Loading...</div>
            ) : user ? (
              <div className="flex items-center gap-3">
                {/* Photo */}
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt="user"
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-white text-sm">
                      {user.username?.[0] || user.email[0]}
                    </div>
                  )}
                </div>

                {/* Username */}
                <div className="flex flex-col">
                  <span className="text-white text-sm font-semibold">
                    {user.username || user.email}
                  </span>
                  <span className="text-gray-400 text-xs">Member</span>
                </div>
              </div>
            ) : (
              <div className="flex w-full items-center justify-center gap-2">
                <p className="w-1/2 text-gray-300 text-xs wrap-break-words">
                  {vipCardT("desc_btn")}
                </p>
                <button
                  className="w-1/2 text-white text-xs px-4 py-2 rounded-md bg-linear-to-br from-cyan-400 to-blue-600"
                  onClick={() => {
                    setIsAuthOpen(true);
                  }}
                >
                  {vipCardT("button")}
                </button>
              </div>
            )}
          </div>

          {/* VIP Card */}
          <div className="mb-5">
            <Vipcard
              href="/vip"
              title={vipCardT("title")}
              desc={vipCardT("desc")}
            />
          </div>

          {/* Menu */}
          <div className="flex flex-col gap-6">
            {navItems
              .filter((item) => item.showInMobile)
              .map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={handleClose}
                    className="flex items-center gap-3 text-gray-100 hover:text-blue-400 transition"
                  >
                    <Icon className="text-xl" />
                    <span className="text-sm">{navItemsT(item.key)}</span>
                  </Link>
                );
              })}

            {/* Logout Button */}
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-gray-100 hover:text-red-500 transition"
              >
                <FiLogOut className="text-xl" />
                <span className="text-sm">{navItemsT("logout")}</span>
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="h-20 mt-auto -mx-4 -mb-4 pb-4 bg-[#101424] flex items-end justify-center gap-1">
            <RiShieldCheckFill className="text-gray-300 text-md" />
            <h1 className="text-gray-300 text-xs">
              {FooterT("title_sidebar")}
            </h1>
          </div>
        </div>
      </div>
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
