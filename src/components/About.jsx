import React from "react";

const About = () => {
  return (
    <div
      name="about"
      className="w-full min-h-screen text-white"
      style={{
        backgroundImage: "linear-gradient(to bottom, #361540, #774187)",
      }}
    >
      <div className="max-w-screen-lg mx-auto flex flex-col justify-center h-full px-6 py-20">
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold border-b-4 border-gray-500 inline-block pb-2">
            About
          </h2>
        </div>

        {/* About Paragraph */}
        <p className="text-lg leading-relaxed mb-6">
          Hi! I’m Dev, a 24-year-old graduate of PES University with a degree in
          Computer Science and Engineering. I've always been fascinated by
          computing and technology. What inspires me most is how advancements in
          computer science influence every field — from science to culture —
          impacting people who may not even realize it. This transformative
          power of technology is what led me to pursue a computer-based career.
          I’m passionate about using my technical skills to address real-world
          challenges and drive meaningful change.
        </p>

        {/* Hobbies Paragraph */}
        <p className="text-lg leading-relaxed">
          Beyond coding, I enjoy gaming, playing basketball, practicing karate,
          exploring new places, writing horror stories, and engaging in social
          service.
        </p>
      </div>
    </div>
  );
};

export default About;
