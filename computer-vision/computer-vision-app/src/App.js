import React from 'react';
import './App.css';
import Dropzone from 'react-dropzone'
import StyledDropzone from './StyledDropzone.js'

const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'fd998d19d60949d4b49a4e4e9391591e'
});

app.models.initModel({ id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40" })
  .then(generalModel => {
    return generalModel.predict("https://www.sustainableplaces.eu/wp-content/uploads/2017/02/SmartBuilding.jpg");
  })
  .then(response => {
    var concepts = response['outputs'][0]['data']['concepts'];
    console.log(concepts);
  })


  
function App() {
  return (
    <div className="App">
      <StyledDropzone/>
    </div>
  );
}

export default App;
