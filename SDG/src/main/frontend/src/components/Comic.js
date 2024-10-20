import React from "react";
import LeftSide from "./ComicBookComponents/LeftSide";
import ComicBookComponent from "./ComicBookComponents/ComicBookComponent";
import "./Comic.css";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Comic() {
  const navigate = useNavigate();
  const params  = useParams();
  
  const handleClick = () =>{
    const title = params.title;
    const task = params.task;
    navigate(`/goal/${title}/${task}/quizzes`);
  }
  return (
    <div className="app">
      <div className="content-container">
        <div className="left-column">
          <LeftSide />
        </div>
        <div className="right-column">
          <ComicBookComponent />
          <button onClick={handleClick}>NEXT</button>
        </div>
      </div>
    </div>
  );
}

export default Comic;
