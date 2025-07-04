import {
  HiOutlineEnvelope,
  HiOutlineFaceSmile,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";
import Button from "../../components/Button";
import ParticlesBg from "../../components/ParticlesBg";
import { Container } from "../../ui/Container";
import { Header } from "../../ui/Header";
import { Form } from "../../ui/Form";
import { FormFieldHolder } from "../../ui/FormFieldHolder";
import { FormInput } from "../../ui/FormInput";
import GoBackBtn from "../../components/GoBackBtn";
import { TbFileDescription, TbUrgent } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { useOnePropertyListing } from "../../hooks/useProperty";
import { LoaderLg, LoaderSm } from "../../static/Loaders";
import { useForm } from "react-hook-form";
import { useSendInquiryMessage } from "../../hooks/useInquiry";
import { IoCallOutline } from "react-icons/io5";
import { useUser } from "../../hooks/useAuth";

export default function PropertyInquiryForm() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { id } = useParams();
  const { isPending, property, realtor } = useOnePropertyListing(id);
  const { isSending, sendInquiry } = useSendInquiryMessage();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  function onSubmit({ message, urgencyLevel, preferredContactMethod }) {
    sendInquiry(
      {
        property: id,
        message,
        urgencyLevel,
        preferredContactMethod,
      },
      {
        onSuccess: () => {
          reset();
          navigate("/client/inquiries");
        },
      }
    );
  }
  if (!property || isPending) return <LoaderLg />;
  return (
    <Container>
      <ParticlesBg />
      <Header
        description="Sending an Inquiry to:"
        link={`/realtor-detail/${realtor?.profile}`}
        label={<span className="capitalize">{realtor?.fullname}</span>}
      />
      <GoBackBtn />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        heading="Property Inquiry Form"
        description="Provide your details and the realtor of selected property will reach out to you shortly."
      >
        <h2 className="heading-2 text-center">{property?.title}</h2>
        <p className="font-bold text-5xl text-white text-center">
          ({property?.propertyId})
        </p>

        <FormFieldHolder label="full name" error={errors?.clientName?.message}>
          <FormInput
            id="full-name"
            type="text"
            placeholder="Enter full name"
            defaultValue={user?.fullname.toUpperCase()}
            disabled
            icon={
              <HiOutlineFaceSmile className="text-xlg text-blue-500 cursor-default" />
            }
          />
        </FormFieldHolder>
        <FormFieldHolder label="email" error={errors?.clientEmail?.message}>
          <FormInput
            id="email"
            type="email"
            placeholder="Enter email address"
            defaultValue={user?.email}
            disabled
            icon={
              <HiOutlineEnvelope className="text-xlg text-blue-500 cursor-default" />
            }
          />
        </FormFieldHolder>
        <FormFieldHolder
          label="Preferred Contact Method"
          error={errors?.urgencyLevel?.message}
        >
          <FormInput
            id="contact-method"
            selectOption={true}
            icon={
              <IoCallOutline className="text-xlg text-blue-500 cursor-default" />
            }
            optionData={
              <>
                <option value="">
                  Kindly select your preferred contact method?
                </option>
                <option value="whatsapp">whatsapp</option>
                <option value="facebook">facebook</option>
                <option value="email">email</option>
                <option value="any">any</option>
              </>
            }
            {...register("preferredContactMethod", {
              required: "Kindly select your preferred contact method",
            })}
          />
        </FormFieldHolder>
        <FormFieldHolder label="inquiry" error={errors?.message?.message}>
          <FormInput
            textarea={true}
            id="inquiry"
            placeholder="Write a note or description"
            defaultValue={`Hello, I’m interested in this property and would love to know more details. Is it still available? Could you share more information about the pricing, payment options, and inspection schedule? Looking forward to your response. Thank you!`}
            icon={
              <TbFileDescription className="text-xlg text-blue-500 cursor-default" />
            }
            {...register("message", { required: "Enter your inquiry message" })}
          />
        </FormFieldHolder>
        <FormFieldHolder
          label="urgency level"
          error={errors?.urgencyLevel?.message}
        >
          <FormInput
            id="urgency-level"
            selectOption={true}
            icon={
              <TbUrgent className="text-xlg text-blue-500 cursor-default" />
            }
            optionData={
              <>
                <option value="" disabled>
                  How urgently do you need this property?
                </option>
                <option value="immediately (within a week)">
                  immediately (within a week)
                </option>
                <option value="soon (within a month)">
                  soon (within a week)
                </option>
                <option value="flexible (1 - 3 months)">
                  flexible (1 - 3 months)
                </option>
                <option value="not urgent (3+ months)">
                  not urgent (3+ months)
                </option>
              </>
            }
            {...register("urgencyLevel", {
              required: "Kindly select your urgency level",
            })}
          />
        </FormFieldHolder>
        <div className="mt-20">
          <Button disabled={isSending}>
            {isSending ? (
              <LoaderSm />
            ) : (
              <>
                <span>Submit Inquiry</span>
                <HiOutlinePaperAirplane size={24} />
              </>
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
