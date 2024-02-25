"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { HTMLAttributes, ReactNode } from "react";
type Props = {
  children: ReactNode;
  link: string;
  className?: HTMLAttributes<HTMLLIElement>["className"];
};
export default function Icon({ children, link, className }: Props) {
  const router = useRouter();
  const onclick = () => {
    router.push(link);
  };
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
