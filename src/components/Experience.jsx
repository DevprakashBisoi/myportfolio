import React from "react";
import altimetrik from "../assets/altimetrik.png";
import cloudbyz from "../assets/cloudbyz.png";
import kritikal from "../assets/kritikal.jpg";
import netcon from "../assets/netcon.jpg";
import bernoullium from "../assets/bernoullium.jpg";
import ey from "../assets/ey.jpg";
import "./Experience.css";


//list all the companies I have worked for
const Experience = () => {
  return (
    <div name= "experience" className="bg-gradient-to-b from-black to-violet-600 w-full text-white md:h-screen">
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            Experience
          </p>
        </div>

        <div className="flex justify-left gap-4 flex-wrap card-container">

        <div className="card">
            <img
              src={ey}
              alt="ey"
              className="photo w-20 h-20 rounded-full mb-4"
            />
            <p className="text-lg font-semibold mb-2">EY India</p>
            <p className="text-sm text-gray-700">July 2023 - Present</p>
          </div>

          <div className="card">
            <img
              src={netcon}
              alt="netcon"
              className="photo w-20 h-20 rounded-full mb-4"
            />
            <p className="text-lg font-semibold mb-2">Netcon Technologies</p>
            <p className="text-sm text-gray-700">January 2023 - June 2023</p>
          </div>

          <div className="card">
            <img
              src={bernoullium}
              alt="bernoullium"
              className="photo w-20 h-20 rounded-full mb-4"
            />
            <p className="text-lg font-semibold mb-2">Bernoullium</p>
            <p className="text-sm text-gray-700">December 2022 - June 2023</p>
          </div>

          <div className="card">
            <img
              src={altimetrik}
              alt="altimetrik"
              className="photo w-20 h-20 rounded-full mb-4"
            />
            <p className="text-lg font-semibold mb-2">Altimetrik</p>
            <p className="text-sm text-gray-700">June 2022 - August 2022</p>
          </div>

          <div className="card">
            <img
              src={cloudbyz}
              alt="cloudbyz"
              className="photo w-20 h-20 rounded-full mb-4"
            />
            <p className="text-lg font-semibold mb-2">Cloudbyz</p>
            <p className="text-sm text-gray-700">June 2022 - August 2022</p>
          </div>

          <div className="card">
            <img
              src={kritikal}
              alt="kritikal"
              className="photo w-20 h-20 rounded-full mb-4"
            />
            <p className="text-lg font-semibold mb-2">Kritikal</p>
            <p className="text-sm text-gray-700">June 2022 - August 2022</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;

