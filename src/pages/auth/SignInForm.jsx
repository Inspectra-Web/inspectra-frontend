import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";
import Button from "../../components/Button";
import ParticlesBg from "../../components/ParticlesBg";
import { useLogin } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Container } from "../../ui/Container";
import { Header } from "../../ui/Header";
import { Form } from "../../ui/Form";
import { FormFieldHolder } from "../../ui/FormFieldHolder";
import { LoaderSm } from "../../static/Loaders";
import { FormInput } from "../../ui/FormInput";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function SignInForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    location.state?.from?.pathname ||
    localStorage.getItem("redirectAfterLogin");
  const { login, isPending } = useLogin();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  function onSubmit({ email, password }) {
    login(
      { email, password },
      {
        onSuccess: (data) => {
          reset();

          const role = data.role;

          const destination = from
            ? from
            : role === "client"
            ? "/client/dashboard"
            : "/app/overview";

          navigate(destination, { replace: true });
          localStorage.removeItem("redirectAfterLogin");
        },
      }
    );
  }
  return (
    <Container>
      <ParticlesBg />
      <Header
        description="Don't have an account?"
        link="/sign-up"
        label="Sign up"
      />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        heading="Sign in"
        description="Enter your verified email address and password to login
          your account"
      >
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
            })}
          />
        </FormFieldHolder>
        <FormFieldHolder label="password" error={errors?.password?.message}>
          <FormInput
            id="password"
            type="password"
            placeholder="Enter password"
            disabled={isPending}
            icon={
              <HiOutlineLockClosed className="text-xlg text-blue-500 cursor-default" />
            }
            {...register("password", {
              required: "Please enter your password",
            })}
          />
        </FormFieldHolder>
        <div className="mt-20 flex items-center justify-between text-white">
          <Button disabled={isPending}>
            {isPending ? (
              <LoaderSm />
            ) : (
              <>
                <span>Sign in</span>
                <HiOutlinePaperAirplane size={24} />
              </>
            )}
          </Button>
          <Link
            to="/forgot-password"
            className="text-blue-500 hover:text-blue-400 transition-all duration-300 ease-linear"
          >
            Forgot Password?
          </Link>
        </div>
      </Form>
    </Container>
  );
}
