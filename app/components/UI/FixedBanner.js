export default function FixedBanner({color, message}) {
  return (
    <div className="fixed top-3 left-0 w-full flex justify-center">
      <div className={`w-[300px] text-sm ${color}  h-8 flex justify-center items-center text-white rounded-lg font-bold`}>
        {message}
      </div>
    </div>
  );
}
