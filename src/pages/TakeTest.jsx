import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationModal from '../components/RegistrationModal';

export const TakeTest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Mock Data - Set to empty array to demonstrate the "All Taken" message as requested
  // Or populate to show pending tests. Let's populate one for demo, but provide a way to clear it.
  const [pendingTests, setPendingTests] = useState([
    {
      id: 1,
      title: "React Fundamentals Quiz",
      course: "Web Development",
      duration: "30 mins",
      questions: 20,
      dueDate: "Dec 25, 2023"
    },
    {
      id: 2,
      title: "Cyber Security Basics",
      course: "Cyber Security",
      duration: "45 mins",
      questions: 30,
      dueDate: "Dec 28, 2023"
    }
  ]);

  const completedTests = [
    {
      id: 101,
      title: "HTML & CSS Mastery",
      course: "Web Development",
      score: "85%",
      date: "Nov 15, 2023"
    }
  ];

  const handleStartTest = (id) => {
    // Logic to start test would go here
    // For demo, let's just remove it from pending to simulate completion
    const test = pendingTests.find(t => t.id === id);
    setPendingTests(pendingTests.filter(t => t.id !== id));
    alert(`Starting ${test.title}... (Demo: Test marked as completed)`);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar onOpenModal={openModal} />

      <div className="pt-32 pb-12 px-4 mx-auto max-w-screen-xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-primary mb-4">Student Assessments</h1>
          <p className="text-lg text-gray-500">Track your progress and test your knowledge.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setActiveTab('pending')}
              className={`px-6 py-3 text-sm font-medium rounded-l-lg border ${activeTab === 'pending' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-100'}`}
            >
              Pending Tests
              {pendingTests.length > 0 && (
                <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                  {pendingTests.length}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-3 text-sm font-medium rounded-r-lg border ${activeTab === 'completed' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-100'}`}
            >
              Completed Tests
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'pending' ? (
            pendingTests.length > 0 ? (
              <div className="grid gap-6">
                {pendingTests.map(test => (
                  <div key={test.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary flex flex-col md:flex-row md:items-center justify-between hover:shadow-lg transition-shadow duration-300">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-xl font-bold text-gray-900">{test.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{test.course}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          {test.duration}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          {test.questions} Questions
                        </span>
                        <span className="flex items-center text-red-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          Due: {test.dueDate}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleStartTest(test.id)}
                      className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 text-center transition-colors duration-300"
                    >
                      Start Test
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-green-500 mb-4 flex justify-center">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">You Have Taken All Quiz Assigned to You!</h2>
                <p className="text-gray-500 mb-8">Great job keeping up with your coursework.</p>
                <Link to="/recorded-classes" className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 text-center transition-colors duration-300">
                  Please Head Over To Recorded Classes To Check Score
                </Link>
              </div>
            )
          ) : (
            <div className="grid gap-6">
              {completedTests.map(test => (
                <div key={test.id} className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between opacity-75">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{test.title}</h3>
                    <p className="text-sm text-gray-500">{test.course}</p>
                    <p className="text-xs text-gray-400 mt-1">Completed on: {test.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl font-bold text-green-600">{test.score}</span>
                    <span className="text-xs text-gray-500">Score</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer onOpenModal={openModal} />
      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
