"use client";

import React from "react";
import Image from "next/image";
import { User } from "../types/user";

type Props = {
  user: User | null;
  desc: string;
  buttonText: string;
  onOpenAuth: () => void;
};

const AuthSection = React.memo(function AuthSection({
  user,
  desc,
  buttonText,
  onOpenAuth,
}: Props) {
  console.log("AuthSection render");

  if (user) {
    return (
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
    );
  }

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <p className="w-1/2 text-gray-300 text-xs wrap-break-words">{desc}</p>
      <button
        className="w-1/2 text-white text-xs px-4 py-2 rounded-md bg-linear-to-br from-cyan-400 to-blue-600"
        onClick={onOpenAuth}
      >
        {buttonText}
      </button>
    </div>
  );
});

export default AuthSection;
