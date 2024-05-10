import { FormEvent, useState } from "react";
import InputPassword from "../atoms/InputPassword";
import InputText from "../atoms/InputText";
import Button from "../atoms/Button";

export default function SignIn() {
  const [isPasswordVisibile, setIsPasswordVisible] = useState<boolean>(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form
      className="flex flex-col gap-4 w-60 bg-dark-blue rounded-2xl py-5 px-4 shadow-md"
      onSubmit={handleSubmit}
    >
      <InputText
        width="w-full"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <InputPassword
        width="w-full"
        borderColor=""
        iconColor="stroke-dark-blue"
        onPasswordVisibilityChange={() =>
          setIsPasswordVisible(!isPasswordVisibile)
        }
        isPasswordVisible={isPasswordVisibile}
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button loading={isPasswordVisibile} className="w-28" title="Sign In" />
    </form>
  );
}
