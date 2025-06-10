import GoBackBtn from "../components/GoBackBtn";

const informations = [
  {
    title: "Information We Collect",
    details: [
      "We collect information you provide directly, such as when you create an account, list a property, or contact support.",
      "We may also collect information automatically through cookies and similar technologies.",
    ],
  },
  {
    title: "How We Use Your Information",
    details: [
      "To provide and maintain our services.",
      "To communicate with you, including updates and promotional content.",
      "To personalize your experience and improve our platform.",
    ],
  },
  {
    title: "Sharing Your Information",
    details: [
      "We do not sell your personal information.",
      "We may share information with trusted third-party service providers who help us operate Inspectra.",
      "We may disclose information if required by law or to protect our rights and users.",
    ],
  },
  {
    title: "Your Choices",
    details: [
      "You can access, update, or delete your account information at any time.",
      "You may opt-out of receiving promotional emails by following the unsubscribe link in our emails.",
    ],
  },
  {
    title: "Data Security",
    details: [
      "We use industry-standard security measures to protect your data.",
      "However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "Children’s Privacy",
    description:
      "Inspectra is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children.",
  },
  {
    title: "Changes to This Policy",
    description:
      "We may update this Privacy Policy from time to time. Continued use of the platform means you accept the updated policy.",
  },
];

export default function PrivacyPolicy() {
  return (
    <main>
      <div className="container mx-auto bg-white border p-16 rounded-3xl max-w-7xl">
        <div className="mb-12">
          <h1 className="heading-2">Inspectra Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last Updated: May 19, 2025</p>
        </div>

        <div className="max-w-none">
          <p className="mb-8 text-lg">
            Your privacy is important to us. This Privacy Policy explains what
            information we collect and how we use it.
          </p>

          {informations.map((info, index) => (
            <section key={index} className="mb-14">
              <h2 className="font-medium text-sky-500 text-3xl mb-2 italic">
                {index + 1}. {info.title}
              </h2>
              {info.description && <p>{info.description}</p>}
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
