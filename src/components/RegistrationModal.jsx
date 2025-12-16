import React, { useState } from 'react';

const RegistrationModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: 'Cyber Security',
        duration: '3 Months'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        // Here you would typically send the data to a backend
        alert('Registration Successful! We will contact you shortly.');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-md mx-auto my-6">
                {/*content*/}
                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none animate-fadeIn">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                        <h3 className="text-2xl font-semibold text-primary">
                            Register for a Course
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={onClose}
                        >
                            <span className="bg-transparent text-gray-500 h-6 w-6 text-2xl block outline-none focus:outline-none hover:text-red-500 transition-colors">
                                ×
                            </span>
                        </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" placeholder="John Doe" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email Address</label>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" placeholder="+1 234 567 890" required />
                            </div>
                            <div>
                                <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-900">Select Course</label>
                                <select name="course" id="course" value={formData.course} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5">
                                    <option>Cyber Security</option>
                                    <option>Business Management</option>
                                    <option>Data Analytics</option>
                                    <option>Web Development</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900">Duration</label>
                                <select name="duration" id="duration" value={formData.duration} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5">
                                    <option>1 Month</option>
                                    <option>3 Months</option>
                                    <option>6 Months</option>
                                    <option>1 Year</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-red-50 rounded"
                                    type="button"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                                <button
                                    className="bg-primary text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    Register Now
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationModal;
