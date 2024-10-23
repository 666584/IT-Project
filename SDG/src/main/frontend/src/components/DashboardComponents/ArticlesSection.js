// ArticlesSection.js
import React from "react";
import './ArticlesSection.css';

const ArticlesSection = () => {
  return (
    <div className="articles-section">
      <div className="section-header">
        <h3 className="articlen">Articles</h3>
        <button className="see-more-button">See more</button>
      </div>
      <div className="articles-container">
        <div className="article-card">
          <span className="article-number-1">2</span>
          <p>Guterres appeals for 'Polio Pause' in Gaza</p>
        </div>
        <div className="article-card">
          <span className="article-number-2">3</span>
          <p>Zimbabwe faces worsening food crisis due to El Niño droughts...</p>
        </div>
      </div>
    </div>
  );
};

export default ArticlesSection;
