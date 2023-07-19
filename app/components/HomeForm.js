"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { setCookie } from 'cookies-next';
import validator from "validator";
import axios from "axios";

import Button from "./UI/Button";
import TextInput from "./UI/TextInput";
import FixedBanner from "./UI/FixedBanner";

export default function HomeForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState([]);
  const router = useRouter();

  const path = usePathname();

  if (path.startsWith("/e/")) {
    setCookie('return_path', path);
  }

  const setEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (!validator.isEmail(email)) {
      setError(["Email cannot be empty"]);
      return;
    }

    const response = await axios.post(
      "/api/user/userexist",
      {
        email,
      }
    );

    setCookie('email', email);

    if (response.data.user) {
      router.push("/login");
    } else {
      router.push("/signup");
    }
  };

  return (
    <div className="w-full flex flex-col max-w-[400px] mt-6">
      {error.length > 0 && <FixedBanner color="bg-red-500" messages={error} setMessages={setError}/>}
      <TextInput
        placeholder="example@example.com"
        label="Enter your email to proceed"
        value={email}
        setValue={setEmailHandler}
      />
      <Button content="Log in / Sign up" onClickHandler={formSubmitHandler} bgcolor="bg-red-500" />
    </div>
  );
}