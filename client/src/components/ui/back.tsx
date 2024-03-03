import { IoArrowBackOutline } from "react-icons/io5";

export default function Back() {
  const goBack = () => {};
  return (
    <span
      onClick={goBack}
      className="absolute text-xl left-3 lg:left-6 top-3 cursor-pointer"
    >
      <IoArrowBackOutline />
    </span>
  );
}
