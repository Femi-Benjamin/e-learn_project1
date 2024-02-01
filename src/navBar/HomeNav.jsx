import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HomeNav() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-[#EFF7FF] shadow-lg">
      <div className="flex items-center justify-between md:px-20 p-5">
        <div>
          <h1 className="not-italic font-bold text-4xl leading-10 text-[#082183] items-center">
            PIPER
          </h1>
        </div>

        <div className="hidden lg:flex gap-6 text-[#4CC0F8] text-lg font-semibold ">
          <Link to="/">
            <p className="hover:text-[#082183] cursor-pointer transition-all duration-300">
              Home
            </p>
          </Link>
          <Link to="/courses">
            <p className="hover:text-[#082183] cursor-pointer transition-all duration-300">
              Courses
            </p>
          </Link>
          <Link to="/live-classes">
            <p className="hover:text-[#082183] cursor-pointer transition-all duration-300">
              Live Classes
            </p>
          </Link>
          <Link to="/recorded-classes">
            <p className="hover:text-[#082183] cursor-pointer transition-all duration-300">
              Recorded Classes
            </p>
          </Link>
          <Link to="/take-test">
            <p className="hover:text-[#082183] cursor-pointer transition-all duration-300">
              Take Test
            </p>
          </Link>
        </div>
        <div className="lg:block hidden">
          <Link to="/signup">
            <button className="text-[#FFFFFF] bg-[#082183] rounded-2xl p-3 w-28">
              Sign Up
            </button>
          </Link>
        </div>

        <div className="lg:hidden">
          <button
            onClick={handleMobileMenuToggle}
            className="text-[#082183] cursor-pointer focus:outline-none text-2xl"
          >
            ☰
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-[85px] right-0 left-0 bg-[#6674aa] text-lg p-4 text-center font-semibold rounded-3xl mx-5 z-10">
            <Link to="/">
              <p className="text-[#ffffff] text-[#082183 cursor-pointer block mb-2">Home</p>
            </Link>
            <Link to="/courses">
              <p className="text-[#ffffff] text-[#082183 cursor-pointer block mb-2">
                Courses
              </p>
            </Link>
            <Link to="/live-classes">
              <p className="text-[#ffffff] text-[#082183 cursor-pointer block mb-2">
                Live Classes
              </p>
            </Link>
            <Link to="/recorded-classes">
              <p className="text-[#ffffff] text-[#082183 cursor-pointer block mb-2">
                Recorded Classes
              </p>
            </Link>
            <Link to="/take-test">
              <p className="text-[#ffffff] text-[#082183 cursor-pointer block mb-2">
                Take Test
              </p>
            </Link>
            <Link to="/signup">
              <button className="text-[#FFFFFF] bg-[#082183] rounded-2xl p-3 w-28">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
