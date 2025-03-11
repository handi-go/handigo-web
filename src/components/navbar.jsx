// Navbar component
import '../css/style.css'
import '../css/navbar.css'

import {Link} from "react-router-dom";
import logo from '../assets/handigo-brand/handigo-pri-color.png'


function NavBar() {
    return (
        <nav>
            <div className="navbar flex flex-1 justify-between items-center">
                <div className="navbar-brand">
                    <img className='w-32' src={logo} alt="Handigo-Logo" />
                </div>

                <div className="navbar-links">
                    <ul className="flex gap-6">
                        <li className='active'><a href="#">Home</a></li>
                        <li><a href="#">Find Handymen</a></li>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Contact us</a></li>
                    </ul>
                </div>

                <div className="download-btn-cont">
                    <button>Download App</button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar