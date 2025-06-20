import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-scroll";
import me from "../assets/me.jpg";

const Home = () => {
  return (
    <div
      name="home"
      className="min-h-screen w-full overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(to bottom, #10061a, #9141d9)",
      }}
    >
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center min-h-screen px-4 pt-24 md:pt-0 md:flex-row">
        {/* Text Content */}
        <div className="flex flex-col justify-center h-full text-center md:text-left">
          <h2 className="text-4xl sm:text-6xl font-bold text-white mb-4">
            Hello <span className="wave text-4xl sm:text-6xl">👋</span>, My name
            is
          </h2>
          <h1 className="text-6xl sm:text-9xl font-bold text-green mb-6">
            Devprakash
          </h1>
          <div className="flex justify-center md:justify-start">
            <Link
              to="about"
              smooth
              duration={500}
              className="group text-white w-fit px-6 py-3 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer"
            >
              Portfolio
              <span className="group-hover:rotate-90 duration-300">
                <MdOutlineKeyboardArrowRight size={25} className="ml-1" />
              </span>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex items-center justify-center mt-12 md:mt-0 md:ml-10">
          <img
            src={me}
            alt="Me"
            className="rounded-xl shadow-lg"
            style={{
              width: "200px",
              height: "200px",
              boxShadow: "0px 0px 10px rgba(255, 255, 0, 0.5)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
