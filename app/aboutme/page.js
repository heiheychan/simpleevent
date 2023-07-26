import React from "react";

export default function AboutMe() {
  return (
    <div className="font-serif flex flex-col items-center justify-center sm:justify-start">
      <div className="max-w-[390px] pt-8">
        <h1 className="2xl mb-4 font-bold">About me</h1>
        <p className="mb-2">
          Hi, I&apos;m Bill, a Product Manager based in New York. Love coding
          when I am not product managing.
        </p>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/billcch/"
          rel="noopener noreferrer"
          className="underline  text-blue-500"
        >
          Connect with me on Linkedin
        </a>
      </div>
    </div>
  );
}
