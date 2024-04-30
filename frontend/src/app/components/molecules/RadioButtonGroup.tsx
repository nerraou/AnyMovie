import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";

interface SelectButtonProps {
  text: string;
  selected: boolean;
}

function SelectButton(props: SelectButtonProps) {
  return (
    <button
      className={clsx("text-lg border-4 w-24 h-12 rounded-full", {
        "text-gunmetal border-light-blue": !props.selected,
        "text-cream border-light-blue bg-gunmetal": props.selected,
      })}
    >
      {props.text}
    </button>
  );
}

interface RadioButtonGroupProps {
  value: string;
  values: string[];
  margin?: string;
  onChange: (value: string) => void;
}

export default function RadioButtonGroup(props: RadioButtonGroupProps) {
  return (
    <RadioGroup
      className={clsx("flex flex-wrap gap-5", props.margin)}
      value={props.value}
      onChange={props.onChange}
    >
      {props.values.map((value) => {
        return (
          <RadioGroup.Option key={value} value={value}>
            {({ checked }) => <SelectButton selected={checked} text={value} />}
          </RadioGroup.Option>
        );
      })}
    </RadioGroup>
  );
}
