import React from 'react';
import Slider from 'react-slick'; // Import the slider component

const ImageSlider = () => {
  const images = [
    '/images/PIC1.jpg',
    '/images/PIC2.jpg',
    '/images/PIC3.jpg',
    '/images/PIC4.jpg',

  ];

  // Slick Slider settings
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite loop sliding
    speed: 400, // Animation speed
    slidesToShow: 1, // Number of slides visible at once
    slidesToScroll: 1, // Number of slides to scroll per click
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Time between slides in ms
    arrows: true, // Show next/prev arrows
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="slider-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
