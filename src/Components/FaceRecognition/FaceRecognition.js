import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
      <div className="center">
	      <div className=" mt2 absolute">
	        <img id='inputimage' alt="face-here-be" src={imageUrl} width="300px" height="auto"/>
	        <div className="bounding-box" style={{ top: box.topRow, left: box.leftCol, right: box.rightCol, bottom: box.bottomRow }}></div>
	      </div>
      </div>
    );
}

export default FaceRecognition;