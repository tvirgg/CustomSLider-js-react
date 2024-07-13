import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import Slide from './Slide';
import './Slider.css';

const Slider = ({ slides }) => {
  const visibleSlidesCount = 7; // Number of visible slides on desktop
  const slidesLength = slides.length;
  const totalSlides = slidesLength + 2 * visibleSlidesCount; // Total number of slides including clones
  const centralSlideIndex = Math.floor(visibleSlidesCount / 2); // Index of the central slide

  const [currentIndex, setCurrentIndex] = useState(visibleSlidesCount);
  const [slideWidth, setSlideWidth] = useState(0);
  const [currentZone, setCurrentZone] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false); // New state to block animation
  const [isLoading, setIsLoading] = useState(true); // New state for loading screen
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // State to determine mobile view
  const sliderRef = useRef(null);
  const animationTimeout = useRef(null);
  const startX = useRef(0);
  const endX = useRef(0);

  const fixedSlideWidth = 70; // Fixed slide width in percentage
  const slideMargin = 10; // Margin between slides in pixels

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = (times = 1, delay = 0) => {
    if (isAnimating) return;
    setIsAnimating(true);
    clearTimeout(animationTimeout.current);

    for (let i = 0; i < times; i++) {
      setTimeout(() => {
        setCurrentIndex(prevIndex => {
          const newIndex = prevIndex + 1;
          if (newIndex >= totalSlides - visibleSlidesCount) {
            animationTimeout.current = setTimeout(() => {
              setIsAnimating(false);
              setCurrentIndex(visibleSlidesCount);
            }, 1500);
          } else {
            animationTimeout.current = setTimeout(() => {
              setIsAnimating(false);
            }, 1500);
          }
          return newIndex;
        });
      }, i * delay);
    }
  };

  const prevSlide = (times = 1, delay = 0) => {
    if (isAnimating) return;
    setIsAnimating(true);
    clearTimeout(animationTimeout.current);

    for (let i = 0; i < times; i++) {
      setTimeout(() => {
        setCurrentIndex(prevIndex => {
          const newIndex = prevIndex - 1;
          if (newIndex < visibleSlidesCount) {
            animationTimeout.current = setTimeout(() => {
              setIsAnimating(false);
              setCurrentIndex(totalSlides - 2 * visibleSlidesCount);
            }, 1500);
          } else {
            animationTimeout.current = setTimeout(() => {
              setIsAnimating(false);
            }, 1500);
          }
          return newIndex;
        });
      }, i * delay);
    }
  };

  const handleSwipeStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleSwipeEnd = (e) => {
    endX.current = e.changedTouches[0].clientX;
    const swipeDistance = startX.current - endX.current;

    const swipeThreshold = 50;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        nextSlide(1);
      } else {
        prevSlide(1);
      }
    }
  };

  const getSlideStyle = (index) => {
    const relativeIndex = (index + totalSlides - currentIndex) % totalSlides;
    let blurValue = 0;
    if (relativeIndex === 0 || relativeIndex === visibleSlidesCount - 1) {
      blurValue = 3;
    } else if (relativeIndex === 1 || relativeIndex === visibleSlidesCount - 2) {
      blurValue = 2;
    } else if (relativeIndex === 2 || relativeIndex === visibleSlidesCount - 3) {
      blurValue = 1;
    }

    const styles = { 
      filter: `blur(${blurValue}px) grayscale(${relativeIndex === centralSlideIndex ? 0 : 1})`
    };

    if (relativeIndex >= visibleSlidesCount) {
      styles.height = '200px';
    } else {
      switch (relativeIndex) {
        case 0:
        case visibleSlidesCount - 1:
          styles.height = '200px';
          break;
        case 1:
        case visibleSlidesCount - 2:
          styles.height = '230px';
          break;
        case 2:
        case visibleSlidesCount - 3:
          styles.height = '270px';
          break;
        case centralSlideIndex:
          styles.height = '300px';
          break;
        default:
          styles.height = '200px';
      }
    }

    return styles;
  };

  const getSlideClass = (index) => {
    const relativeIndex = (index + totalSlides - currentIndex) % totalSlides;
    if (relativeIndex === centralSlideIndex) {
      return 'slide center';
    } else if (relativeIndex < visibleSlidesCount) {
      return 'slide';
    } else {
      return 'slide hidden';
    }
  };

  const getCurrentMobileSlide = () => {
    const containerWidth = sliderRef.current.offsetWidth;
    const scrollLeft = sliderRef.current.scrollLeft;
    const slideFullWidth = (containerWidth * (fixedSlideWidth / 100)) + (slideMargin * 2);

    const centralSlide = Math.round(scrollLeft / slideFullWidth);
    return centralSlide;
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      const containerWidth = document.querySelector('.slider-container').offsetWidth;
      const slideMargin = 10;
      const centralSlideWidth = containerWidth * 0.4;
      const totalMarginWidth = (visibleSlidesCount - 1) * (slideMargin * 2);
      const remainingWidth = containerWidth - centralSlideWidth - totalMarginWidth;
      const sideSlideWidth = remainingWidth / (visibleSlidesCount - 0.80);

      document.documentElement.style.setProperty('--slide-margin', `${slideMargin}px`);
      document.documentElement.style.setProperty('--central-slide-width', `${centralSlideWidth}px`);
      document.documentElement.style.setProperty('--side-slide-width', `${sideSlideWidth}px`);
      setSlideWidth(sideSlideWidth + 2 * slideMargin);
      setIsLoading(false);
    };

    if (!isMobile) {
      handleResize();
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setIsLoading(false);
    }
  }, [isMobile]);

  const handleMouseMove = (e) => {
    if (isAnimating || isMobile) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const mouseX = e.clientX - sliderRect.left;

    const centralSlideWidth = sliderRect.width * 0.4;
    const sideSlideWidth = (sliderRect.width - centralSlideWidth) / (visibleSlidesCount - 0.85);

    const zones = [
      sideSlideWidth * 1,
      sideSlideWidth * 2,
      sideSlideWidth * 3,
      centralSlideWidth,
      sliderRect.width - sideSlideWidth * 3,
      sliderRect.width - sideSlideWidth * 2,
      sliderRect.width - sideSlideWidth * 1
    ];

    if (mouseX < zones[0]) {
      if (currentZone !== 1) {
        setCurrentZone(1);
        prevSlide(3);
      }
    } else if (mouseX < zones[1]) {
      if (currentZone !== 2) {
        setCurrentZone(2);
        prevSlide(2);
      }
    } else if (mouseX < zones[2]) {
      if (currentZone !== 3) {
        setCurrentZone(3);
        prevSlide(1);
      }
    } else if (mouseX < zones[3]) {
      if (currentZone !== 4) {
        setCurrentZone(4);
      }
    } else if (mouseX < zones[4]) {
      if (currentZone !== 5) {
        setCurrentZone(5);
      }
    } else if (mouseX < zones[5]) {
      if (currentZone !== 6) {
        setCurrentZone(6);
        nextSlide(1);
      }
    } else if (mouseX < zones[6]) {
      if (currentZone !== 7) {
        setCurrentZone(7);
        nextSlide(2);
      }
    } else if (currentZone !== 8) {
      setCurrentZone(8);
      nextSlide(3);
    }
  };

  const handleMouseLeave = () => {
    setCurrentZone(null);
  };

  const getClonedSlides = () => {
    const clonesBefore = slides.slice(-visibleSlidesCount);
    const clonesAfter = slides.slice(0, visibleSlidesCount);
    return [...clonesBefore, ...slides, ...clonesAfter];
  };

  const getSlideClassMobile = (index) => {
    const relativeIndex = (index + totalSlides - currentIndex) % totalSlides;
    if (relativeIndex === visibleSlidesCount + 1) {
      return 'slide center';
    } else {
      return 'slide';
    }
  };

  const renderDots = () => {
    return (
      <div className="slide-dots">
        {slides.map((_, index) => {
          const isActive = ((currentIndex - visibleSlidesCount) % slidesLength) === index;
          return (
            <div key={index} className={`dot ${isActive ? 'active' : ''}`} />
          );
        })}
      </div>
    );
  };

  return (
    <div className="slider-container" ref={sliderRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onTouchStart={handleSwipeStart} onTouchEnd={handleSwipeEnd}>
      {isLoading ? (
        <div className="loading-screen">Loading...</div>
      ) : (
        <>
          {!isMobile && <button onClick={() => prevSlide(1)} className="nav left-nav">‹</button>}
          <div className="slider-wrapper">
            <div className="slider" style={{ transform: `translateX(-${isMobile ? currentIndex * ((fixedSlideWidth / 100 * document.querySelector('.slider-container').offsetWidth) + slideMargin * 2) : currentIndex * slideWidth}px)` }}>
              {getClonedSlides().map((slide, index) => (
                <Slide
                  key={index}
                  slide={slide}
                  className={isMobile ? getSlideClassMobile(index) : getSlideClass(index)}
                  style={isMobile ? { flex: '0 0 70%', margin: '0 10px', filter: `grayscale(${index === currentIndex ? 0 : 1})`, opacity: 1, boxShadow: `${index === currentIndex ? '0 0 15px rgba(255, 255, 255, 0.4)' : 'none'}` } : getSlideStyle(index)}
                />
              ))}
            </div>
          </div>
          {!isMobile && <button onClick={() => nextSlide(1)} className="nav right-nav">›</button>}
          {isMobile && renderDots()}
        </>
      )}
    </div>
  );
};

export default Slider;
