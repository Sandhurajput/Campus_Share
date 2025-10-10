import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    step: 1,
    title: "Sign Up & Create Profile",
    description: "Create your account and set up your profile with the items you want to lend or borrow.",
  },
  {
    step: 2,
    title: "Browse or Post Items",
    description: "Explore items available on campus or post your own items with descriptions and availability.",
  },
  {
    step: 3,
    title: "Request & Borrow",
    description: "Send a borrowing request. Once approved, coordinate safely through the internal chat system.",
  },
  {
    step: 4,
    title: "Return & Rate",
    description: "Return the item after use and rate each other to maintain trust and reliability.",
  },
  {
    step: 5,
    title: "Save & Share",
    description: "Save money, reduce waste, and contribute to a sustainable campus community.",
  },
];

const Works = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-12">
      <h1 className="text-5xl font-bold text-center text-[#2b59b5] mb-12">
        How It Works
      </h1>

      <div className="space-y-8">
        {steps.map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#48d6a8] shadow-sm"
          >
            <div className="flex items-center space-x-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#48d6a8] flex items-center justify-center text-white font-bold text-lg">
                {item.step}
              </div>
              <h2 className="text-2xl font-semibold text-[#3a75c4]">{item.title}</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Works;
