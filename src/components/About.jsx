import React from "react";

const About = () => {
 return(
   <div>
    <title>DevprakashBisoi</title>
      <div
      name="about"
      className="w-full h-screen text-white"
      style={{ backgroundImage: "linear-gradient(to bottom, #361540, #774187)" }}
      >
       <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            About
          </p>
        </div>
        <p className="text-xl mt-20">
        Hi! I’m Dev, a 23-year-old graduate of PES University with a degree in computer science and engineering.
        All my life, I have had a fascination and interest in computing and technology. The developments in computer science are applied to all areas of science and 
        culture, often used by large groups of people with little knowledge of computer science itself, 
        this ability to change the way society functions is what motivated me to pursue a career that is 
        computer-based. I believe in applying my technical skills to solving pertinent and real-life problems.
        </p>
       
        <p className="text-xl mt-20">
        My hobbies include Gaming, Basketball, karate, Traveling, Writing Horror stories and Social service.
        </p>
      </div>

      </div>
   </div>
 );
};

export default About;
