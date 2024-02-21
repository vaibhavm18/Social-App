import { FaPlus } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

export const icons = [
  {
    name: "home",
    icon: <IoMdHome />,
  },
  {
    name: "post",
    icon: <FaPlus />,
  },
  {
    name: "logout",
    icon: <IoLogOut />,
  },
];

export default function BottomNavigation() {
  return (
    <ul
      className="px-6 py-2 rounded-xl border sm:hidden 
         flex text-2xl justify-between items-center"
    >
      {icons.map((val) => (
        <li
          key={val.name}
          className="cursor-pointer p-1 rounded-xl hover:bg-gray-700 text-center
          transition-all duration-200"
        >
          {val.icon}
        </li>
      ))}
    </ul>
  );
}
