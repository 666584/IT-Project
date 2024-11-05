import React, { useState } from 'react';
import './Tooltip.css';

const Tooltip = ({ text, children }) => {
    const [visible, setVisible] = useState(false);

    const handleMouseEnter = () => {
        setVisible(true);
    };

    const handleMouseLeave = () => {
        setVisible(false);
    };

    return (
        <div 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            style={{ display: 'inline-block', position: 'relative' }}
        >
            {children}
            {visible && (
                <div className="tooltip">
                    {text}
                    <div className="tooltip-arrow" />
                </div>
            )}
        </div>
    );
};

export default Tooltip;