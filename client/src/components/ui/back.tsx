import { IoArrowBackOutline } from "react-icons/io5";

import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();
  const goBack = () => {
    router.push("/");
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
