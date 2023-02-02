import { useForm, SubmitHandler } from "react-hook-form";
import { LoginData } from "@/context/auth/types";
import Input from "../common/inputs/Input";
import AuthLayout from "./Layout";
import { api } from "@/utils/api";
import Router from "next/router";

export default function Login() {
  const { register, handleSubmit, reset } = useForm<LoginData>();

  const {
    mutate: login,
    error: err,
    isLoading,
  } = api.auth.requestOtp.useMutation({
    onSuccess() {
      reset();
      Router.push("/auth/verify-otp");
    },
  });

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    if (isLoading) return;
    login(data);
  };

  return (
    <AuthLayout err={err}>
      <Input
        register={register("email", { required: true })}
        placeholder="your-email@example.ma"
        label="Email:"
      />

      <button
        className="btn btn-primary w-full"
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        Login
      </button>

      <div className="bg-light p-4 text-center text-sm">
        After you click on the "login" button <br />
        an email containing a one time password (OTP) <br />
        that you can use will be sent to your inbox.
      </div>
    </AuthLayout>
  );
}
