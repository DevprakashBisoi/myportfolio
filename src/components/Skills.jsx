import React from "react";

import html from "../assets/html.png";
import css from "../assets/css.png";
import javascript from "../assets/javascript.png";
import reactImage from "../assets/react.png";
import flutter from "../assets/flutter.png";
import python from "../assets/python.png";
import github from "../assets/github.png";
import r from "../assets/r.png";
import node from "../assets/node.png";
import pyspark from "../assets/pyspark.png";
import azure from "../assets/azure.png";
import aws from "../assets/aws.png";
import powerbi from "../assets/powerbi.png";

const Skills = () => {
  const techs = [
    {
      id: 1,
      src: html,
      title: "HTML",
      style: "shadow-orange-500",
    },
    {
      id: 2,
      src: css,
      title: "CSS",
      style: "shadow-blue-500",
    },
    {
      id: 3,
      src: javascript,
      title: "JavaScript",
      style: "shadow-yellow-500",
    },
    {
      id: 4,
      src: reactImage,
      title: "React",
      style: "shadow-blue-600",
    },
    {
      id: 5,
      src: r,
      title: "R",
      style: "shadow-sky-400",
    },
    {
      id: 6,
      src: flutter,
      title: "Flutter",
      style: "shadow-blue-500",
    },
    {
      id: 7,
      src: python,
      title: "Python",
      style: "shadow-blue-400",
    },
    {
      id: 8,
      src: github,
      title: "GitHub",
      style: "shadow-gray-400",
    },
    {
      id: 9,
      src: node,
      title: "NodeJS",
      style: "shadow-green-600",
    },
    {
      id: 10,
      src: powerbi,
      title: "PowerBI",
      style: "shadow-yellow-500",
    },
    {
      id: 11,
      src: azure,
      title: "Azure",
      style: "shadow-blue-500",
    },
    {
      id: 12,
      src: aws,
      title: "AWS",
      style: "shadow-yellow-500",
    },
    {
      id: 13,
      src: pyspark,
      title: "Pyspark",
      style: "shadow-yellow-500",
    }
  ];

  return (
    <div
      name="skills"
      className="w-full min-h-screen text-white text-white"
      style={{ backgroundImage: "linear-gradient(to bottom, #202020, #080808)" }}
    >
      <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full min-h-full text-white">
        <div>
          <br /><br />
          <p className="text-4xl font-bold border-b-4 border-gray-500 p-2 inline">
            Skills
          </p>
          <p className="py-6">These are the technologies I've worked with</p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 text-center py-8 px-12 sm:px-0">
          {techs.map(({ id, src, title, style }) => (
            <div
              key={id}
              className={`shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}
            >
              <img src={src} alt="" className="w-20 mx-auto" />
              <p className="mt-4">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
