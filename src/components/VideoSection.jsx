import React from 'react';

const VideoSection = () => {
    return (
        <section className="bg-blue-50 py-16 lg:py-24">
            <div className="max-w-screen-xl px-4 mx-auto lg:px-6">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="lg:w-1/2">
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
                            Experience Personalized Learning
                        </h2>
                        <p className="mb-6 font-light text-gray-500 md:text-lg">
                            Watch how our expert mentors and tailored curriculum can help you achieve your goals.
                            We provide a supportive environment where you can thrive and master new skills at your own pace.
                        </p>
                        <ul className="space-y-4 text-left text-gray-500">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>One-on-one mentorship</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Flexible learning schedules</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Industry-recognized certificates</span>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:w-1/2 w-full">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-500">
                            <div className="aspect-w-16 aspect-h-9">
                                <video
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    loop
                                    muted
                                    controls
                                    src="https://player.vimeo.com/external/517730351.sd.mp4?s=9a026f7d34313485a304232cd8eaf91c9072f997&profile_id=164&oauth2_token_id=57447761"
                                ></video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
