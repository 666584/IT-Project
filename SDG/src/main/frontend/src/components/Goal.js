import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Layout/Navbar';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import './Goal.scss';

const Goal = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { title, userId } = useParams();
    const [progress, setProgress] = useState('')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [result, setResult] = useState({
        overviewValue: 0,
        targetsValue: 0,
        progressValue: 0,
    });

    console.log("title" + title);
    console.log("userId"+ userId);
    
    useEffect(() => {
        const fetchProgressData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/goal/${title}/${userId}`,{
                    headers: {
                        Accept: 'application/json',
                    },
                });
                if (!response.data) {
                    throw new Error('Failed to fetch user data');
                }
                setProgress(response.data);
                console.log(progress);
                const overviewValue = progress.overview ? 50 : 0;
                const targetsValue = progress.targets ? 50 : 0;
                const progressValue = progress.progress ? 50 : 0;

                setResult({
                    overviewValue,
                    targetsValue,
                    progressValue,
                });

                console.log('Result:', {
                    overviewValue,
                    targetsValue,
                    progressValue,
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
                            <div className='contentItemLeft'>Overview</div>
                            <div className='contentItemRight'>{result.overviewValue}/50</div>
                        </div>
                        <div className='contentItem'>
                            <div className='contentItemLeft'>Targets and Indicators</div>
                            <div className='contentItemRight'>{result.targetsValue}/50</div>
                        </div>
                        <div className='contentItem'>
                            <div className='contentItemLeft'>Progress</div>
                            <div className='contentItemRight'>{result.progressValue}/50</div>
                        </div>
                    </div>
                </div>
                <div className="educationItem">
                    <img src={require('../assets/image-4.png')} alt='module' />
                </div>
            </div>
            <div className="recent">
                <div className="recentItem">
                    <div className='header'>Recent Publications</div>
                    <div className='imgContain'>
                        <div className='imgContainItem'>
                            <img src={require('../assets/image-one.png')} alt='module' />
                        </div>
                        <div className='imgContainItem'>
                            <img src={require('../assets/image-1.png')} alt='module' />
                        </div>
                        <div className='imgContainItem'>
                            <img src={require('../assets/image-2.png')} alt='module' />
                        </div>
                        <div className='imgContainItem'>
                            <img src={require('../assets/image-3.png')} alt='module' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Goal