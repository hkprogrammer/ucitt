import React from 'react';
import './Button.css';

function Button(props) {
    /*
    *   props.text == string of text on button
    *   props.href == string of href
    *
    */
  return (
    <div className='button-container'>
        <a href={props.href} className='button-link'>
            <div className='button'>
                {props.text}
            </div>
        </a>
    </div>
    
  )
}

export default Button