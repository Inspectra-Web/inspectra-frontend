import { HiOutlinePaperAirplane } from "react-icons/hi2";
import Button from "../../components/Button";
import ParticlesBg from "../../components/ParticlesBg";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useOtp } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { LoaderSm } from "../../static/Loaders";
import { Container } from "../../ui/Container";
import { Header } from "../../ui/Header";
import { Form } from "../../ui/Form";
import { FormFieldHolder } from "../../ui/FormFieldHolder";

export default function OtpForm() {
  const { otpToken } = useParams();
  const [otp, setOtp] = useState("");
  const { otpData, isPending } = useOtp();

  function onSubmit(e) {
    e.preventDefault();
    otpData({ otp, otpToken }, { onSuccess: () => setOtp("") });
  }

  const handlePaster = (event) => event.clipboardData.getData("text");

  return (
    <Container>
      <ParticlesBg />
      <Header
        description="Don't have an account?"
        link="/sign-up"
        label="Sign up"
      />
      <Form
        onSubmit={onSubmit}
        heading="OTP Verification"
        description="Please enter the OTP (one time password) to verify your account. A Code has been sent to your mail."
      >
        <FormFieldHolder label="otp">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderInput={(props) => <input {...props} />}
            onPaste={handlePaster}
            placeholder="****"
            containerStyle={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "1.6rem",
              marginTop: "1rem",
            }}
            inputStyle={{
              width: "100%",
              height: "6rem",
              borderRadius: "0.8rem",
              backgroundColor: "#232A31",
              border: "none",
              outline: "none",
              fontFamily: "inherit",
              fontSize: "2rem",
              padding: "0 2rem",
              color: "#fff",
              fontWeight: "bold",
            }}
            shouldAutoFocus={true}
          />
        </FormFieldHolder>
        <div className="mt-20 flex items-center justify-between text-white">
          <Button disabled={isPending}>
            {isPending ? (
              <LoaderSm />
            ) : (
              <>
                <span>Verify Otp</span>
                <HiOutlinePaperAirplane size={24} />
              </>
            )}
          </Button>
          {/* <button className="text-blue-500 hover:text-blue-400 transition-all duration-300 ease-linear">
            Resend OTP Mail
          </button> */}
        </div>
      </Form>
    </Container>
  );
}
