import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "../i18n/navigation";

// components
import BtnSubmit from "./ui/BtnSubmit";
import { iconMedia } from "../data/iconMedia";
import FormLogin from "./ui/FormLogin";

// icon
import { IoClose } from "react-icons/io5";

export default function ModalAuth({ close }: { close?: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [login, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const authT = useTranslations("SchemaAuth");

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={`
    fixed inset-0 z-50 flex flex-col justify-center items-center
    transition-all duration-300
    ${isVisible ? "bg-black/40 pointer-events-auto" : "bg-transparent pointer-events-none"}`}
    >
      <div
        className={`
          custom-scroll relative flex flex-col gap-5 justify-between bg-[#101424] w-full h-full p-4 overflow-y-auto 
          
          md:w-1/2 md:h-auto md:max-h-[90%] md:rounded-2xl md:px-12 md:py-8

          2xl:w-1/3
    
          ${isVisible ? "translate-y-0" : "translate-y-full"}
          
          transition-transform duration-300
    `}
      >
        <div className="z-6 absolute bg-[#2f69c4] w-50 h-50 -translate-x-1/8 -translate-y-2/3 rounded-full blur-3xl "></div>
        {/* Logo & exit */}
        <div className="flex items-center justify-between">
          <div className="z-10 flex items-center justify-center">
            <div className="relative w-6 h-6">
              <Image
                src="/logo-web.png"
                alt="Modal Image"
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
            <span
              className={`
              text-xs font-semibold italic text-white ml-1
              lg:text-base`}
            >
              Ysbuy
            </span>
          </div>

          <button
            className="text-xl text-[#868890] md:text-2xl"
            onClick={close}
          >
            <IoClose />
          </button>
        </div>

        {!login ? (
          <>
            {/* Passkey */}
            <div className="flex flex-col items-start justify-center gap-5 lg:items-center">
              <h1 className="z-10 w-full text-gray-300 font-bold text-xl text-start">
                {authT("title_auth")}
              </h1>
              <div
                className={`
                bg-linear-to-br from-[#03b8d2] via-[#2b2f40] to-[#1c53ef] w-full p-px rounded-lg
                
               
                `}
              >
                <div
                  className={`
                  z-5 bg-[#1c2236] w-full p-4 rounded-lg flex flex-col items-center justify-center
                  `}
                >
                  <div
                    className={`
                    w-24 h-24 relative
                    `}
                  >
                    <Image
                      src="/password.png"
                      alt="passkey"
                      sizes="100%"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <BtnSubmit
                    onClick={() => ""}
                    className={`md:w-auto px-8 mb-2`}
                  >
                    <div className="w-4 h-4 relative">
                      <Image
                        src={"/keyuser.png"}
                        alt="key"
                        width={24}
                        height={24}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm">
                      {authT("label_register_passkey")}
                    </span>
                  </BtnSubmit>

                  <div className="flex text-xs">
                    <span className="mr-2 text-gray-400">
                      {authT("desc_login_passkey")}
                    </span>
                    <button className="flex items-center gap-1 ">
                      <div className="bg-blue-500 w-4 h-4 mask-[url(/keyuser.png)] mask-center mask-contain"></div>
                      <span className="text-blue-500">
                        {authT("label_login_passkey")}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Login with media  */}
            <div className="flex items-center justify-center gap-5">
              {iconMedia.map((item) => (
                <Link
                  href={item.link}
                  key={item.name}
                  className={`flex items-center gap-3 p-3 rounded-full ${item.className}`}
                >
                  <div className="w-5 h-5 relative">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  </div>
                </Link>
              ))}
            </div>

            <div className="relative w-full my-5">
              <div className="border-t border-gray-800"></div>
              <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-[#101424] px-2 text-gray-400 text-xs">
                {authT("or")}
              </span>
            </div>

            {/* Login with email */}
            {!login ? (
              <div className="flex flex-col items-start justify-center">
                <FormLogin
                  onLogin={(userEmail: string) => {
                    setEmail(userEmail);
                    setIsLogin(true);
                  }}
                />
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="z-10 text-white font-bold text-2xl mt-2 uppercase ">
              {authT("message_login")}
            </h1>
            <p className="text-gray-400 text-sm">{email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
