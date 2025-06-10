import { HiOutlineEnvelope, HiOutlinePaperAirplane } from "react-icons/hi2";
import ParticlesBg from "../../components/ParticlesBg";
import Button from "../../components/Button";
import { useForgotPassword } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { LoaderSm } from "../../static/Loaders";
import { Container } from "../../ui/Container";
import { Header } from "../../ui/Header";
import { Form } from "../../ui/Form";
import { FormFieldHolder } from "../../ui/FormFieldHolder";
import { FormInput } from "../../ui/FormInput";

export default function ForgotPassword() {
  const { forgotData, isPending } = useForgotPassword();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  function onSubmit({ email }) {
    forgotData({ email }, { onSuccess: () => reset() });
  }
  return (
    <Container>
      <ParticlesBg />
      <Header
        description="Remembered password?"
        link="/sign-in"
        label="Sign in"
      />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        heading="Forgot Password"
        description="Enter your verified email address to reset password"
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
              required: {
                required: "Please enter your email address",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
                },
              },
            })}
          />
        </FormFieldHolder>
        <div className="mt-20 flex items-center justify-between text-white">
          <Button disabled={isPending}>
            {isPending ? (
              <LoaderSm />
            ) : (
              <>
                <span>Request reset</span>
                <HiOutlinePaperAirplane size={24} />
              </>
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
