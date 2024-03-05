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
      className="absolute text-xl left-3 lg:left-6 top-3 cursor-pointer"
    >
      <IoArrowBackOutline />
    </span>
  );
}
