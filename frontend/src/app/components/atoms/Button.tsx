import clsx from "clsx";
import Loading from "./icons/Loading";

interface ButtonProps {
  className?: string;
  title: string;
  onClick?: () => void;
  loading?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-full p-2 bg-gunmetal text-white text-sm",
        props.className
      )}
      type={props.type}
    >
      {props.loading ? (
        <div className="flex justify-center">
          <Loading width="w-5" height="h-5" />
        </div>
      ) : (
        props.title
      )}
    </button>
  );
}
