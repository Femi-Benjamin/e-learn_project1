import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationModal from '../components/RegistrationModal';

export const LiveClasses = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const upcomingClasses = [
    {
      id: 1,
      title: "Advanced React Patterns",
      instructor: "Sarah Jenkins",
      date: "Dec 20, 2023",
      time: "10:00 AM EST",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 2,
      title: "Cyber Security Fundamentals",
      instructor: "Mike Ross",
      date: "Dec 22, 2023",
      time: "2:00 PM EST",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 3,
      title: "UX Design Workshop",
      instructor: "Emily Chen",
      date: "Dec 24, 2023",
      time: "11:00 AM EST",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  const pastClasses = [
    {
      id: 4,
      title: "Intro to Python",
      instructor: "David Miller",
      date: "Dec 10, 2023",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80"
    },
    {
      id: 5,
      title: "Digital Marketing Strategies",
      instructor: "Jessica Pearson",
      date: "Dec 05, 2023",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar onOpenModal={openModal} />

      <div className="pt-32 pb-12 px-4 mx-auto max-w-screen-xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-primary mb-4">Live Classes</h1>
          <p className="text-lg text-gray-500">Join our interactive live sessions or catch up on what you missed.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 text-sm font-medium rounded-l-lg border ${activeTab === 'upcoming' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-100'}`}
            >
              Upcoming Classes
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('past')}
              className={`px-6 py-3 text-sm font-medium rounded-r-lg border ${activeTab === 'past' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-100'}`}
            >
              Past Classes
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {activeTab === 'upcoming' ? (
            upcomingClasses.map(cls => (
              <div key={cls.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img className="w-full h-48 object-cover" src={cls.image} alt={cls.title} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Upcoming</span>
                    <span className="text-sm text-gray-500">{cls.date}</span>
                  </div>
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{cls.title}</h5>
                  <p className="mb-3 font-normal text-gray-700">Instructor: {cls.instructor}</p>
                  <p className="mb-4 font-normal text-gray-700">Time: {cls.time}</p>
                  <button className="w-full text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Join Class
                  </button>
                </div>
              </div>
            ))
          ) : (
            pastClasses.map(cls => (
              <div key={cls.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 opacity-75 hover:opacity-100">
                <img className="w-full h-48 object-cover grayscale" src={cls.image} alt={cls.title} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Completed</span>
                    <span className="text-sm text-gray-500">{cls.date}</span>
                  </div>
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{cls.title}</h5>
                  <p className="mb-4 font-normal text-gray-700">Instructor: {cls.instructor}</p>
                  <button className="w-full text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Watch Recording
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {activeTab === 'upcoming' && upcomingClasses.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No upcoming classes scheduled.</p>
        )}
        {activeTab === 'past' && pastClasses.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No past classes available.</p>
        )}
      </div>

      <Footer onOpenModal={openModal} />
      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
