// ImageScroller component

//import this for image resizing code
//import React, { useState, useEffect } from "react";
import React from "react";
import "./ImageScroller.css";
import SimpleImageSlider from "react-simple-image-slider";

function ImageScroller(props) {
    // prop.images is a list of urls as strings
    /*
    const images = [
        {url: "/images/team_potluck.jpg"},
        {url: "/images/divisional.jpg"}
    ];
    */
    const windowSize = window.innerWidth < 1000 ? (0.95 * window.innerWidth) : 1000;

    // this commented code is for if you want the image to resize with the window, but
    // I've decided to only calculate the image size one time when the window is first loaded
    /*
    const [windowSize, setWindowSize] = useState(
        window.innerWidth < 700 ? (0.95 * window.innerWidth) : (0.65 * window.innerWidth)
      );
    
    useEffect(() => {
      const handleWindowResize = () => {
        setWindowSize(window.innerWidth < 700 ? (0.95 * window.innerWidth) : (0.65 * window.innerWidth));
      };
  
      window.addEventListener('resize', handleWindowResize);
  
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, []);*/
    // from https://www.npmjs.com/package/react-simple-image-slider
    return (
        <div className='image-scroller'>
            <SimpleImageSlider className='image-scroller-image'
                width={windowSize}//windowSize[0] * proportionOfScreenWidth}
                height={windowSize*9/16}//(windowSize[0] * proportionOfScreenWidth)/16 * 9}
                images={props.images}
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
