import React from 'react';

const CourseCard = ({ title, category, image, color }) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
            <div className={`h-48 w-full ${color} relative overflow-hidden flex items-center justify-center`}>
                {/* Placeholder for actual image or icon */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <img className="w-32 h-32 object-contain transform group-hover:scale-110 transition-transform duration-500" src={image} alt={title} />
            </div>
            <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded uppercase tracking-wider">{category}</span>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-3">5.0</span>
                    </div>
                </div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 group-hover:text-primary transition-colors duration-300">{title}</h5>
                <p className="mb-3 font-normal text-gray-700 line-clamp-2">
                    Master {title} with our comprehensive curriculum designed by industry experts.
                </p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors duration-300">
                    Enroll Now
                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default CourseCard;
