import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Back() {
  const nav = useNavigate();
  const goBack = () => {
    nav(-1);
  };
  return (
    <span
      onClick={goBack}
      className="absolute text-xl left-3 lg:left-5 top-1 cursor-pointer rounded-full
                  hover:bg-gray-800 duration-200 transition-all p-2"
    >
      <IoArrowBackOutline />
    </span>
  );
}
