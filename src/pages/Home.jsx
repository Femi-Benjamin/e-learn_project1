import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';
import VideoSection from '../components/VideoSection';
import RegistrationModal from '../components/RegistrationModal';

import { courses } from '../data/courses';

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const visibleCourses = showAllCourses ? courses : courses.slice(0, 3);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar onOpenModal={openModal} />
      <Hero onOpenModal={openModal} />

      {/* Featured Courses Section */}
      <section className="py-16 px-4 mx-auto max-w-screen-xl lg:py-24 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Explore Our Courses</h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl">
            Choose from a wide range of courses designed to help you advance your career and learn new skills.
          </p>
        </div>
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2 lg:grid-cols-3">
          {visibleCourses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              category={course.category}
              image={course.image}
              color={course.color}
            />
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={() => setShowAllCourses(!showAllCourses)}
            className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none transition-colors duration-300"
          >
            {showAllCourses ? "See Less" : "See More"}
          </button>
        </div>
      </section>

      <VideoSection />

      {/* Stats / Trust Section */}
      <section className="bg-white py-12">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
          <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3">
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">10k+</dt>
              <dd className="font-light text-gray-500">Students</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">50+</dt>
              <dd className="font-light text-gray-500">Mentors</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">100+</dt>
              <dd className="font-light text-gray-500">Courses</dd>
            </div>
          </dl>
        </div>
      </section>

      <Footer onOpenModal={openModal} />
      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
