import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../common/inputs/Input";
import { api } from "@/utils/api";
import AuthLayout from "./Layout";
import Router from "next/router";

export default function VerifyAuthOtp() {
  const { mutate: verifyOtp, error: err } = api.auth.verifyOtp.useMutation({
    onSuccess() {
      Router.push("/dashboard");
    },
  });

  const { handleSubmit, register, reset } = useForm<{ code: string }>();
  const onSubmit: SubmitHandler<{ code: string }> = (data) => {
    verifyOtp(data);
    reset();
  };

  return (
    <AuthLayout err={err}>
      <Input
        register={register("code", { required: true })}
        label="Otp code"
        placeholder="xxx xxx"
      />

      <button
        className="btn btn-primary w-full"
        onClick={handleSubmit(onSubmit)}
      >
        Verify Otp
      </button>

      <div className="bg-light p-4 text-center text-sm">
        An email containing a one time password (OTP) <br />
        that you can use has been sent to your inbox, <br />
        make sure to check your spam section if you cannot find it.
      </div>
    </AuthLayout>
  );
}
