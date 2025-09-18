import React from 'react';
import './hero.css';

const Hero = () => {
    return (
        <div className='hero'>
            <div className="hero-content">
                <h1>Discover Your Learning Path</h1>
                <p>Get personalized learning recommendations powered by AI. Define your goals, assess your skills, and create a customized learning plan that fits your schedule and learning style.</p>
                <button className="btn">
                    Start Your Learning Journey
                </button>
            </div>
        </div>
    );
};

export default Hero;