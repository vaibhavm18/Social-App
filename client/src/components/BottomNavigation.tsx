import { FaPlus } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import Icon from "./ui/icon";

export const icons = [
  {
    name: "home",
    icon: <IoMdHome />,
    link: "/",
  },
  {
    name: "post",
    icon: <FaPlus />,
    link: "/create",
  },
];

export default function BottomNavigation() {
  return (
    <ul
      className="px-6 py-2 rounded-xl border sm:hidden 
         flex text-2xl justify-between items-center"
    >
      {icons.map((val) => (
        <Icon key={val.name} link={val.link}>
          {val.icon}
        </Icon>
      ))}
    </ul>
  );
}
