"use client";

import { useForm } from "react-hook-form";
import BtnSubmit from "./BtnSubmit";
export default function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2"
    >
      <label htmlFor="email">Email</label>
      <input
        className="bg-transparent border border-gray-700 rounded-md p-2"
        {...register("email", { required: "Email is required" })}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <BtnSubmit onClick={handleSubmit(onSubmit)} type="submit">
        Lanjutkan
      </BtnSubmit>
    </form>
  );
}
