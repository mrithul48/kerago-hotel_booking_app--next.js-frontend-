"use client";

import { useState } from "react";
import Login from "./LoginModel";
import Register from "./RegisterModel";


type ModalType = "login" | "register" | null;

export default function AuthModal() {
  const [openModal, setOpenModal] = useState<ModalType>("login");

  if (!openModal) return null;

  return (
    <div
      className="z-50"
      onClick={() => setOpenModal(null)} // close modal on backdrop click
    >
      <div onClick={(e) => e.stopPropagation()}>
        {openModal === "login" && (
          <Login
            onOpenRegister={() => setOpenModal("register")}
            onClose={() => setOpenModal(null)}
          />
        )}

        {openModal === "register" && (
          <Register onClose={() => setOpenModal("login")} 
          
          />
        )}
      </div>
    </div>
  );
}

