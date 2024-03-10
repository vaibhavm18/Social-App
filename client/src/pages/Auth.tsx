import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Auth() {
  const nav = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user.id) {
      return nav("/");
    }
  }, [user]);

  return (
    <main
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-xl bg-[#1e2030] text-[#BCD1EF] 
           w-full border-white border shadow-blur backdrop-blur-lg py-8 px-8 rounded-3xl"
    >
      <Outlet />
    </main>
  );
}
