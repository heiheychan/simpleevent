export default function HomeHeader() {
  return (
    <div className="flex flex-col items-center container text-center">
      <div className="font-serif rounded-lg border-gray-500 border w-10 h-10 flex justify-center items-center">
        S.
      </div>
      <h1 className="text-6xl font-light mt-2">
        Simple
        <br />
        event.
      </h1>
      <p className="mt-6 max-w-[400px]">
        Plan your perfect party and coordinate dishes. Create a party page{" "}
        <span className="underline decoration-1">under 1 minute</span>.
      </p>
    </div>
  );
}
