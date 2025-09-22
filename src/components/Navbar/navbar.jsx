import './navbar.css'
import logo from '../../assets/learning_logo.svg'
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [darkNav, setDarkNav] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

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

    const scrollToSection = (sectionId) => {
        if (location.pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        closeMobileMenu();
    };

    return <>
        <nav className={`${darkNav ? 'dark-nav' : '' }`}>
            <div className="container">
                {/* logo */}
                <Link to="/" className="logo-link">
                    <img className='logo' src={logo} alt="LearnPath - AI-Powered Learning Platform" />
                </Link>
                
                {/* mobile menu toggle */}
                <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                    ☰
                </button>
                
                {/* navigation */}
                <ul className={mobileMenuOpen ? 'active' : ''}>
                    <li>
                        {location.pathname === '/' ? (
                            <a href="#home" onClick={() => scrollToSection('home')}>Home</a>
                        ) : (
                            <Link to="/" onClick={closeMobileMenu}>Home</Link>
                        )}
                    </li>
                    <li>
                        {location.pathname === '/' ? (
                            <a href="#how-it-works" onClick={() => scrollToSection('how-it-works')}>How It Works</a>
                        ) : (
                            <Link to="/" onClick={closeMobileMenu}>How It Works</Link>
                        )}
                    </li>
                    <li>
                        <Link to="/learning-goals" className='btn' onClick={closeMobileMenu}>
                            Start Learning Goals
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    </>
}

export default Navbar