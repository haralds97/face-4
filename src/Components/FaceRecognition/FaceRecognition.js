import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
    return (
      <div className="center">
	      <div className=" mt2 absolute">
	        <img alt="face-here-be" src={imageUrl} width="300px" height="auto"/>
	      </div>
      </div>
    );
}

export default FaceRecognition;