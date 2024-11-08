import React from 'react';
import Slider from 'react-slick'; 

const ImageSlider = () => {
  const images = [
    '/images/PIC1.jpg',
    '/images/PIC2.jpg',
    '/images/PIC3.jpg',
    '/images/PIC4.jpg',

  ];


  const settings = {
    dots: true,
    infinite: true, 
    speed: 400, 
    slidesToShow: 1,
    slidesToScroll: 1, 
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
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
