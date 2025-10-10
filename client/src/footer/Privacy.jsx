import React from "react";

const privacy = [
  {
    title: "Information Collection",
    description: "We collect information you provide directly, such as account details, profile information, and items you post. Additionally, we automatically gather device information, IP addresses, usage patterns, and cookies to improve the platform."
  },
  {
    title: "Use of Information",
    description: "Your information is used to provide, maintain, and enhance CampusShare services. This includes sending notifications, improving features, personalizing experiences, and ensuring a safe environment for all users."
  },
  {
    title: "Data Sharing",
    description: "CampusShare does not sell your personal information. We may share data with trusted partners or law enforcement only when required to protect rights, safety, or property, or as legally mandated."
  },
  {
    title: "Cookies & Tracking",
    description: "We use cookies, web beacons, and similar technologies to analyze site usage, remember preferences, and optimize your experience. You may manage cookies via browser settings, but some features may be affected."
  },
  {
    title: "User Control",
    description: "You can access, update, or delete your personal information anytime via your account settings. You may also opt out of marketing emails or notifications without affecting core service functionality."
  },
  {
    title: "Security",
    description: "We employ industry-standard security measures, such as encryption and secure servers, to protect your data. While we strive to safeguard your information, no system can be 100% secure."
  },
  {
    title: "Third-Party Links",
    description: "Our platform may include links to third-party websites or services. CampusShare is not responsible for their privacy practices or content. Users are encouraged to review their policies separately."
  },
  {
    title: "Changes to Policy",
    description: "We may update this Privacy Policy periodically. Continued use of CampusShare indicates acceptance of any changes. Users will be notified of significant updates via the platform or email."
  }
];

const PrivacyPolicy = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">

      {/* Header */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-[#2b59b5]">Privacy Policy</h1>
        <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
          Your privacy matters to us. This Privacy Policy explains how NGJugaad collects, uses, stores, and protects your personal information while providing a safe and trustworthy community.
        </p>
      </section>

      {/* Policy Sections */}
      <section className="space-y-12">
        {privacy.map((item, index) => (
          <div key={index} className="p-6 border-l-4 border-[#48d6a8] bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-[#48d6a8]">{item.title}</h2>
            <p className="text-gray-800 text-lg mt-2 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h2 className="text-4xl font-semibold text-[#2b59b5]">Stay Informed & Protected</h2>
        <p className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed">
          Regularly review this Privacy Policy to understand how your data is managed and protected. Using CampusShare indicates your acceptance of these practices, ensuring a secure and trustworthy experience for all users.
        </p>
      </section>

    </div>
  );
};

export default PrivacyPolicy;

