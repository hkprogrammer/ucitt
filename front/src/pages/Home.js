// Homepage Stuff

import React from 'react';
import './Home.css';
import ImageScroller from '../Components/ImageScroller';

function Home() {
    return (
        <div className='home'>
            <div className='home-title'>UCI Table Tennis</div>
            <div className='home-caption'>Have fun and learn new skills!</div>
            <ImageScroller />
            <div className='home-items'>
                <div className='home-list'>
                    What does UCI Table Tennis do?
                    <ul>
                        <li>Host events</li>
                        <li>Practices</li>
                        <li>Potlucks</li>
                        <li>Competitive Tournaments</li>
                    </ul>
                </div>
                <div className='home-awards'>
                    Awards and Accolades
                    <ul>
                        <li>we are really cool</li>
                        <li>#1 vibers in CA</li>
                        <li>compsci club</li>
                        <li>yummy food</li>
                    </ul>
                </div>
            </div>
            <div className='home-horizontal-line'></div>
            <div className='home-practice-schedule'>
                <div className='home-practice-title'>Practice Schedule</div>
                <div className='home-practice-day'>
                    <div>Mondays</div>
                    <div className='home-practice-child1'>8pm - 10pm</div>
                    <div>Activity Annex</div>
                </div>
                <div className='home-practice-day'>
                    <div>Thursdays</div>
                    <div className='home-practice-child2'>8pm - 10pm</div>
                    <div>Activity Annex</div>
                </div>
                <div className='home-practice-day'>
                    <div>Saturdays</div>
                    <div className='home-practice-child2'>11am - 1pm</div>
                    <div>Activity Annex</div>
                </div>
            </div>
            <div className='home-horizontal-line'></div>
            <div className='home-blank-space'></div>
        </div>
    );
}

export default Home;