// ComicBookComponent.js
import React, { useState } from "react";
import  HTMLFlipBook  from "react-pageflip";
import "./ComicBookComponent.css";

const ComicBookComponent = () => {
  const [page, setPage] = useState(0);

  const handlePageChange = (e) => {
    setPage(e.data);
  };

  return (
    <div className="comic-book-container">
      <HTMLFlipBook
        width={500}
        height={700}
        onFlip={handlePageChange}
        maxShadowOpacity={0.5}
        className="flip-book"
      >
        <div className="comic-page">
          <img
            src={require("./comicbook/comic1.png")}
            alt="Comic Page 1"
          />
        </div>
        <div className="comic-page">
          <img
            src={require("./comicbook/comic2.png")}
            alt="Comic Page 2"
          />
        </div>
        <div className="comic-page">
          <img
            src={require("./comicbook/comic3.png")}
            alt="Comic Page 3"
          />
        </div>
        <div className="comic-page">
          <img
            src={require("./comicbook/comic4.png")}
            alt="Comic Page 4"
          />
        </div>
      </HTMLFlipBook>
      <button onClick={() => setPage(page - 1)} className="back-button">Back</button>
    </div>
  );
};

export default ComicBookComponent;
