import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
type Props = {
  children: ReactNode;
  link: string;
  className?: HTMLAttributes<HTMLLIElement>["className"];
};
export default function Icon({ children, link, className }: Props) {
  const onclick = () => {
    navigate(link);
  };

  const navigate = useNavigate();
  return (
    <span
      onClick={onclick}
      className={cn(
        `cursor-pointer p-1 rounded-xl hover:bg-gray-700 text-center 
        transition-all duration-200`,
        className
      )}
    >
      {children}
    </span>
  );
}
