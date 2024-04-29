"use client";

import InputPassword from "./components/atoms/InputPassword";
import InputSearch from "./components/atoms/InputSearch";
import InputText from "./components/atoms/InputText";

export default function Home() {
  return (
    <div className="flex flex-col bg-cream justify-center items-center">
      <h1>Hello World</h1>
      <InputText onChange={() => {}} placeholder="text" />
      <InputSearch onChange={() => {}} placeholder="search" />
      <InputPassword
        onChange={() => {}}
        placeholder="password"
        borderColor="border-dark-blue"
        iconColor="stroke-dark-blue"
      />
    </div>
  );
}
