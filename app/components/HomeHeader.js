import style from "./css/style.module.css";

export default function HomeHeader() {
  return (
    <>
      <div className="font-serif rounded-lg border border-black w-10 h-10 mb-2 flex justify-center items-center bg-white">
        S.
      </div>
      <h1 className="text-6xl mb-8 text-center">
        Simple
        <br />
        <div className="h-20 mt-2 overflow-hidden">
          <div className={`${style.sp}`}></div>
          <div className={`${style.sp}`}>
            <span className="text-4xl">🎉</span> Event
          </div>
          <div className={`${style.sp}`}>
            <span className="text-4xl">🍾</span> BYOB
          </div>
          <div className={`${style.sp}`}>
            <span className="text-4xl">🍡</span> BYOF
          </div>
          <div className={`${style.sp}`}>
            <span className="text-4xl">🧋</span> BYO..anything
          </div>
        </div>
      </h1>
      <p className="text-center max-w-[390px] mb-8">
        Plan your perfect event. Coordinate{" "}
        <span className="font-bold underline">WHO</span> brings{" "}
        <span className="font-bold underline">WHAT</span> with ease.
      </p>
    </>
  );
}
