import React, { useEffect, useState } from 'react';
import '../Style/HeroSection.css'; // Update this path as needed

const HeroSection = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const slides = document.getElementsByClassName('hero-bannerSlides');
    const dots = document.getElementsByClassName('dot');

    const showSlides = () => {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
        dots[i].className = dots[i].className.replace(' active', '');
      }
      slides[slideIndex].style.display = 'block';
      dots[slideIndex].className += ' active';
    };

    showSlides();

    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000); // Delay increased to 4 seconds

    return () => clearInterval(interval);
  }, [slideIndex]);

  const previousSlide = () => {
    const slides = document.getElementsByClassName('hero-bannerSlides');
    setSlideIndex((slideIndex) =>
      slideIndex > 0 ? slideIndex - 1 : slides.length - 1
    );
  };

  const nextSlide = () => {
    const slides = document.getElementsByClassName('hero-bannerSlides');
    setSlideIndex((slideIndex) =>
      slideIndex + 1 < slides.length ? slideIndex + 1 : 0
    );
  };

  return (
    <div id="hero">
      <div className="slideshow-container">
        <div className="hero-bannerSlides fade" style={{ display: 'block' }}>
          <img className="banner" src="./1.png" alt="Nature" />
          <div className="text">Caption Text</div>
        </div>

        <div className="hero-bannerSlides fade">
          <img className="banner" src="./1.png"  alt="Snow" />
          <div className="text">Caption Two</div>
        </div>

        <div className="hero-bannerSlides fade">
          <img className="banner" src="./1.png" alt="Mountains" />
          <div className="text">Caption Three</div>
        </div>
      </div>

      <div className="hero-icons-left" onClick={previousSlide}>
        <i className="fa-solid fa-chevron-left fa-fade fa-xl"></i>
      </div>
      <div className="hero-icons-right" onClick={nextSlide}>
        <i className="fa-solid fa-chevron-right fa-fade fa-xl"></i>
      </div>

      <br />
      <div style={{ textAlign: 'center' }}>
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default HeroSection;
