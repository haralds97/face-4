import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Tachyons from 'tachyons';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';

const app = new Clarifai.App({
 apiKey: '66c26976e675482eaa843e8fc6b634ca'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(
    	Clarifai.FACE_DETECT_MODEL, 
    	this.state.input
    )
    .then(response => this.displayFaceBox(this.faceCalculation(response)))
	.catch(err => console.log(err));
  }

  faceCalculation = (data) => {
  	const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  	const image = document.getElementById('inputimage');
  	const height = Number(image.height);
  	const width = Number(image.width);
  	return {
  		leftCol: clarifaiFace.left_col * width,
  		topRow: clarifaiFace.top_row * height,
  		bottomRow: height - (clarifaiFace.bottom_row * height),
   		rightCol: width - (clarifaiFace.right_col * width)
  	}
  }

  displayFaceBox = (box) => {
  	this.setState({ box: box });
  }

  onRouteChange = (route) => {
    (route == 'SignIn' || route == 'Register' ) 
      ? this.setState({ isSignedIn: false }) 
      : this.setState({ isSignedIn: true });
    this.setState({ route: route})
  }


  render() {
    return (
      <div>
        <Particles className="particles"/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        
        {
          (this.state.route == 'SignIn') 
            ? <SignIn onRouteChange={this.onRouteChange}/>
            : (this.state.route == 'Register') 
              ? <Register onRouteChange={this.onRouteChange}/>
              : <div>
                <Logo />
                <Rank />
                <ImageLinkForm 
                  onButtonSubmit={this.onButtonSubmit} 
                  onInputChange={this.onInputChange}
                /> 
                <FaceRecognition 
                  imageUrl={this.state.imageUrl}
                  box={this.state.box}
                />
                </div>
        }
      </div>
    );
  }
}

export default App;
