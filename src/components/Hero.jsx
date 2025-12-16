import React from 'react';
import Typewriter from "typewriter-effect";
import img from "../img/Group.png";

const Hero = ({ onOpenModal }) => {
    return (
        <section className="bg-white pt-24 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-primary">
                        Master Your Skills with <br />
                        <span className="text-secondary">
                            <Typewriter
                                options={{
                                    strings: ['Online Tutoring', 'Expert Mentors', 'Live Classes'],
                                    autoStart: true,
                                    loop: true,
                                    delay: 75,
                                }}
                            />
                        </span>
                    </h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
                        Unlock your potential with private, 1-on-1 lessons from industry experts.
                        Join a community of learners and achieve your goals today.
                    </p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-start sm:space-y-0 sm:space-x-4">
                        <button onClick={onOpenModal} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Get started
                            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                        <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 transition-all duration-300">
                            Learn more
                        </a>
                    </div>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex relative">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                    <img src={img} alt="mockup" className="relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
