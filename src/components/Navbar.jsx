import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onOpenModal }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm fixed w-full z-50 top-0 left-0 border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center">
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-primary font-heading">
                        E-Learn
                    </span>
                </Link>
                <div className="flex md:order-2">
                    <button
                        type="button"
                        onClick={onOpenModal}
                        className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 transition-colors duration-300"
                    >
                        Get started
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-sticky"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 md:absolute md:left-1/2 md:-translate-x-1/2 ${isOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white items-center">
                        <li>
                            <Link to="/" className="block py-2 pl-3 pr-4 text-white bg-primary rounded md:bg-transparent md:text-primary md:p-0" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to="/courses" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 transition-colors duration-300">Courses</Link>
                        </li>
                        <li>
                            <Link to="/live-classes" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 transition-colors duration-300">Live Classes</Link>
                        </li>
                        <li>
                            <Link to="/recorded-classes" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 transition-colors duration-300">Recorded</Link>
                        </li>
                        <li>
                            <Link to="/take-test" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 transition-colors duration-300">Take Test</Link>
                        </li>
                        <li>
                            <Link to="/admin" className="block py-2 pl-3 pr-4 text-white bg-gray-800 rounded md:bg-gray-800 md:text-white md:px-4 md:py-2 hover:bg-gray-700 transition-colors duration-300">Admin</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
