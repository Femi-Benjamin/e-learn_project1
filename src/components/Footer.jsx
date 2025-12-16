import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ onOpenModal }) => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 md:w-1/3">
            <Link to="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary font-heading">E-Learn</span>
            </Link>
            <p className="mt-2 text-gray-500 max-w-xs">
              Empowering learners worldwide with accessible, high-quality education. Join our community today.
            </p>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-2">Subscribe to our newsletter</h3>
              <form className="flex">
                <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-primary focus:border-primary block w-full p-2.5" placeholder="Enter your email" required />
                <button type="submit" className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-4 py-2.5 text-center">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 md:w-2/3 md:pl-12">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Resources</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link to="/courses" className="hover:underline hover:text-primary transition-colors">Courses</Link>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline hover:text-primary transition-colors">Mentors</a>
                </li>
                <li>
                  <button onClick={onOpenModal} className="hover:underline hover:text-primary transition-colors text-left">Register Now</button>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline hover:text-primary transition-colors">Github</a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline hover:text-primary transition-colors">Discord</a>
                </li>
                <li>
                  <a href="#" className="hover:underline hover:text-primary transition-colors">Twitter</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline hover:text-primary transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:underline hover:text-primary transition-colors">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">© {new Date().getFullYear()} <Link to="/" className="hover:underline">E-Learn™</Link>. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813c-1.1 0-1.99-.969-1.99-2.156 0-1.187.891-2.156 1.99-2.156 1.133 0 2.024.969 2.024 2.156 0 1.187-.891 2.156-2.024 2.156Zm6.554 0c-1.1 0-1.99-.969-1.99-2.156 0-1.187.891-2.156 1.99-2.156 1.133 0 2.024.969 2.024 2.156 0 1.187-.891 2.156-2.024 2.156Z" />
              </svg>
              <span className="sr-only">Discord community</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
