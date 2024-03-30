import Logout from "@/pages/Logout";
import { icons } from "./BottomNavigation";
import Icon from "./ui/icon";

export default function Header() {
  return (
    <header className="px-4  rounded-xl py-2 flex items-center justify-between border ">
      <span className="font-bold text-2xl md:text-3xl">Social</span>
      <ul className=" items-center text-2xl gap-12 flex">
        {icons.map((val) => (
          <Icon key={val.name} link={val.link} className="hidden sm:block">
            {val.icon}
          </Icon>
        ))}

        <Logout />
        <li className="h-10 w-10 bg-white rounded-full cursor-pointer"></li>
      </ul>
    </header>
  );
}
