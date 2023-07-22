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
      setError(["Email is not valid"]);
      return;
    }

    const response = await axios.post(
      "/api/user/userexist",
      {
        email: email.toLowerCase(),
      }
    );

    setCookie('email', email.toLowerCase());

    if (response.data.user) {
      router.push("/login");
    } else {
      router.push("/signup");
    }
  };

  return (
    <div className="w-full sm:w-[390px]">
      {error.length > 0 && <FixedBanner color="bg-red-500" messages={error} setMessages={setError}/>}
      <TextInput
        placeholder="house@party.com"
        label="📮 Enter your email to get started"
        value={email}
        setValue={setEmailHandler}
      />
      <Button content="Log in / Sign up" onClickHandler={formSubmitHandler} bgcolor="bg-orange-500" />
    </div>
  );
}