// Home
import '../css/style.css'
import NavBar from '../components/navbar'
import Footer from '../components/footer';
import NewsLetter from '../components/subscribeNewsLetter';
import trackIcon from "../assets/icons/track.svg";
import bookingIcon from "../assets/icons/booking.svg";
import paymentIcon from "../assets/icons/payment.svg";
import profileIcon from "../assets/icons/view-profile.svg";
import chatIcon from "../assets/icons/icon-chat.svg";
import quoteIcon from "../assets/icons/span.icon.svg";
import profileImage from "../assets/profile.png";
import slideImage from "../assets/testimony.png";

import { useEffect, useState } from "react";

const faqData = [
    { question: "Are there any hidden fees?", answer: "No, we believe in transparent pricing. You’ll see a full breakdown of costs before you confirm your booking." },
    { question: "What happens if the artisan doesn’t show up?", answer: "If an artisan fails to show up, you can report the issue, and we will provide a replacement as soon as possible." },
    { question: "How do I pay for services?", answer: "Payments can be made securely through our platform using credit/debit cards, mobile wallets, or direct bank transfers." },
    { question: "Can I cancel or reschedule a booking?", answer: "Yes, you can cancel or reschedule a booking through your account dashboard." },
    { question: "Is my information secure on the platform?", answer: "Yes, we use industry-standard encryption to protect your data." },
];

