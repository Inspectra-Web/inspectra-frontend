import {
  HiOutlineEnvelope,
  HiOutlineFaceSmile,
  HiOutlineLockClosed,
  HiOutlineLockOpen,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";
import Button from "../../components/Button";
import ParticlesBg from "../../components/ParticlesBg";
import { useEffect, useState } from "react";
import { useSignup } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Container } from "../../ui/Container";
import { Header } from "../../ui/Header";
import { Form } from "../../ui/Form";
import { FormFieldHolder } from "../../ui/FormFieldHolder";
import { FormInput } from "../../ui/FormInput";
import { LoaderSm } from "../../static/Loaders";
import { useSearchParams } from "react-router-dom";

export default function SignUpForm() {
  const [searchParams] = useSearchParams();
  const [type, setType] = useState(true);
  const { signup, isPending } = useSignup();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm();

  const referralCode = searchParams.get("ref");

  useEffect(() => {
    if (referralCode) setValue("referralCode", referralCode);
  }, [referralCode, setValue]);

  function onSubmit({
    fullname,
    email,
    password,
    passwordConfirm,
    role,
    referralCode,
  }) {
    signup(
      { fullname, email, password, passwordConfirm, role, referralCode },
      { onSuccess: () => reset() }
    );
  }
  return (
    <Container>
      <ParticlesBg />
      <Header
        description="Already have an account?"
        link="/sign-in"
        label="Sign in"
      />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        heading="Sign up"
        description="Enter your full name, valid email address, your role and password to register
          your account"
      >
        <FormFieldHolder label="your role" error={errors?.role?.message}>
          <FormInput
            id="role"
            optionData={
              <>
                <option value="" disabled>
                  Choose your role
                </option>
                <option value="realtor">Realtor / Agent</option>
                {/* <option value="client">User / Client</option> */}
              </>
            }
            selectOption={true}
            disabled={isPending}
            icon={
              <HiOutlineFaceSmile className="text-xlg text-blue-500 cursor-default" />
            }
            {...register("role", {
              required: "Please select role available",
            })}
          />
        </FormFieldHolder>
        <FormFieldHolder label="full name" error={errors?.fullname?.message}>
          <FormInput
            id="full-name"
            type="text"
            placeholder="Enter full name"
            disabled={isPending}
            icon={
              <HiOutlineFaceSmile className="text-xlg text-blue-500 cursor-default" />
            }
            {...register("fullname", {
              required: "Please enter your full name",
            })}
          />
        </FormFieldHolder>
        <FormFieldHolder label="email" error={errors?.email?.message}>
          <FormInput
            id="email"
            type="email"
            placeholder="Enter email address"
            disabled={isPending}
            icon={
              <HiOutlineEnvelope className="text-xlg text-blue-500 cursor-default" />
            }
            {...register("email", {
              required: "Please enter your email address",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
        </FormFieldHolder>
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
        <input type="hidden" {...register("referralCode")} />
        <div className="mt-20">
          <Button disabled={isPending}>
            {isPending ? (
              <LoaderSm />
            ) : (
              <>
                <span>Sign up</span>
                <HiOutlinePaperAirplane size={24} />
              </>
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
