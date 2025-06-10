import {
  HiOutlineLockClosed,
  HiOutlineLockOpen,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";
import ParticlesBg from "../../components/ParticlesBg";
import Button from "../../components/Button";
import { useResetPassword } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { LoaderSm } from "../../static/Loaders";
import { Container } from "../../ui/Container";
import { Header } from "../../ui/Header";
import { Form } from "../../ui/Form";
import { FormFieldHolder } from "../../ui/FormFieldHolder";
import { FormInput } from "../../ui/FormInput";

export default function ResetPassword() {
  const { token } = useParams();
  const [type, setType] = useState(true);
  const { resetData, isPending } = useResetPassword();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();

  function onSubmit({ password, passwordConfirm }) {
    resetData(
      { password, passwordConfirm, token },
      { onSuccess: () => reset() }
    );
  }
  return (
    <Container>
      <ParticlesBg />
      <Header description="Not intended?" link="/sign-in" label="Sign in" />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        heading="Reset Password"
        description="Enter your new password and retype for confirmation"
      >
        <FormFieldHolder label="password" error={errors?.password?.message}>
          <FormInput
            id="password"
            type={type ? "password" : "text"}
            placeholder="Enter password"
            disabled={isPending}
            icon={
              type ? (
                <HiOutlineLockClosed
                  className="text-xlg text-blue-500 cursor-default"
                  onClick={() => setType(!type)}
                />
              ) : (
                <HiOutlineLockOpen
                  className="text-xlg text-blue-500 cursor-default"
                  onClick={() => setType(!type)}
                />
              )
            }
            {...register("password", {
              required: "Please enter your password",
              minLength: {
                value: 8,
                message: "Password needs minimum of 8 characters",
              },
            })}
          />
        </FormFieldHolder>
        <FormFieldHolder
          label="confirm password"
          error={errors?.passwordConfirm?.message}
        >
          <FormInput
            id="confirm-password"
            type={type ? "password" : "text"}
            placeholder="Retype password"
            disabled={isPending}
            icon={
              type ? (
                <HiOutlineLockClosed
                  className="text-xlg text-blue-500 cursor-default"
                  onClick={() => setType(!type)}
                />
              ) : (
                <HiOutlineLockOpen
                  className="text-xlg text-blue-500 cursor-default"
                  onClick={() => setType(!type)}
                />
              )
            }
            {...register("passwordConfirm", {
              required: "Please retype password to confirm",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
          />
        </FormFieldHolder>
        <div className="mt-20 flex items-center justify-between text-white">
          <Button>
            {isPending ? (
              <LoaderSm />
            ) : (
              <>
                <span>Reset password</span>
                <HiOutlinePaperAirplane size={24} />
              </>
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
