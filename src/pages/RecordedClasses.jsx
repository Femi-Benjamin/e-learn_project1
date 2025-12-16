import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationModal from '../components/RegistrationModal';

export const RecordedClasses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const recordings = [
    {
      id: 1,
      title: "Introduction to React Hooks",
      instructor: "Sarah Jenkins",
      date: "Dec 15, 2023",
      duration: "1h 30m",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 2,
      title: "Advanced CSS Layouts",
      instructor: "Mike Ross",
      date: "Dec 12, 2023",
      duration: "1h 15m",
      thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 3,
      title: "Python for Data Science",
      instructor: "Emily Chen",
      date: "Dec 10, 2023",
      duration: "2h 00m",
      thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80"
    },
    {
      id: 4,
      title: "Digital Marketing Trends 2024",
      instructor: "Jessica Pearson",
      date: "Dec 08, 2023",
      duration: "45m",
      thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80"
    },
    {
      id: 5,
      title: "Cyber Security Basics",
      instructor: "David Miller",
      date: "Dec 05, 2023",
      duration: "1h 45m",
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 6,
      title: "UX Research Methods",
      instructor: "Sarah Jenkins",
      date: "Dec 01, 2023",
      duration: "1h 10m",
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar onOpenModal={openModal} />

      <div className="pt-32 pb-12 px-4 mx-auto max-w-screen-xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-primary mb-4">Recorded Classes</h1>
          <p className="text-lg text-gray-500">Access our library of past sessions and learn at your own pace.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recordings.map((rec) => (
            <div key={rec.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative">
                <img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" src={rec.thumbnail} alt={rec.title} />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {rec.duration}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-primary bg-blue-100 px-2.5 py-0.5 rounded">Recorded</span>
                  <span className="text-sm text-gray-500">{rec.date}</span>
                </div>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 line-clamp-2">{rec.title}</h5>
                <p className="mb-4 font-normal text-gray-700 text-sm">Instructor: {rec.instructor}</p>
                <button className="w-full text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer onOpenModal={openModal} />
      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
