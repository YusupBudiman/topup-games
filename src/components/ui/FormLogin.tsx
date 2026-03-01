"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import BtnSubmit from "./BtnSubmit";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useAuth } from "@/src/context/AuthContext";

type FormValues = {
  email: string;
  username?: string;
  password?: string;
};

export default function FormLogin({
  onLogin,
}: {
  onLogin?: (email: string) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [step, setStep] = useState<"email" | "login" | "register">("email");
  const [emailValue, setEmailValue] = useState("");
  const [loading, setLoading] = useState(false);
  const authT = useTranslations("SchemaAuth");
  const { getUser } = useAuth();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      /** STEP 1: CHECK EMAIL **/
      if (step === "email") {
        const res = await axios.post("/api/auth/check-email", {
          email: data.email,
        });

        setEmailValue(data.email);

        if (res.data.exists) {
          setStep("login");
        } else {
          setStep("register");
        }

        reset({ password: "", username: "" });
      } else if (step === "login") {
        /** LOGIN **/
        await axios.post(
          "/api/auth/login",
          {
            email: emailValue,
            password: data.password,
          },
          { withCredentials: true },
        );
        await getUser();

        onLogin?.(emailValue);
      } else if (step === "register") {
        /** REGISTER **/
        await axios.post("/api/auth/register", {
          email: emailValue,
          username: data.username,
          password: data.password,
        });

        toast.success(authT("message_login"));
        await getUser();

        onLogin?.(emailValue);
      }
    } catch (err: unknown) {
      // log error backend (optional)
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data);
      }

      // tampilkan error generic
      toast.error(authT("err_data"), { toastId: "auth-error" });
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-5"
    >
      {/* STEP EMAIL */}
      {step === "email" && (
        <div className="flex flex-col gap-1 text-gray-300">
          <label>{authT("label_email")}</label>
          <div className="p-px bg-linear-to-br from-[#03b8d2] to-[#1c53ef] rounded-lg">
            <input
              {...register("email", { required: authT("message_email") })}
              className="w-full bg-[#1c2236]  rounded-lg p-2 text-white focus:outline-none focus:ring-0"
              placeholder={authT("label_email")}
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-xs">{errors.email.message}</p>
          )}
        </div>
      )}

      {/* STEP LOGIN */}
      {step === "login" && (
        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-400 text-center">{emailValue}</p>

          <label>{authT("label_password")}</label>
          <input
            type="password"
            {...register("password", {
              required: authT("message_password"),
            })}
            className="bg-transparent border border-gray-700 rounded-md p-2"
            placeholder={authT("label_password")}
          />
          {errors.password && (
            <p className="text-red-400 text-xs">{errors.password.message}</p>
          )}
        </div>
      )}

      {/* STEP REGISTER */}
      {step === "register" && (
        <>
          <p className="text-xs text-gray-400">{emailValue}</p>

          <label>{authT("label_username")}</label>
          <input
            {...register("username", {
              required: authT("message_username"),
            })}
            className="bg-transparent border border-gray-700 rounded-md p-2"
            placeholder={authT("label_username")}
          />
          {errors.username && (
            <p className="text-red-400 text-xs">{errors.username.message}</p>
          )}

          <label>{authT("label_password")}</label>
          <input
            type="password"
            {...register("password", {
              required: authT("message_password"),
            })}
            className="bg-transparent border border-gray-700 rounded-md p-2"
            placeholder={authT("label_password")}
          />
          {errors.password && (
            <p className="text-red-400 text-xs">{errors.password.message}</p>
          )}
        </>
      )}

      <BtnSubmit type="submit" disabled={loading}>
        {loading
          ? authT("loading")
          : step === "email"
            ? authT("btn_email")
            : step === "login"
              ? authT("btn_password")
              : authT("btn_register")}
      </BtnSubmit>
    </form>
  );
}
