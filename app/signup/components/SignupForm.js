"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { hasCookie, getCookie, deleteCookie } from "cookies-next";

import Button from "@/app/components/UI/Button";
import FixedBanner from "@/app/components/UI/FixedBanner";
import TextInput from "@/app/components/UI/TextInput";
import { checkPasswordStrength } from "@/lib/checkPasswordStrength";
import { signIn } from "next-auth/react";

export default function SignupForm({ email }) {
  const error = [];
  const router = useRouter();

  const [enteredName, setEnteredName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState();
  const [passwordLevel, setPasswordLevel] = useState("text-gray-500");

  const enteredNameHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const enteredPasswordHandler = (e) => {
    setPasswordLevel(checkPasswordStrength(e.target.value));
    setEnteredPassword(e.target.value);
  };

  const onClickHandler = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/user/signup", {
        email: email.toLowerCase(),
        password: enteredPassword,
        name: enteredName,
      })
      .catch((error) => {
        router.push("/");
      });

    let callbackUrl = "/dashboard";

    if (hasCookie("return_path")) {
      callbackUrl = getCookie("return_path");
      deleteCookie("return_path");
    }

    signIn("credentials", {
      email,
      password: enteredPassword,
      callbackUrl,
    });
  };

  return (
    <div className="w-full flex flex-col max-w-[400px] mt-6">
      {error.length > 0 && <FixedBanner color="bg-red-500" messages={error} />}
      <TextInput
        placeholder="example@example.com"
        label="Email address*"
        type="text"
        disable={true}
        value={email}
      />
      <TextInput
        placeholder="Bill"
        label="Your name"
        type="text"
        value={enteredName}
        setValue={enteredNameHandler}
      />
      <TextInput
        placeholder=""
        label="Password"
        type="password"
        subtext="Please enter a strong password"
        value={enteredPassword}
        setValue={enteredPasswordHandler}
        subtextcolor={passwordLevel.color}
      />
      <Button
        content="Sign up"
        onClickHandler={onClickHandler}
        bgcolor="bg-orange-500"
      />
    </div>
  );
}
