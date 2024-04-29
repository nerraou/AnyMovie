"use client";

import clsx from "clsx";
import React, { ChangeEvent, forwardRef } from "react";
import Search from "./icons/Search";

interface InputPasswordProps {
  value?: string;
  name?: string;
  borderColor?: string;
  placeholder: string;
  width?: string;
  height?: "base" | "large";
  isDisabled?: boolean;
  isPasswordVisible?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordVisibilityChange?: () => void;
}

const InputSearch = forwardRef<HTMLInputElement, InputPasswordProps>(
  function InputPassword(props, ref) {
    let height = "h-10";
    const defaultWidth = "w-96";
    const width = props.width || defaultWidth;

    if (props.height == "large") {
      height = "h-16";
    }

    return (
      <div
        className={clsx(
          width,
          height,
          "border-2 rounded-full outline-none border-dark-blue focus-within:border-light-blue",
          "flex justify-between items-center box-border px-5 overflow-hidden text-gunmetal bg-white"
        )}
      >
        <input
          type="text"
          name={props.name}
          ref={ref}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          className="bg-white w-full outline-none"
          disabled={props.isDisabled}
        />

        <Search />
      </div>
    );
  }
);

export default InputSearch;
