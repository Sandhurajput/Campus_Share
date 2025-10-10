import React from "react";

const Help = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Help & Support</h1>
      <p className="mb-6">
        Welcome to NGJugaad Help Center! Here you’ll find answers to the most common
        questions about posting, borrowing, lending, and using our platform safely. If
        your question isn’t listed, feel free to contact our support team.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-blue-600">1. How do I post an item?</h2>
      <p className="mb-4">
        Navigate to the <strong>“Post Item”</strong> page. Enter the item name, description,
        condition, availability schedule, and upload a clear photo. Click <strong>Submit</strong>.
        Your listing will appear in the <strong>Browse Items</strong> section once approved.
        <br />
        <em>Tip:</em> Add a detailed description and multiple photos to increase your chances
        of lending your item quickly.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-blue-600">2. How can I borrow an item?</h2>
      <p className="mb-4">
        Go to the <strong>Browse Items</strong> section and search for what you need. Click
        the <strong>Request</strong> button on the item. Once the owner accepts your request,
        you can chat through the platform to arrange pickup or delivery.
        <br />
        <em>Note:</em> Always confirm pickup time and location to ensure smooth exchanges.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-blue-600">3. I can’t log in to my account</h2>
      <p className="mb-4">
        First, check your internet connection and ensure you’re using the correct credentials.
        If you forgot your password, click <strong>“Forgot Password”</strong> to reset it.
        <br />
        If login issues persist, contact our support team at <span className="text-blue-500">support@ngjugaad.com</span>.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-blue-600">4. How do I report a problem?</h2>
      <p className="mb-4">
        Found an issue with an item, a user, or the platform? Go to the <strong>Contact Us</strong> page
        or email <span className="text-blue-500">support@ngjugaad.com</span> with details.
        Provide screenshots or transaction info if possible. Our team will respond promptly.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-blue-600">5. How can I give feedback?</h2>
      <p className="mb-4">
        Your feedback helps us improve! Use the feedback form on the <strong>Contact</strong> page,
        or email your suggestions directly to <span className="text-blue-500">support@ngjugaad.com</span>.
        We value ideas on features, usability, or community improvement.
      </p>

      <p className="mt-8 text-gray-600 italic">
        Still have questions? Our support team is always ready to assist — don’t hesitate to reach out!
      </p>
    </div>
  );
};

export default Help;
