"use client";

import React from "react";
import { FiLogOut } from "react-icons/fi";

type Props = {
  onLogout: () => void;
  text: string;
};

const LogoutButton = React.memo(function LogoutButton({
  onLogout,
  text,
}: Props) {
  console.log("LogoutButton render");

  return (
    <button
      onClick={onLogout}
      className="flex items-center gap-3 text-gray-100"
    >
      <FiLogOut className="text-xl" />
      <span className="text-sm">{text}</span>
    </button>
  );
});

export default LogoutButton;
