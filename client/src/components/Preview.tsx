import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

export default function Preview() {
  return (
    <div
      className="border  py-2 px-4 flex flex-col gap-2
            rounded-xl"
    >
      <h1 className="">
        {`React is a JavaScript      library for building user 
                   interfaces, known for
        its component-based architecture and efficient rendering.`}
      </h1>
      <div className="flex gap-12">
        <span className="hover:underline cursor-pointer">@vaibhav18</span>
        <span>12:20</span>
      </div>
      <div className="flex justify-between sm:gap-4 sm:justify-normal">
        <div className="">
          <FaThumbsUp />
          <span>20k</span>
        </div>
        <div className="">
          <FaThumbsDown />
          <span>1k</span>
        </div>
      </div>
    </div>
  );
}
