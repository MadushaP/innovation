import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import './style.css';

const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'fd998d19d60949d4b49a4e4e9391591e'
});

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 50px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
  margin: 0 auto;
  position: absolute;
  left: 40%;
  top: 10%;
`;

export default function StyledDropzone(props) {
  const [files, setFiles] = useState([]);
  const [predictResults, setPredictResults] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));

      var reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onloadend = function () {
        var base64data = reader.result.toString().split(',')[1];

        app.models.predict(Clarifai.GENERAL_MODEL, { base64: base64data }).then(
          function (response) {
            console.log(response.outputs[0].data.concepts);
            setPredictResults(response.outputs[0].data.concepts);

          },
          function (err) {
            console.log(err)
          }
        );
      }
    }
  });

  const thumbs = files.map(file => (
    <div className="thumb" key={file.name}>
      <div className="thumbInner">
        <img
          src={file.preview}
          className="img"
        />
      </div>
    </div>
  ));

  const result = predictResults.map(result => (
    <td key={result.id}>{result.name}</td>
  ));

  return (
    <div className="container">
      <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </Container>
      <aside className="thumbsContainer">
        {thumbs}
      </aside>
      <div className="labels">
        <table>
          <tbody>
            <tr >
              {result}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}