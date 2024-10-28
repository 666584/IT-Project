import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layout/Navbar.js';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import GoalAPI from '../services/GoalAPI.js';
import GoalImg from '../assets/GoalAssets/goalImg.png';
import PubImg1 from  '../assets/GoalAssets/pub1.png';
import PubImg2 from  '../assets/GoalAssets/pub2.png';
import PubImg3 from  '../assets/GoalAssets/pub3.png';
import PubImg4 from  '../assets/GoalAssets/pub4.png';
import './Goal.css';

const Goal = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { title, userId } = useParams();
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleTaskClick = (task) =>{
        navigate(`/goal/${title}/${task}`);
    };

    const handleRedirect = (url) => {
        window.open(url, "_blank");
    };

    useEffect(() => {
        const fetchProgressData = async () => {
        try {
            const response = await GoalAPI.goal(title, userId);
            if (!response.data) {
                throw new Error('Failed to fetch user data');
            }
            setProgress(response.data);
            console.log(response.data);
            console.log(progress);

            console.log('ResultProgress:', {
                progress
            });

            setLoading(false);
        }catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    
    fetchProgressData();
    }, []);
    
    if (loading) {
    return <div>Loading...</div>;
    }

    if (error) {
    return <div>Error: {error}</div>;
    }

    return (
        <div className="goal">
            <Helmet>
                <title>{ title }</title>
            </Helmet>
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Navbar>
            <div className="education">
                <div className="educationItem">
                    <div className='header'>{ title }</div>
                    <div className='content'>
                        <div className='contentItem'> 
                            <div className='contentItemLeft'>
                                <button onClick={() => handleTaskClick('overview')}>Overview</button>
                            </div>
                            <div className='contentItemRight'>{progress.overview ? 50 : 0}/50</div>
                        </div>
                        <div className='contentItem'>
                            <div className='contentItemLeft' >
                                <button onClick={() => handleTaskClick('targets')}>Targets and Indicators</button>
                            </div>
                            <div className='contentItemRight'>{progress.targets ? 50 : 0}/50</div>
                        </div>
                        <div className='contentItem'>
                            <div className='contentItemLeft'>
                                <button onClick={() => handleTaskClick('progress')}>Progress</button>
                            </div>
                            <div className='contentItemRight'>{progress.progress ? 50 : 0}/50</div>
                        </div>
                    </div>
                </div>
                <div className="educationItem">
                    <img src={GoalImg} alt='goalImg' />
                </div>
            </div>
            <div className="recent">
                <div className="recentItem">
                    <div className='header'>
                        Recent Publications
                        <button onClick={() => handleRedirect("https://sdgs.un.org/publications")}>view all</button>
                    </div>
                    <div className='imgContain'>
                        <div className='imgContainItem'>
                            <img src={PubImg1} alt='module' onClick={() => handleRedirect("https://sdgs.un.org/publications/synergy-solutions-climate-and-sdg-action-bridging-ambition-gap-future-we-want-56106")}/>
                        </div>
                        <div className='imgContainItem'>
                            <img src={PubImg2} alt='module' onClick={() => handleRedirect("https://sdgs.un.org/publications/third-global-conference-strengthening-synergies-between-paris-agreement-and-2030")}/>
                        </div>
                        <div className='imgContainItem'>
                            <img src={PubImg3} alt='module' onClick={() => handleRedirect("https://sdgs.un.org/publications/sustainable-development-goal-interactions-through-climate-lens-global-analysis-50402")}/>
                        </div>
                        <div className='imgContainItem'>
                            <img src={PubImg4} alt='module' onClick={() => handleRedirect("https://sdgs.un.org/publications/tracking-sdg7-energy-progress-report-2022-47726")}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Goal