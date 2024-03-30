import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { IoLogOut } from "react-icons/io5";

export default function Logout() {
  const { removeUser } = useAuthStore();
  const onclick = () => {
    removeUser();
  };

  return (
    <span
      onClick={onclick}
      className={cn(
        `cursor-pointer p-1 rounded-xl hover:bg-gray-700 text-center 
        transition-all duration-200`
      )}
    >
      <IoLogOut />
    </span>
  );
}
