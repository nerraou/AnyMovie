import { FormEvent, useState } from "react";
import InputPassword from "../atoms/InputPassword";
import InputText from "../atoms/InputText";
import Button from "../atoms/Button";
import useSignUpMutation from "../services/useSignUpMutation";

export default function SignUp() {
  const [isPasswordVisibile, setIsPasswordVisible] = useState<boolean>(false);

  const signInMutation = useSignUpMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (username && password) {
      signInMutation.mutate({
        username,
        password,
      });
    }
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

      <Button
        loading={signInMutation.isPending}
        className="w-28"
        title="Sign Up"
      />
    </form>
  );
}
