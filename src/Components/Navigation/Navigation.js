import React from 'react';
import './Navigation.css';

const Navigation = ({ isSignedIn, onRouteChange }) => {
    if(isSignedIn) {
	    return (
	      <nav className="mr3">
	        <p 
	        	onClick={() => onRouteChange('SignIn')}
	        	className="nav underline dim washed-blue pointer f3 mh3">Signout</p>
	      </nav>
	    );	
    } else {
    	return (
		      <nav className="mr3 nav" >
		        <p 
		        	onClick={() => onRouteChange('SignIn')}
		        	className="dim washed-blue pointer f3 link mh3 underline">Sign In</p>
		        <p 
		        	onClick={() => onRouteChange('Register')}
		        	className="dim washed-blue pointer f3 link mh3 underline"> Register</p>
		      </nav>
	    );	
    }
    
}

export default Navigation;