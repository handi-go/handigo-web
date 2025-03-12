// Footer component
import '../css/footer.css'

import footerLogo from '../assets/handigo-brand/Asshandigo-white-color.png'

function Footer() {


    return (
        <>
        {/* Footer */}
        <footer>
            <div className="footer-content">
                <div className="footer-brand">
                    <a href="/">
                        <img src={footerLogo} alt="" />
                    </a>
                </div>

                <div className="footer-nav">
                    <ul role="list" className="flex flex-wrap gap-4">
                        <li><a href="#">Overview</a></li>
                        <li><a href="#">Features</a></li>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Help</a></li>
                        <li><a href="#">Privacy</a></li>
                    </ul>
                </div>

                <div className="hr">
                <hr />
                </div>

                <div className="copy-right-container flex justify-between items-center flex-wrap gap-2">
                    <div className="all-righ-reserved">
                        <p>&copy; 2024 Handigo. All rights reserved.</p>
                    </div>

                    <div className="privacy-policy-links">
                        <ul role="list" className="flex flex-wrap gap-2">
                        <li><a href="#">Terms</a></li>
                        <li><a href="#">Privacy</a></li>
                        <li><a href="#">Cookies</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer