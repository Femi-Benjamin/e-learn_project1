import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showAllUsers, setShowAllUsers] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (!isLoggedIn) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        navigate('/admin/login');
    };

    // Mock Data
    const stats = [
        { title: "Total Users", value: "1,234", change: "+12%", color: "bg-blue-500", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
        { title: "Active Courses", value: "25", change: "+5%", color: "bg-green-500", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
        { title: "Total Revenue", value: "$45,678", change: "+8%", color: "bg-purple-500", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { title: "Pending Payments", value: "15", change: "-2%", color: "bg-yellow-500", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    ];

    const allUsers = [
        { id: 1, name: "John Doe", email: "john@example.com", course: "Cyber Security", status: "Paid", date: "2023-12-15", phone: "+1 234 567 890", address: "123 Tech Street, Silicon Valley, CA" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", course: "Business Management", status: "Pending", date: "2023-12-14", phone: "+1 987 654 321", address: "456 Biz Ave, New York, NY" },
        { id: 3, name: "Robert Johnson", email: "robert@example.com", course: "Data Analytics", status: "Paid", date: "2023-12-13", phone: "+1 555 123 456", address: "789 Data Dr, Austin, TX" },
        { id: 4, name: "Emily Davis", email: "emily@example.com", course: "Web Development", status: "Paid", date: "2023-12-12", phone: "+1 444 777 888", address: "321 Web Way, San Francisco, CA" },
        { id: 5, name: "Michael Wilson", email: "michael@example.com", course: "Cyber Security", status: "Pending", date: "2023-12-11", phone: "+1 222 333 444", address: "654 Secure Ln, Washington, DC" },
        { id: 6, name: "Sarah Brown", email: "sarah@example.com", course: "Digital Marketing", status: "Paid", date: "2023-12-10", phone: "+1 111 222 333", address: "987 Market St, Chicago, IL" },
        { id: 7, name: "David Lee", email: "david@example.com", course: "Machine Learning", status: "Paid", date: "2023-12-09", phone: "+1 999 888 777", address: "159 AI Blvd, Boston, MA" },
        { id: 8, name: "Lisa Taylor", email: "lisa@example.com", course: "Graphic Design", status: "Pending", date: "2023-12-08", phone: "+1 777 666 555", address: "753 Design Ct, Seattle, WA" },
        { id: 9, name: "James Anderson", email: "james@example.com", course: "Cloud Computing", status: "Paid", date: "2023-12-07", phone: "+1 333 444 555", address: "951 Cloud Rd, Denver, CO" },
        { id: 10, name: "Patricia Thomas", email: "patricia@example.com", course: "Web Development", status: "Paid", date: "2023-12-06", phone: "+1 666 555 444", address: "357 Code Ln, Portland, OR" },
        { id: 11, name: "Christopher Martinez", email: "chris@example.com", course: "Data Analytics", status: "Pending", date: "2023-12-05", phone: "+1 222 888 555", address: "852 Data Way, Miami, FL" },
        { id: 12, name: "Jennifer White", email: "jennifer@example.com", course: "Business Management", status: "Paid", date: "2023-12-04", phone: "+1 444 999 111", address: "147 Biz Blvd, Atlanta, GA" },
    ];

    const displayedUsers = showAllUsers || activeTab === 'users' ? allUsers : allUsers.slice(0, 5);

    const coursesList = [
        { id: 1, title: "Cyber Security", students: 120, revenue: "$12,000", status: "Active" },
        { id: 2, title: "Web Development", students: 250, revenue: "$25,000", status: "Active" },
        { id: 3, title: "Data Analytics", students: 80, revenue: "$8,000", status: "Active" },
        { id: 4, title: "Digital Marketing", students: 150, revenue: "$15,000", status: "Active" },
        { id: 5, title: "Business Management", students: 90, revenue: "$9,000", status: "Active" },
    ];

    const renderDashboard = () => (
        <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-transform hover:scale-105 duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-500 text-sm font-medium uppercase">{stat.title}</h3>
                            <span className={`p-2 rounded-lg ${stat.color} bg-opacity-10 text-${stat.color.split('-')[1]}-600`}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon}></path></svg>
                            </span>
                        </div>
                        <div className="flex items-baseline">
                            <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                            <span className={`ml-2 text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{stat.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Registrations Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">Recent Registrations</h3>
                    <button onClick={() => setActiveTab('users')} className="text-primary hover:text-blue-800 text-sm font-medium">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-500">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Course</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedUsers.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 text-xs font-bold text-gray-600">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{user.name}</div>
                                            <div className="text-xs">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{user.course}</td>
                                    <td className="px-6 py-4">{user.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => setSelectedUser(user)} className="text-blue-600 hover:text-blue-900 font-medium text-sm">View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );

    const renderUsers = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">All Users</h3>
                <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">Add New User</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-gray-500">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Course</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">#{user.id}</td>
                                <td className="px-6 py-4 flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 text-xs font-bold text-gray-600">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">{user.name}</div>
                                        <div className="text-xs">{user.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{user.course}</td>
                                <td className="px-6 py-4">{user.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => setSelectedUser(user)} className="text-blue-600 hover:text-blue-900 font-medium text-sm mr-3">Details</button>
                                    <button className="text-red-600 hover:text-red-900 font-medium text-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderCourses = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Course Management</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">Add New Course</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {coursesList.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                            </div>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">{course.status}</span>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h4>
                        <div className="flex justify-between text-sm text-gray-500 mb-4">
                            <span>{course.students} Students</span>
                            <span>{course.revenue} Rev</span>
                        </div>
                        <div className="flex space-x-2">
                            <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 text-sm font-medium">Edit</button>
                            <button className="flex-1 bg-red-50 text-red-600 py-2 rounded hover:bg-red-100 text-sm font-medium">Archive</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAnalytics = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue Growth</h3>
                <div className="h-64 flex items-end justify-between space-x-2">
                    {[40, 60, 45, 70, 85, 65, 90].map((h, i) => (
                        <div key={i} className="w-full bg-blue-100 rounded-t-lg relative group">
                            <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg transition-all duration-500 group-hover:bg-blue-600"></div>
                            <div className="absolute -bottom-6 w-full text-center text-xs text-gray-500">Mon</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">User Demographics</h3>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-700">Students</span>
                            <span className="text-gray-900 font-medium">75%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-700">Professionals</span>
                            <span className="text-gray-900 font-medium">15%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-700">Others</span>
                            <span className="text-gray-900 font-medium">10%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Admin Profile Settings</h3>
            </div>
            <div className="p-6 space-y-6">
                <div className="flex items-center space-x-6">
                    <img className="w-20 h-20 rounded-full border-4 border-gray-100" src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff&size=128" alt="Admin" />
                    <button className="text-primary hover:text-blue-800 font-medium">Change Avatar</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input type="text" defaultValue="Admin" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input type="text" defaultValue="User" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input type="email" defaultValue="admin@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input type="password" placeholder="Leave blank to keep current" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                    </div>
                </div>
                <div className="pt-4 flex justify-end">
                    <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">Save Changes</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <div className="p-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold font-heading">Admin Panel</h1>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <nav className="mt-6">
                    {['dashboard', 'users', 'courses', 'analytics', 'settings'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); setIsSidebarOpen(false); }}
                            className={`w-full text-left block py-3 px-6 transition-colors border-l-4 ${activeTab === tab ? 'bg-blue-800 border-white' : 'border-transparent hover:bg-blue-800 hover:border-blue-400'}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </nav>
                <div className="absolute bottom-0 w-64 p-6">
                    <button onClick={handleLogout} className="flex items-center text-blue-200 hover:text-white w-full text-left transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 overflow-y-auto">
                <div className="p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center">
                            <button onClick={() => setIsSidebarOpen(true)} className="mr-4 md:hidden text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </button>
                            <h2 className="text-3xl font-bold text-gray-800">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                            </div>
                            <img className="w-10 h-10 rounded-full border-2 border-gray-200" src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="Admin" />
                        </div>
                    </div>

                    {/* Content Area */}
                    {activeTab === 'dashboard' && renderDashboard()}
                    {activeTab === 'users' && renderUsers()}
                    {activeTab === 'courses' && renderCourses()}
                    {activeTab === 'analytics' && renderAnalytics()}
                    {activeTab === 'settings' && renderSettings()}
                </div>
            </main>

            {/* User Details Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all scale-100">
                        <div className="bg-primary p-6 text-white flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold">{selectedUser.name}</h3>
                                <p className="text-blue-200 text-sm">{selectedUser.email}</p>
                            </div>
                            <button onClick={() => setSelectedUser(null)} className="text-white hover:text-gray-200">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center space-x-3 text-gray-700">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Course</p>
                                    <p className="font-medium">{selectedUser.course}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-700">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Phone</p>
                                    <p className="font-medium">{selectedUser.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-700">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Address</p>
                                    <p className="font-medium">{selectedUser.address}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-700">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Registration Date</p>
                                    <p className="font-medium">{selectedUser.date}</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedUser.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {selectedUser.status}
                                </span>
                                <div className="space-x-2">
                                    <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">Edit Profile</button>
                                    <button className="text-red-500 hover:text-red-700 text-sm font-medium">Suspend</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
