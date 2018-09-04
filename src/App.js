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


const app = new Clarifai.App({
 apiKey: '66c26976e675482eaa843e8fc6b634ca'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
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


  render() {
    return (
      <div>
        <Particles className="particles"/>
        <Navigation />
        <SignIn />
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
    );
  }
}

export default App;
