"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import Button from "@/app/components/UI/Button";
import FixedBanner from "@/app/components/UI/FixedBanner";
import TextInput from "@/app/components/UI/TextInput";
import { checkPasswordStrength } from "@/lib/checkPasswordStrength";
import { signIn } from "next-auth/react";

export default function SignupForm({ email }) {
  const error = false;
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
    const response = await axios
      .post("http://localhost:3000/api/user/signup", {
        email,
        password: enteredPassword,
        name: enteredName,
      })
      .catch((error) => {
        console.log(error);
        router.push("/");
      });
    
    // Sign the user in
    signIn("credentials", {
      email,
      password: enteredPassword,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="w-full flex flex-col max-w-[400px] mt-6">
      {error && (
        <FixedBanner color="bg-red-500" message="Email cannot be empty" />
      )}
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
      <Button content="Sign up" onClickHandler={onClickHandler} bgcolor="bg-red-500" />
    </div>
  );
}
