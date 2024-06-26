import { ChangeEvent, forwardRef } from "react";
import clsx from "clsx";
import Eye from "./icons/Eye";
import EyeOff from "./icons/EyeOff";

interface InputPasswordProps {
  value?: string;
  name?: string;
  borderColor: string;
  iconColor: string;
  placeholder: string;
  width?: string;
  height?: "base" | "large";
  isDisabled?: boolean;
  isPasswordVisible?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordVisibilityChange?: () => void;
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  function InputPassword(props, ref) {
    let height = "h-10";
    const defaultWidth = "w-96";
    const width = props.width || defaultWidth;
    let type = "password";

    if (props.height == "large") {
      height = "h-16";
    }

    if (props.isPasswordVisible) {
      type = "text";
    }

    return (
      <div
        className={clsx(
          props.borderColor,
          width,
          height,
          "border-2 rounded-full bg-white outline-none",
          "flex justify-between items-center box-border px-5 overflow-hidden text-gunmetal"
        )}
      >
        <input
          type={type}
          name={props.name}
          ref={ref}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          className="bg-white w-full outline-none"
          disabled={props.isDisabled}
        />

        {props.isPasswordVisible && (
          <Eye
            color={props.iconColor}
            onClick={props.onPasswordVisibilityChange}
          />
        )}

        {!props.isPasswordVisible && (
          <EyeOff
            color={props.iconColor}
            onClick={props.onPasswordVisibilityChange}
          />
        )}
      </div>
    );
  }
);

export default InputPassword;
