// Home
import '../css/style.css'
import NavBar from '../components/navbar'
import trackIcon from "../assets/icons/track.svg";
import bookingIcon from "../assets/icons/booking.svg";
import paymentIcon from "../assets/icons/payment.svg";
import profileIcon from "../assets/icons/view-profile.svg";



function Home() {
    return (
        <>
            <main>
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
                                        <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"/></svg>
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

                <section className="service">
                <div className="container-custom">
                    <div className="content flex flex-col gap-14 m-auto">
                        <div className="text-content">
                            <div className="text-heading flex flex-col gap-4 text-center m-auto">
                                <h1 className="text-5xl font-semibold">Why Choose Us?</h1>
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
                                    <h4 className='text-2xl'>Secure payment</h4>
                                    <p className='text-base'>Pay effortlessly through our app with secure payment options. Say goodbye to cash hassles with transparent, upfront pricing.</p>
                                </div>
                            </div>

                            <div className="card-wrapper flex flex-col gap-2">
                                <div className="image">
                                    <img src={bookingIcon} alt="Booking image" />
                                </div>

                                <div className="sub-text flex flex-col gap-2">
                                    <h4 className='text-2xl'>Booking</h4>
                                    <p className='text-base'>Select a service and schedule a time that works for you. Our app ensures a smooth booking process with instant confirmation.</p>
                                </div>
                            </div>

                            <div className="card-wrapper flex flex-col gap-2">
                                <div className="image">
                                    <img src={trackIcon} alt="Track image" />
                                </div>

                                <div className="sub-text flex flex-col gap-2">
                                    <h4 className='text-2xl'>Track</h4>
                                    <p className='text-base'>Stay informed with live tracking features. Know exactly when your artisan is en route and communicate directly with them through the in-app chat.</p>
                                </div>
                            </div>

                            <div className="card-wrapper flex flex-col gap-2">
                                <div className="image">
                                    <img src={profileIcon} alt="View Profiles image" />
                                </div>

                                <div className="sub-text flex flex-col gap-2">
                                    <h4 className='text-2xl'>View Profiles</h4>
                                    <p className='text-base'>Browse detailed profiles of artisans, complete with photos, experience, customer reviews, and ratings. Compare options and choose the professional that best suits your needs.</p>
                                </div>
                            </div>
                        </div>

                        <div className="btn-wrapper m-auto">
                            <button className="text-white text-lg px-8 py-6 cursor-pointer" type="button">Get Your Custom Quote</button>
                        </div>
                    </div>
                </div>
                </section>
            </main>
        </>
    )
}

export default Home