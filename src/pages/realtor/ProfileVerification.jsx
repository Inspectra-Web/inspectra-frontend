import Button from "../../components/Button";
import Form from "../../components/Form";
import IntroHeading from "../../components/IntroHeading";
import { HiOutlineQrCode } from "react-icons/hi2";
import { useState } from "react";
import { handleFileChange } from "../../helpers/FileReader";
import { ImageUpload } from "./ImageUpload";
import { SelectedUpload } from "./SelectedUpload";
import { useUploadVerificationDoc } from "../../hooks/useProfile";
import { useUser } from "../../hooks/useAuth";
import { LoaderSm } from "../../static/Loaders";

export default function ProfileVerification() {
  const [selectedID, setSelectedID] = useState(null);
  const [selectedID1, setSelectedID1] = useState(null);
  const [selectedID2, setSelectedID2] = useState(null);
  const [selectedID3, setSelectedID3] = useState(null);
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");

  const { user } = useUser();
  const { uploadDoc, isPending } = useUploadVerificationDoc();

  const handleSubmit = (e, selectedFile, setSelectedFile, setError, type) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please upload a document.");
      return;
    }

    const formData = new FormData();
    formData.append("type", type);
    formData.append("document", selectedFile.file);

    uploadDoc({ id: user?._id, data: formData });
    setSelectedFile(null);
  };

  return (
    <>
      <IntroHeading label="Upload Verification Document" />
      <div className="grid gap-14">
        <Form
          width="w-full"
          onSubmit={(e) =>
            handleSubmit(
              e,
              selectedID,
              setSelectedID,
              setError,
              "government-issued-id"
            )
          }
        >
          <ImageUpload
            labelId="upload-id"
            btnLabel="Upload ID"
            uploadLabel="Upload One Government-Issued ID"
            boldDescription="National ID Card // Driver's License // International Passport // Voter's Card (Should be valid and not expired)"
            smallDescription="Accepted formats: PDF, JPG, PNG, WebP | 5MB max size recommended."
            onHandleUpload={(e) => handleFileChange(e, setSelectedID, setError)}
          />
          {error && <p className="text-red-500 text-center mb-5">{error}</p>}
          {selectedID && (
            <>
              <SelectedUpload
                name={selectedID.name}
                src={selectedID.src}
                setSelectedID={setSelectedID}
                size={selectedID.size}
                type={selectedID.type}
              />
            </>
          )}

          <Button disabled={isPending}>
            {isPending ? (
              <LoaderSm />
            ) : (
              <>
                <span>Send</span>
                <HiOutlineQrCode size={24} className="rotate-90" />
              </>
            )}
          </Button>
        </Form>
        <Form
          width="w-full"
          onSubmit={(e) =>
            handleSubmit(
              e,
              selectedID1,
              setSelectedID1,
              setError1,
              "qualification"
            )
          }
        >
          <ImageUpload
            labelId="upload-certificate"
            btnLabel="Upload Certificate"
            uploadLabel="Confirm your qualifications in real estate."
            boldDescription="Real Estate Training Certificate // Realtor Accreditation Certification // Professional Membership Certificate (e.g., NIESV in Nigeria)"
            smallDescription="Must show your name and date of issuance. Accepted formats: PDF, JPG, PNG, WebP | 5MB max size recommended."
            onHandleUpload={(e) =>
              handleFileChange(e, setSelectedID1, setError1)
            }
          />
          {error1 && <p className="text-red-500 text-center mb-5">{error1}</p>}
          {selectedID1 && (
            <>
              <SelectedUpload
                name={selectedID1.name}
                src={selectedID1.src}
                setSelectedID={setSelectedID1}
                size={selectedID1.size}
                type={selectedID1.type}
              />
            </>
          )}
          <Button disabled={isPending}>
            {isPending ? (
              <LoaderSm />
            ) : (
              <>
                <span>Send</span>
                <HiOutlineQrCode size={24} className="rotate-90" />
              </>
            )}
          </Button>
        </Form>
        <Form
          width="w-full"
          onSubmit={(e) =>
            handleSubmit(e, selectedID2, setSelectedID2, setError2, "license")
          }
        >
          <ImageUpload
            labelId="upload-license"
            btnLabel="Upload License"
            uploadLabel="Agency/Agent License"
            boldDescription="Real Estate Agent License // Agency License"
            smallDescription="Must include license number and expiry date. Accepted formats: PDF, JPG, PNG, WebP | 5MB max size recommended. "
            onHandleUpload={(e) =>
              handleFileChange(e, setSelectedID2, setError2)
            }
          />

          {error2 && <p className="text-red-500 text-center mb-5">{error2}</p>}
          {selectedID2 && (
            <>
              <SelectedUpload
                name={selectedID2.name}
                src={selectedID2.src}
                setSelectedID={setSelectedID2}
                size={selectedID2.size}
                type={selectedID2.type}
              />
            </>
          )}

          <Button disabled={isPending}>
            {isPending ? (
              <LoaderSm />
            ) : (
              <>
                <span>Send</span>
                <HiOutlineQrCode size={24} className="rotate-90" />
              </>
            )}
          </Button>
        </Form>
        <Form
          width="w-full"
          onSubmit={(e) =>
            handleSubmit(
              e,
              selectedID3,
              setSelectedID3,
              setError3,
              "utility-bill"
            )
          }
        >
          <ImageUpload
            labelId="upload-bill"
            btnLabel="Upload Bill"
            uploadLabel="Utility Bill for Address Verification"
            boldDescription="Electricity Bill // Water Bill // Waste Management Bill"
            smallDescription="Should be recent (within the last 3 months). Accepted formats: PDF, JPG, PNG, WebP | 5MB max size recommended."
            onHandleUpload={(e) =>
              handleFileChange(e, setSelectedID3, setError3)
            }
          />
          {error3 && <p className="text-red-500 text-center mb-5">{error3}</p>}
          {selectedID3 && (
            <>
              <SelectedUpload
                name={selectedID3.name}
                src={selectedID3.src}
                setSelectedID={setSelectedID3}
                size={selectedID3.size}
                type={selectedID3.type}
              />
            </>
          )}

          <Button disabled={isPending}>
            {isPending ? (
              <LoaderSm />
            ) : (
              <>
                <span>Send</span>
                <HiOutlineQrCode size={24} className="rotate-90" />
              </>
            )}
          </Button>
        </Form>
      </div>
    </>
  );
}