function Home() {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleQuestion = (index) => {
        setActiveIndex(prevIndex => (prevIndex === index ? null : index));
    };



    return (
        <>
            <main>
                <NavBar />
                <section className='hero'>
                    <div className='hero-content'>
                       <div className='flex justify-center flex-col gap-6'>
                            <div className='text-heading flex justify-center flex-col gap-8'>
                                <h1 className='text-5xl font-bold text-white'>Hire The Best Handymen!</h1>
                                <p className='text-xl text-white'>Whether it's the painting of a new house or fixing a leaking tap, life’s too short for DIY — Let us do the heavy lifting. Choose from a wide variety of skilled and vetted handymen and we’ll bring them right to your doorstep.
                                </p>
                            </div>

                            <div className="search-wrapper flex align-center px-6 py-4 rounded-full">
                                <div className="search-input-container flex gap-4 items-center">
                                    <div className="search-icon">
                                        <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"/></svg>
                                    </div>

                                    <div className="input-group">
                                        <input type="search" placeholder="Search for your preferred service" id="search" />
                                    </div>
                                </div>
                                <div className="btn-wrapper flex items-center justify-center rounded-3xl">
                                    <button className="font-roboto text-base p-4 font-medium text-white rounded-full" type="button">Find A Handyman
                                    </button>
                                </div>
                            </div>
                       </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="wcu">
                <div className="container-custom">
                    <div className="content flex flex-col gap-14 m-auto">
                        <div className="text-content">
                            <div className="text-heading flex flex-col gap-4 text-center m-auto">
                                <h2 className="text-5xl font-semibold">Why Choose Us?</h2>
                                <p className="font-light text-xl">We’ll handle the boring stuff while you focus on the things that matter</p>
                            </div>
                        </div>

                        <div className="card-content flex flex-wrap gap-16">
                            <div className="card-wrapper flex flex-col gap-2">
                                <div className="image">
                                    <div className="shield">
                                        <div className="checkmark"></div>
                                    </div>
                                    <img src={paymentIcon} alt="Secure payment image" />
                                </div>

                                <div className="sub-text flex flex-col gap-2">
                                    <h4 className='text-2xl font-semibold'>Secure payment</h4>
                                    <p className='text-base font-light'>Pay effortlessly through our app with secure payment options. Say goodbye to cash hassles with transparent, upfront pricing.</p>
                                </div>
                            </div>

                            <div className="card-wrapper flex flex-col gap-2">
                                <div className="image">
                                    <img src={bookingIcon} alt="Booking image" />
                                </div>

                                <div className="sub-text flex flex-col gap-2">
                                    <h4 className='text-2xl font-semibold'>Booking</h4>
                                    <p className='text-base font-light'>Select a service and schedule a time that works for you. Our app ensures a smooth booking process with instant confirmation.</p>
                                </div>
                            </div>

                            <div className="card-wrapper flex flex-col gap-2">
                                <div className="image">
                                    <img src={trackIcon} alt="Track image" />
                                </div>

                                <div className="sub-text flex flex-col gap-2">
                                    <h4 className='text-2xl font-semibold'>Track</h4>
                                    <p className='text-base font-light'>Stay informed with live tracking features. Know exactly when your artisan is en route and communicate directly with them through the in-app chat.</p>
                                </div>
                            </div>

                            <div className="card-wrapper flex flex-col gap-2">
                                <div className="image">
                                    <img src={profileIcon} alt="View Profiles image" />
                                </div>

                                <div className="sub-text flex flex-col gap-2">
                                    <h4 className='text-2xl font-semibold'>View Profiles</h4>
                                    <p className='text-base font-light'>Browse detailed profiles of artisans, complete with photos, experience, customer reviews, and ratings. Compare options and choose the professional that best suits your needs.</p>
                                </div>
                            </div>
                        </div>

                        <div className="btn-wrapper m-auto">
                            <button className="text-white text-lg px-6 py-4 cursor-pointer" type="button">Get Your Custom Quote</button>
                        </div>
                    </div>
                </div>
                </section>

                {/* Handigo-Pros */}
                <section className='handigo-pros'>
                    <div className="pros-content flex flex-col gap-20">
                        <div className="heading flex flex-col gap-4">
                            <div className='pros-h2-hr flex items-center gap-4'>
                                <h2 className='font-semibold'>HandiGo pros</h2>
                                <hr />
                            </div>

                            <p className='text-2xl font-light'>Meet the Pros Who Make Life Easier with HandiGo</p>
                        </div>

                        <div className="review-block flex gap-10">
                            <div className="image">
                                <img src={profileImage} alt="Profile" />
                            </div>

                            <div className="text-content flex flex-col gap-4">
                                <div className="location-slideCount flex justify-between items-center">
                                    <div className='flex items-center'>

                                        <span className='location-text text-xl font-light'>
                                            Lagos
                                        </span>
                                    </div>

                                    <div className='slides-counts'>
                                        <span>1</span> <span>/</span> <span>5</span>
                                    </div>
                                </div>

                                <div className="quote">
                                    <p className='font-light'>
                                        "John has fixed 300+ sinks, from simple repairs to complex installations.
                                        His extensive experience makes him a go-to expert for both residential and commercial plumbing.
                                        Known for his quick turnaround and reliable service, John ensures that every sink is fixed to perfection,
                                        saving you time and money."
                                    </p>
                                </div>

                                <div>
                                    <hr />
                                </div>

                                <div className="ratings-slide-navigation flex justify-between items-center">
                                    <div className='flex items-center gap-4'>
                                        <div className="name">
                                            <span className='text-base font-normal'>Ajayi Jesutofunmi</span>
                                        </div>

                                        <div className="ragings">
                                            <span className='text-base font-normal'>********* 5.0</span>
                                        </div>
                                    </div>

                                    <div className='flex gap-4'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path fill="#3D63AA80" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H109.3l105.3-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" strokeWidth="13" stroke="#fff" />
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path fill="#3D63AA80" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h306.7L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" strokeWidth="13" stroke="#fff" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Nigerian love Handigo */}
                <section className='WNLH'>
                    <div className='WNLH-content flex flex-col gap-4'>
                        <div className="heading flex flex-col items-center justify-center gap-4">
                            <h2 className='font-semibold text-center'>See Why Nigerians Love HandiGo</h2>
                            <p className='text-base'>Here's what our customers say</p>
                        </div>

                        <div className='carousel-wrapper'>
                            <div className='navigotions-arrow flex justify-between items-center'>
                                <div className='prev'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
                                        <path fill="#fff" fillRule="evenodd" d="M17.5 17.5L9.25 12l8.25-5.5l-1-1.5L6 12l10.5 7z" strokeWidth="0" stroke="#fff" />
                                    </svg>
                                </div>
                                <div className='next'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
                                        <path fill="#fff" fillRule="evenodd" d="m6.5 17.5l8.25-5.5L6.5 6.5l1-1.5L18 12L7.5 19z" strokeWidth="0" stroke="#fff" />
                                    </svg>
                                </div>
                            </div>

                            <div className='slide flex'>
                                <div className="text-content flex flex-col justify-between">
                                    <div className="quote">
                                        <img src={quoteIcon} alt="quote image" />
                                    </div>

                                    <div className="text">
                                        <p>Finding a skilled plumber was always a headache until I started using LOGO. The booking process is so smooth, and I could track everything in real-time</p>
                                    </div>

                                    <div className="name-icon flex justify-between align-center">
                                        <div className="name">
                                            <span className='text-2xl font-semibold'>Sophia L.</span>
                                            <p className='text-base'>Business Owner</p>
                                        </div>

                                        <div className="icon">
                                            <img src={chatIcon} alt="Chat-message Image" />
                                        </div>
                                    </div>
                                </div>

                                <div className="image-content">
                                    <div className="image">
                                        <img src={slideImage} alt="Slide Image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className='faq'>
                    <div className="faq-content">
                        <div className="text-heading text-center">
                            <h2 className="font-semibold">Frequently Asked Questions</h2>
                            <h2 className="font-semibold">(FAQ)</h2>
                            <p className="text-base">Our browser faq below, if you can't find the answer, Contact Us</p>
                        </div>



                        <div className="card-container flex flex-col gap-1">

                            {faqData.length > 0 ? (
                                faqData.map((faq, index) => (
                                    <div key={index} className="card-wrapper">
                                        <div
                                            className={`question-icon flex justify-between items-center ${activeIndex === index ? "active" : ""}`}
                                            onClick={() => toggleQuestion(index)}
                                            >
                                            <span className="Question">{faq.question}</span>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <g fill="none" fillRule="evenodd">
                                                        <path d="M24 0v24H0V0z" />
                                                        <path fill="#000" d="M11.293 8.293a1 1 0 0 1 1.414 0l5.657 5.657a1 1 0 0 1-1.414 1.414L12 10.414l-4.95 4.95a1 1 0 0 1-1.414-1.414z" />
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                        <div className={`answer ${activeIndex === index ? "block" : "hidden"}`}>
                                            <p className="text-base">{faq.answer}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Loading FAQs...</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* NewsLetter */}
                <NewsLetter />
            </main>

            <Footer />
        </>
    )
}

export default Home