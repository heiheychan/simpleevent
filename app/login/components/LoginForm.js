"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";
import { getCookie, deleteCookie, hasCookie } from "cookies-next";

import Button from "@/app/components/UI/Button";
import FixedBanner from "@/app/components/UI/FixedBanner";
import TextInput from "@/app/components/UI/TextInput";

export default function LoginForm({ email }) {
  const error = [];

  const [enteredPassword, setEnteredPassword] = useState();

  const setPasswordHandler = (e) => {
    setEnteredPassword(e.target.value)
  }

  const onClickHandler = (e) => {
    e.preventDefault();
    let callbackUrl = '/dashboard';

    if (hasCookie('return_path')) {
      callbackUrl = getCookie('return_path');
      deleteCookie('return_path');
    }

    signIn("credentials", {
      email: email.toLowerCase(),
      password: enteredPassword,
      callbackUrl
    });
  }

  return (
    <div className="w-full flex flex-col">
      {error.length > 0 && (
        <FixedBanner color="bg-red-500" messages={error} />
      )}
      <TextInput
        type="email"
        placeholder="example@example.com"
        label="Email address*"
        value={email}
        disable={true}
      />
      <TextInput
        type="password"
        placeholder="password"
        label="Password"
        value={enteredPassword}
        setValue={setPasswordHandler}
      />
      <Button content="Log in" onClickHandler={onClickHandler} bgcolor="bg-orange-500" />
    </div>
  );
}
