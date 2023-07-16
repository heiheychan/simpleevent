"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from 'cookies-next';
import validator from "validator";
import axios from "axios";

import Button from "./UI/Button";
import TextInput from "./UI/TextInput";
import FixedBanner from "./UI/FixedBanner";

export default function HomeForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timeoutObject = setTimeout(() => {
      setError(false);
    }, 2000);

    return () => {
      clearTimeout(timeoutObject);
    };
  }, [error]);

  const setEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (!validator.isEmail(email)) {
      setError(true);
      return;
    }

    const response = await axios.post(
      "http://localhost:3000/api/user/userexist",
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
      {error && <FixedBanner color="bg-red-500" message="Email cannot be empty" />}
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