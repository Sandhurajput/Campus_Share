import React from "react";

const Guidelines = () => {
  const rules = [
    {
      title: "Respect Others",
      description:
        "Treat everyone with kindness and respect. Harassment, discrimination, or hate speech of any kind will not be tolerated.",
    },
    {
      title: "Be Honest",
      description:
        "Post accurate descriptions of items you’re lending or requesting. Misleading posts may result in suspension.",
    },
    {
      title: "Safety First",
      description:
        "Meet in safe, public areas for exchanges. Never share personal information like passwords or financial details.",
    },
    {
      title: "Keep It Clean",
      description:
        "Avoid posting inappropriate or offensive content. Let’s keep this platform positive and professional.",
    },
    {
      title: "Report Issues",
      description:
        "If you see something suspicious or inappropriate, report it to the admin or support team. Together, we can maintain a healthy community.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 text-gray-800 space-y-12">
      {/* Header */}
      <header className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-[#2b59b5]">Community Guidelines</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Welcome to our campus sharing community! These guidelines ensure our platform remains safe,
          respectful, and helpful for everyone. Please read carefully before participating.
        </p>
      </header>

      {/* Rules Section */}
      <section className="space-y-8">
        {rules.map((rule, index) => (
          <div key={index} className="p-6 rounded-2xl border-l-4 border-blue-500 bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">{index + 1}. {rule.title}</h2>
            <p className="text-gray-700 text-lg">{rule.description}</p>
          </div>
        ))}
      </section>

      {/* Footer Note */}
      <footer className="text-center mt-8">
        <p className="text-gray-600 italic">
          Thank you for being a responsible and respectful member of our community!
        </p>
      </footer>
    </div>
  );
};

export default Guidelines;
