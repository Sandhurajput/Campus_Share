import React from "react";

const communityFeatures = [
  {
    title: "Active Student Groups",
    description: "Join various student-led groups for sharing items, discussing ideas, and collaborating on campus projects. Connect with peers who have similar interests and make your sharing experience more engaging."
  },
  {
    title: "Events & Meetups",
    description: "Participate in campus events, workshops, and meetups to interact with peers, exchange knowledge, and expand your network. These events help foster meaningful relationships beyond just item sharing."
  },
  {
    title: "Discussion Forums",
    description: "Engage in forums to ask questions, share tips, provide advice, and discuss campus life experiences. Stay updated with trending topics and learn from other students' experiences."
  },
  {
    title: "Recognition & Rewards",
    description: "Earn points, badges, and special recognitions for active participation, responsible borrowing or lending, and contributing positively to the community. High-rated members can become campus ambassadors."
  },
  {
    title: "Community Guidelines",
    description: "Follow clear rules to ensure safe, respectful, and supportive interactions among all students. Our guidelines promote transparency, trust, and accountability across the platform."
  },
  {
    title: "Mentorship & Peer Support",
    description: "Connect with senior students and experienced peers for guidance on academic projects, resource sharing tips, and campus life advice."
  },
  {
    title: "Sustainability Initiatives",
    description: "Participate in eco-friendly initiatives, donation drives, and resource recycling programs to promote a greener campus while using Barter & Borrow."
  }
];

const Community = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">
      
      {/* Header Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-[#2b59b5]">Our Community</h1>
        <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
          NGJugaad is not just a platform — it's a thriving student community where collaboration, sustainability, and peer-to-peer support come together. Students can borrow, lend, and connect to make campus life smarter and more rewarding.
        </p>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Our community encourages students to share resources responsibly, learn from each other, and actively contribute to a culture of trust, cooperation, and sustainability.
        </p>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {communityFeatures.map((feature, index) => (
          <div 
            key={index} 
            className="space-y-3 p-6 border-2 border-[#48d6a8] rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white hover:bg-[#f0fdf8]"
          >
            <h2 className="text-2xl font-semibold text-[#48d6a8]">{feature.title}</h2>
            <p className="text-gray-800 text-lg">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Join the Community Section */}
      <section className="text-center space-y-6 mt-12">
        <h2 className="text-4xl font-semibold text-[#2b59b5]">Join Our Community</h2>
        <p className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed">
          Sign up today to start borrowing, lending, and participating in campus activities. Be part of a <strong>sustainable, responsible, and supportive student network</strong> that makes a real impact.
        </p>
        <p className="text-md text-gray-700 max-w-2xl mx-auto leading-relaxed">
          By joining, you will have access to exclusive events, forums, recognition programs, and mentorship opportunities. Share, learn, and grow with your peers.
        </p>
      
      </section>

      {/* Optional Footer Note */}
      <section className="text-center text-gray-500 text-sm mt-12">
        <p>
          NGJugaad is committed to creating a safe, transparent, and sustainable campus sharing environment. All members are expected to follow community guidelines and promote positive engagement.
        </p>
      </section>

    </div>
  );
};

export default Community;

