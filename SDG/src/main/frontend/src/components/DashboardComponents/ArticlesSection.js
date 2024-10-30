// ArticlesSection.js
import React from "react";
import './ArticlesSection.css';

const ArticlesSection = () => {
  return (
    <div className="articles-section">
      <div className="section-header">
        <h3 className="articlen">Articles</h3>
        <button 
          className="see-more-button" 
          onClick={() => window.open('https://sdgs.un.org/news', '_blank', 'noopener,noreferrer')}
        >
          See more
        </button>
      </div>
      <div className="articles-container">
        {/* Article 1 with link */}
        <div 
          className="article-card article-link" 
          onClick={() => window.open('https://news.un.org/en/story/2024/08/1153276', '_blank', 'noopener,noreferrer')}
        >
          <span className="article-number-1">2</span>
          <p>Guterres appeals for 'Polio Pause' in Gaza</p>
        </div>

        {/* Article 2 with link */}
        <div 
          className="article-card article-link" 
          onClick={() => window.open('https://news.un.org/en/story/2024/08/1152936', '_blank', 'noopener,noreferrer')}
        >
          <span className="article-number-2">3</span>
          <p>Zimbabwe faces worsening food crisis due to...</p>
        </div>
      </div>
    </div>
  );
};

export default ArticlesSection;
