import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-scroll";
import me from "../assets/me.jpg";

const Home = () => {
  return (
    <div
      name="home"
      className="h-screen w-full"
      style={{ backgroundImage: "linear-gradient(to bottom, #10061a, #9141d9)" }}
    >
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
        <div className="flex flex-col justify-center h-full text-center md:text-left">
        <br /> <br /> <br /> <br /> 
          <h2 className="text-4xl sm:text-6xl font-bold text-white">
            Hello<span className="wave text-4xl sm:text-6xl">👋</span>, My name is
          </h2>
          <h1 className="text-6xl sm:text-9xl font-bold text-green">
            Devprakash
          </h1>
          <div className="flex justify-center md:justify-start">
            <Link
              to="about"
              smooth
              duration={500}
              className="group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer"
            >
              Portfolio
              <span className="group-hover:rotate-90 duration-300">
                <MdOutlineKeyboardArrowRight size={25} className="ml-1" />
              </span>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-right mt-8 md:mt-0">
          <img
            src={me}
            alt="Me"
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "100%",
              boxShadow: "0px 0px 10px rgba(255, 255, 0, 0.5)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
