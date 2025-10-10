import React from "react";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-24 text-gray-800">
      
      {/* About Us Section */}
      <section className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        <div className="lg:w-1/2 space-y-4">
          <h1 className="text-4xl font-bold text-[#2b59b5]">About Us</h1>
          <p className="text-lg leading-relaxed">
            NGJugaad is a <strong>student-to-student sharing platform</strong> designed to make campus life smarter, simpler, and more sustainable. Instead of buying new items, students can <strong>borrow and lend personal items</strong> like books, electronics, sports equipment, stationery, and more.
          </p>
          <p className="text-lg leading-relaxed">
            Our platform promotes a <strong>zero-cash circular economy on campus</strong>, helping students <strong>save money</strong> while fostering <strong>trust, collaboration, and community engagement</strong>. By connecting students with similar needs, we maximize resource usage, reduce waste, and build lasting connections among peers.
          </p>
          <p className="text-lg leading-relaxed">
            With a focus on <strong>convenience, safety, and transparency</strong>, Barter & Borrow ensures that every transaction is smooth and secure. Our simple user interface, real-time notifications, and clear item availability statuses make sharing effortless.
          </p>
        </div>
        <div className="lg:w-1/2">
          <img
            src="src/assets/image.png"
            alt="About Us"
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Why Barter & Borrow is Different Section */}
      <section className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        <div className="lg:w-1/2 order-2 lg:order-1">
          <img
            src="src/assets/image copy 2.png"
            alt="Why Different"
            className="w-full h-auto"
          />
        </div>
        <div className="lg:w-1/2 order-1 lg:order-2 space-y-4">
          <h2 className="text-3xl font-semibold text-[#48d6a8]">Why NGJugaad is Different</h2>
          <ul className="list-disc list-inside space-y-2 text-lg leading-relaxed">
            <li>It is a <strong>purely peer-to-peer sharing system</strong>, unlike traditional systems managing institute-owned resources, giving students more flexibility and control.</li>
            <li>It <strong>promotes trust</strong> and accountability, ensuring every transaction is safe and reliable through a clear rating system and verified user profiles.</li>
            <li>Our <strong>circular economy model</strong> encourages reuse and sharing, helping students contribute to sustainability and reduce unnecessary consumption.</li>
            <li>Students can easily <strong>track borrowing history</strong> and item availability, reducing confusion and improving planning for shared resources.</li>
            <li>The platform <strong>integrates notifications</strong> for requests, reminders, and updates, making item coordination hassle-free.</li>
          </ul>
        </div>
      </section>

      {/* Key Features & Benefits Section */}
      <section className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        <div className="lg:w-1/2 space-y-4">
          <h2 className="text-3xl font-semibold text-[#f97316]">Key Features & Benefits</h2>
          <ul className="list-disc list-inside space-y-2 text-lg leading-relaxed">
            <li><strong>Easy Item Sharing & Discovery:</strong> Students can list items with photos, detailed descriptions, and availability schedules for seamless borrowing.</li>
            <li><strong>Internal Chat System:</strong> Communicate directly after a request is accepted for secure coordination and quick clarifications.</li>
            <li><strong>Trust & Rating System:</strong> Participants rate each other after returning items, building credibility and fostering accountability.</li>
            <li><strong>Profile System:</strong> Each student has a profile showcasing shared items, borrowed items, and ratings earned, creating a transparent sharing environment.</li>
            <li><strong>Save Money & Build Connections:</strong> Borrow instead of buying while meeting peers, forming social connections, and contributing to a community-oriented campus culture.</li>
            <li><strong>Real-Time Notifications & Reminders:</strong> Receive alerts for requests, pending returns, and updates, ensuring no item is forgotten or delayed.</li>
            <li><strong>Accessible & Intuitive Interface:</strong> Designed for students with simplicity in mind, the platform ensures a smooth experience on both desktop and mobile devices.</li>
          </ul>
        </div>
        <div className="lg:w-1/2">
          <img
            src="src/assets/image copy 3.png"
            alt="Key Features"
            className="w-full h-auto"
          />
        </div>
      </section>

    </div>
  );
};

export default About;
