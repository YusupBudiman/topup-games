"use client";

import { useForm } from "react-hook-form";
import BtnSubmit from "./BtnSubmit";
export default function FormLogin() {
  return (
    <form className="w-full flex flex-col gap-2">
      <label htmlFor="email">Email</label>
      <input
        className="bg-transparent border border-gray-700 rounded-md p-2"
        placeholder="Email"
      />

      <BtnSubmit onClick={() => console.log("clicked")} type="submit">
        Lanjutkan
      </BtnSubmit>
    </form>
  );
}
