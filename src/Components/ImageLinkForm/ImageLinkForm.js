import React from 'react';

const ImageLinkForm = ({ onButtonSubmit, onInputChange }) => {
    return (
      <div className="f3 center">
        <div className="center form mb2 pa2 shadow-5">
        	<input 
            onChange={onInputChange}
            className="f3 w-70"
          />
          <button 
            onClick={onButtonSubmit}
            className="f3 w-30 br1 bg-light-yellow grow"
          >Detect</button>
        </div>
      </div>
    );
}

export default ImageLinkForm;