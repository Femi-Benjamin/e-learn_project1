import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import RegistrationModal from '../components/RegistrationModal';
import { courses } from '../data/courses';

export const Courses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar onOpenModal={openModal} />

      <div className="pt-32 pb-12 px-4 mx-auto max-w-screen-xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-primary mb-4">Our Courses</h1>
          <p className="text-lg text-gray-500">Explore our comprehensive catalog of courses designed to help you succeed.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              category={course.category}
              image={course.image}
              color={course.color}
            />
          ))}
        </div>
      </div>

      <Footer onOpenModal={openModal} />
      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
