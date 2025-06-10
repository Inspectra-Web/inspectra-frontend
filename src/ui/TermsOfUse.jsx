import GoBackBtn from "../components/GoBackBtn";

const informations = [
  {
    title: "Acceptance of Terms",
    description:
      "By using Inspectra, you agree to comply with these terms and all applicable laws and regulations.",
  },
  {
    title: "User Responsibilities",
    details: [
      "You agree to provide accurate information when creating an account or posting listings.",
      "You will not upload false, misleading, or fraudulent property listings.",
      "You understand that Inspectra does not guarantee the authenticity of listings or agents.",
    ],
  },
  {
    title: "Platform Use",
    details: [
      "Inspectra grants you a limited, non-exclusive, revocable license to use the platform for property search and related activities.",
      "You may not misuse or interfere with the platform, including but not limited to hacking, spamming, or unauthorized data collection.",
    ],
  },
  {
    title: "Payments and Transactions",
    details: [
      "Any payments or transactions between users and agents are made at your own risk. Inspectra is not responsible for any loss or damage resulting from such transactions.",
      "Always verify properties and agents independently before making payments.",
    ],
  },
  {
    title: "Content",
    details: [
      "You retain ownership of your content but grant Inspectra a license to display it on the platform.",
      "Inspectra may remove or disable access to content that violates these terms or is reported as suspicious.",
    ],
  },
  {
    title: "Limitation of Liability",
    details: [
      "Inspectra is provided 'as is' without warranties of any kind. We do not guarantee the accuracy, reliability, or security of the platform.",
      "We are not liable for any damages resulting from your use of Inspectra.",
    ],
  },
  {
    title: "Changes to Terms",
    description:
      "Inspectra may update these terms at any time. Continued use of the platform means you accept the updated terms.",
  },
];

export default function TermsOfUse() {
  return (
    <main>
      <div className="container mx-auto bg-white border p-16 rounded-3xl max-w-7xl">
        <div className="mb-12">
          <h1 className="heading-2">Inspectra Terms of Use</h1>
          <p className="text-gray-500 text-sm">Last Updated: May 19, 2025</p>
        </div>

        <div className="max-w-none">
          <p className="mb-8 text-lg">
            Welcome to Inspectra! By accessing or using our platform, you agree
            to these Terms of Use. Please read them carefully.
          </p>

          {informations.map((info, index) => (
            <section key={index} className="mb-14">
              <h2
                className="font-medium text-sky-500 text-3xl mb-2 italic"
                id="acceptance"
              >
                {index + 1}. {info.title}
              </h2>
              <p>{info.description}</p>
              {info.details?.map((detail, idx) => (
                <ul key={idx} className="pl-6 leading-10">
                  <li>- {detail}</li>
                </ul>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-gray-200 pt-8 flex justify-center">
          <GoBackBtn />
        </div>
      </div>
    </main>
  );
}
