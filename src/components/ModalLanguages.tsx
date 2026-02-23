"use client";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { Languages } from "../data/languages";
import { getLanguage } from "../i18n/locale";
import { IoClose } from "react-icons/io5";
import { useRouter, usePathname } from "../i18n/navigation";

export default function ModalLanguages({ close }: { close?: () => void }) {
  const locale = useLocale();
  const [selected, setSelected] = useState(locale);

  const t = useTranslations("ModalLanguages");
  const router = useRouter();
  const pathname = usePathname();

  const selectedLang = getLanguage(selected);

  // change locale and close modal
  const handleChangeLocale = () => {
    router.replace(pathname, { locale: selected });
    close?.();
  };

  return (
    <div className=" fixed inset-0 z-50 w-full h-screen bg-black/40 flex flex-col justify-end md:justify-center md:items-center">
      <div
        className={`
    relative flex flex-col justify-between bg-[#101424] 
    w-full h-[90%] rounded-t-xl
    md:w-200 md:h-[80%] md:max-w-[80%] md:rounded-2xl 
    `}
      >
        {/* Header */}
        <div
          className={`
            flex  items-center justify-between 
            px-4 py-4 h-12 rounded-t-2xl
            md:px-18 md:pt-10 md:mb-5
        `}
        >
          <div className="flex items-center bg">
            <div
              className="relative w-5 h-5
            md:w-6 md:h-6
            lg:w-7 lg:h-7"
            >
              <Image src="/logo-web.png" alt="logo-web" fill sizes="24px" />
            </div>
            <span className="text-xs font-semibold italic text-white ml-1">
              Ysbuy
            </span>
          </div>

          <button onClick={close}>
            <IoClose className="text-xl text-[#868890] md:text-2xl" />
          </button>
        </div>

        {/* Content */}
        <div
          className={`
          flex flex-col w-full h-full items-center justify-between bg-[#101424] overflow-hidden`}
        >
          <div className="w-full h-full bg-[#101424]">
            {/* Title */}
            <div
              className={`
              flex w-full 
              md:w-4/5 md:mx-auto md:rounded-lg`}
            >
              <div
                className={`
                  flex flex-col items-center bg-[#14182b] border-t border-[#1b1f32]
                  
                  py-2 flex-1 rounded-tr-xl
                  md:rounded-t-xl
                `}
              >
                <h2 className="text-sm font-bold text-[#f9fafa]">
                  {t("title_country")}
                </h2>
                <p className="text-xs text-[#61c6e0]">{selectedLang?.name}</p>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center ">
                <h2 className="text-sm font-bold text-[#868890]">
                  {t("title_language")}
                </h2>
                <p className="text-xs text-[#61c6e0]">
                  {selectedLang?.language}
                </p>
              </div>
            </div>

            {/* Selector */}
            <div className="w-full h-full bg-[#14182b] pt-4 overflow-y-auto">
              <div
                className={`
                px-4 grid grid-cols-2 gap-2
                
                md:grid-cols-3 md:px-18`}
              >
                {Languages.map((lang) => (
                  <div
                    key={lang.code}
                    onClick={() => setSelected(lang.code)}
                    className={`cursor-pointer rounded-lg p-0.5
                  ${
                    selected === lang.code
                      ? "bg-linear-to-br from-cyan-400 to-blue-600"
                      : "hover:border hover:border-blue-300"
                  }`}
                  >
                    <div className="bg-[#252940] p-4 rounded-lg flex items-center gap-3">
                      <div className="relative w-8 h-8">
                        <Image src={lang.flag} alt="flag" fill sizes="24px" />
                      </div>
                      <p className="text-xs">{lang.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Submit */}
        <div
          className={`
            flex items-center justify-center w-full border-t border-[#1b1f32] p-4 
            `}
        >
          <button
            onClick={handleChangeLocale}
            className={`
                w-full py-3 rounded-md bg-linear-to-br from-cyan-400 to-blue-600 cursor-pointer 
                hover:from-[#68d6f7] hover:to-[#3b6aee] active:from-[#0a89c0] active:to-[#072bc1] 
                md:w-1/4
                `}
          >
            {t("button")}
          </button>
        </div>
      </div>
    </div>
  );
}
