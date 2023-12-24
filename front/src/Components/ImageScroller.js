// ImageScroller component

import React, { useState, useEffect } from "react";
import "./ImageScroller.css";
import SimpleImageSlider from "react-simple-image-slider";

function ImageScroller() {
    // add images here
    const images = [
        {url: "/images/team_potluck.jpg"},
        {url: "/images/divisional.jpg"}
    ];

    // change proportionOfScreenWidth to change size of image scroller
    let proportionOfScreenWidth = 0.65;

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
      ]);
    
      useEffect(() => {
        const handleWindowResize = () => {
          setWindowSize([window.innerWidth, window.innerHeight]);
        };
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);
    
    // from https://www.npmjs.com/package/react-simple-image-slider
    return (
        <div className='image-scroller'>
            <SimpleImageSlider className='image-scroller-image'
                width={windowSize[0] * proportionOfScreenWidth}
                height={(windowSize[0] * proportionOfScreenWidth)/16 * 9}
                images={images}
                showBullets={true}
                showNavs={true}
                autoPlay={true}
                autoPlayDelay={5}
                navMargin={0}
            />
        </div>
    );
}

export default ImageScroller;
