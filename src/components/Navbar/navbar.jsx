import './navbar.css'
import logo from '../../assets/learning_logo.svg'
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [darkNav, setDarkNav] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {  
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                setDarkNav(true);
            } else {
                setDarkNav(false);
            }
        });
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return <>
        <nav className={`${darkNav ? 'dark-nav' : '' }`}>
            <div className="container">
                {/* logo */}
                <img className='logo' src={logo} alt="LearnPath - AI-Powered Learning Platform" />
                
                {/* mobile menu toggle */}
                <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                    ☰
                </button>
                
                {/* navigation */}
                <ul className={mobileMenuOpen ? 'active' : ''}>
                    <li><a href="#home" onClick={closeMobileMenu}>Home</a></li>
                    <li><a href="#how-it-works" onClick={closeMobileMenu}>How It Works</a></li>
                    <li><button className='btn' onClick={closeMobileMenu}>Start Learning Goals</button></li>
                </ul>
            </div>
        </nav>
    </>
}

export default Navbar