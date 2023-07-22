import { CgSpinner } from "react-icons/cg";

export default function Loading() {
  return (
    <div className="flex flex-col items-center pt-8">
      <div className="w-full min-h-[330px] sm:w-[400px] bg-white rounded-lg border border-gray-500 flex justify-center items-center">
        <CgSpinner className="animate-spin ml-2" size={30} />
      </div>
    </div>
  );
}
