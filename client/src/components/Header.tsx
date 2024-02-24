import { default as Link } from "next/link";
import { icons } from "./BottomNavigation";

export default function Header() {
  return (
    <header className="px-4 border rounded-xl py-2 flex items-center justify-between ">
      <span className="font-bold text-2xl md:text-3xl">Social</span>
      <ul className=" items-center text-2xl gap-12 flex">
        {icons.map((val) => (
          <li
            key={val.name}
            className="cursor-pointer hover:bg-gray-700 p-1
          transition-all duration-200  rounded-xl sm:block hidden"
          >
            <Link href={val.link}>{val.icon}</Link>
          </li>
        ))}
        <li className="h-10 w-10 bg-white rounded-full cursor-pointer"></li>
      </ul>
    </header>
  );
}
