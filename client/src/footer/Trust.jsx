import React from "react";

const policies = [
  {
    title: "Verified Users Only",
    description: "All users must register with their official campus email to ensure authenticity."
  },
  {
    title: "Transparent Ratings",
    description: "Every transaction is rated by both parties to build trust and accountability."
  },
  {
    title: "Privacy Protection",
    description: "User information is securely stored and never shared without consent."
  },
  {
    title: "No Unauthorized Transactions",
    description: "Items must only be borrowed and lent via the platform. Avoid personal exchanges outside."
  },
  {
    title: "Secure Communication",
    description: "All communication should happen within the platform to maintain a record of exchanges."
  },
];

const safetyTips = [
  "Always meet in public or campus-designated areas when exchanging items.",
  "Never share personal passwords or sensitive information.",
  "Communicate via the platform’s chat system to maintain records.",
  "Report any suspicious behavior immediately to CampusShare support.",
  "Verify the condition of items before borrowing or lending."
];

const TrustSafety = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-32">

      {/* Header Section */}
      <section className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 text-center lg:text-left space-y-4">
          <h1 className="text-5xl font-bold text-[#2b59b5]">Trust & Safety</h1>
          <p className="text-lg text-gray-800 leading-relaxed">
            Your safety is our <strong>top priority</strong>. NGJugaad ensures every transaction is secure, every user is verified, and every interaction builds trust, so you can borrow and lend with confidence.
          </p>
        </div>
        <div className="lg:w-1/2">
          <img
            src="src/assets/image copy 4.png"
            alt="Trust & Safety"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </section>

      {/* Platform Policies Section */}
      <section className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#48d6a8]">Platform Policies</h2>
          {policies.map((policy, index) => (
            <div key={index} className="space-y-1">
              <h3 className="text-2xl font-semibold text-[#2b59b5]">{index + 1}. {policy.title}</h3>
              <p className="text-gray-800 text-lg">{policy.description}</p>
            </div>
          ))}
        </div>
        <div className="lg:w-1/2">
          <img
            src="src/assets/image copy 5.png"
            alt="Platform Policies"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </section>

      {/* Safety Tips Section */}
      <section className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-4">
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#2b59b5]">Safety Tips</h2>
          {safetyTips.map((tip, index) => (
            <p key={index} className="text-lg text-gray-800">{index + 1}. {tip}</p>
          ))}
        </div>
        <div className="lg:w-1/2">
          <img
            src="src/assets/image copy 6.png"
            alt="Safety Tips"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </section>

    </div>
  );
};

export default TrustSafety;
