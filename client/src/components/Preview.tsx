import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

export default function Preview() {
  return (
    <div
      className="border border-gray-800 cursor-pointer hover:scale-[1.01] hover:shadow-sm 
      hover:shadow-gray-700
       mx-2 transition-all duration-300
        py-2 px-4 flex flex-col gap-2 rounded-xl"
    >
      <h1 className="">
        {`React is a JavaScript      library for building user 
                   interfaces, known for
        its component-based architecture and efficient rendering.`}
      </h1>
      <div className="flex justify-between items-center">
        <span className="hover:underline cursor-pointer">@vaibhav18</span>
        <span>12:20</span>
      </div>
      <div className="flex justify-between  sm:justify-around items-center">
        <div className="flex flex-col gap-1 items-center ">
          <FaThumbsUp />
          <span>20k</span>
        </div>
        <div className="flex flex-col gap-1 items-center ">
          <FaThumbsDown />
          <span>1k</span>
        </div>
      </div>
    </div>
  );
}
