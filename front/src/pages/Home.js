// Homepage Stuff

import React from 'react';
import './Home.css';
import ImageScroller from '../Components/ImageScroller';
// import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className='home'>
            <div className='home-title'>UCI Table Tennis</div>
            <div className='home-caption'>Have fun and learn new skills!</div>

            {/* add images by URl here */}
            <ImageScroller images={[{url: "/images/team_potluck.jpg"}, {url: "/images/divisional.jpg"}]}/>
            
            <div className='home-description'>
                <div className='home-subtitle'>About Us</div>
                <div className='home-about-us'>Table tennis at UCI welcomes players of all skill levels to come and practice with other members. You can hone your skills, socialize, and make new friends while playing table tennis! If you don’t have your own racket we can lend you one of ours. For those who are serious about improving, our coaches and board members can teach you the tips and tricks required to play at a higher level. Every member has a chance to try to make the competitive roster, which will compete with other colleges in Southern California at NCTTA tournaments.</div>
                <div><b>President:</b> Hitoki Kidahashi</div>
                <div><b>League:</b> National Collegiate Table Tennis Association - Southern California Division</div>
                <div><b>National:</b> National Collegiate Table Tennis Association (NCTTA)</div>
            </div>
            
            <div className='home-horizontal-line'></div>
            <div className='home-practice-schedule'>
                <div className='home-subtitle'>Practice Schedule</div>
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