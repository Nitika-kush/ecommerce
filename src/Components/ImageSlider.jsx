import React from 'react';
import Slider from 'react-slick';

const ImageSlider = () => {
  const settings = {
    dots: false, 
    infinite: true,  
    slidesToShow: 1,  
    slidesToScroll: 1,  
    autoplay: true,  
    autoplaySpeed: 1500,
    speed: 1000,  
    arrows: false, 
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
      <div className="slide">
          <div className="image-wrapper" >
            <img src="/images/PIC1.jpg" alt="Slide 1" className="slider-image" style={{ marginTop: '0px', height: '525px' }} />
            <div className="overlay">
              <h2>Image Title 1</h2>
              <p>Some description for the first image.</p>
            </div>
          </div>
        </div>
        <div className='slide'>
         <div className='image-wrapper'>
         <img src="/images/PIC2.jpg" alt="Slide 2" className="slider-image"   style={{marginTop:"0px", height:"525px"}}/>
          <div className='overlay'>
            <h2>Image Title 2</h2>
            <p>This is The Second Image and it is very nice.</p>
          </div>
         </div>
        </div>
        <div className='slide'>
         <div className='image-wrapper'>
         <img src="/images/PIC3.jpg" alt="Slide 2" className="slider-image"   style={{marginTop:"0px", height:"525px"}}/>
          <div className='overlay'>
            <h2>Image Title 3</h2>
            <p>This is The third Image and it is very nice.</p>
          </div>
         </div>
        </div>
        <div className='slide'>
         <div className='image-wrapper'>
         <img src="/images/PIC4.jpg" alt="Slide 2" className="slider-image"   style={{marginTop:"0px", height:"525px"}}/>
          <div className='overlay'>
            <h2>Image Title 4</h2>
            <p>This is The fourth Image and it is very nice.</p>
          </div>
         </div>
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
