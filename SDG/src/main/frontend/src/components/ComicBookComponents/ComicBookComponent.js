// ComicBookComponent.js
import React, { useState } from "react";
import HTMLFlipBook from "react-pageflip";
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
        showCover={true}  // Enables single cover page layout
      >
        {/* Single cover page */}
        <div className="comic-page">
          <img
            src={require("../../assets/ComicBookAssets/comicbook/comic-1.png")}
            alt="Comic Page 1"
          />
        </div>

        {/* Double-page spreads */}
        <div className="comic-page">
          <img
            src={require("../../assets/ComicBookAssets/comicbook/comic-2.png")}
            alt="Comic Page 2"
          />
        </div>
        <div className="comic-page">
          <img
            src={require("../../assets/ComicBookAssets/comicbook/comic-3.png")}
            alt="Comic Page 3"
          />
        </div>
        <div className="comic-page">
          <img
            src={require("../../assets/ComicBookAssets/comicbook/comic-4.png")}
            alt="Comic Page 4"
          />
        </div>
        <div className="comic-page">
          <img
            src={require("../../assets/ComicBookAssets/comicbook/comic-5.png")}
            alt="Comic Page 5"
          />
        </div>
        <div className="comic-page">
          <img
            src={require("../../assets/ComicBookAssets/comicbook/comic-6.png")}
            alt="Comic Page 6"
          />
        </div>
        <div className="comic-page">
          <img
            src={require("../../assets/ComicBookAssets/comicbook/comic-7.png")}
            alt="Comic Page 7"
          />
        </div>
        <div className="comic-page">
          <img
            src={require("../../assets/ComicBookAssets/comicbook/comic-8.png")}
            alt="Comic Page 8"
          />
        </div>
      </HTMLFlipBook>

      <button onClick={() => setPage(page - 1)} className="back-button">Back</button>
    </div>
  );
};

export default ComicBookComponent;
