import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Layout/Navbar.js';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
            const response = await axios.get(`http://localhost:8080/api/goal/${title}/${userId}`);
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
                    <img src={require('../assets/image-4.png')} alt='module' />
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
                            <img src={require('../assets/image-one.png')} alt='module' onClick={() => handleRedirect("https://sdgs.un.org/publications/synergy-solutions-climate-and-sdg-action-bridging-ambition-gap-future-we-want-56106")}/>
                        </div>
                        <div className='imgContainItem'>
                            <img src={require('../assets/image-1.png')} alt='module' onClick={() => handleRedirect("https://sdgs.un.org/publications/third-global-conference-strengthening-synergies-between-paris-agreement-and-2030")}/>
                        </div>
                        <div className='imgContainItem'>
                            <img src={require('../assets/image-2.png')} alt='module' onClick={() => handleRedirect("https://sdgs.un.org/publications/sustainable-development-goal-interactions-through-climate-lens-global-analysis-50402")}/>
                        </div>
                        <div className='imgContainItem'>
                            <img src={require('../assets/image-3.png')} alt='module' onClick={() => handleRedirect("https://sdgs.un.org/publications/tracking-sdg7-energy-progress-report-2022-47726")}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Goal