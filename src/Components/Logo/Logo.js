import React from 'react';
import Tilt from 'react-tilt';
import lightning from './lightning.png';
import './Logo.css';

const Logo = () => {
    return (
      <div className="ml3">
      	<Tilt className="Tilt br2 shadow-2 gradient" options={{ max : 45 }} style={{ height: 150, width: 150 }} >
			 <div className="Tilt-inner pa3"> 
			 	<img alt='Logo' src={lightning}/>
			 </div>
		</Tilt>
      </div>
    );
}

export default Logo;