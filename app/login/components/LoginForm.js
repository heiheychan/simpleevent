"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";

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
    signIn("credentials", {
      email,
      password: enteredPassword,
      callbackUrl: '/dashboard'
    });
  }

  return (
    <div className="w-full flex flex-col max-w-[400px] mt-6">
      {error.length > 0 && (
        <FixedBanner color="bg-red-500" messages={error} />
      )}
      <TextInput
        type="text"
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
      <Button content="Log in" onClickHandler={onClickHandler} bgcolor="bg-red-500" />
    </div>
  );
}
