import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Input } from 'semantic-ui-react';
import axios from 'axios';

function App() {
  const [value, setValue] = useState("");

  const handleClick = () => {
    if(value!== ""){
      axios.post("https://sentiment-analysis-ashutosh.herokuapp.com//sentiment", {"sentence": value})
      .then((response) => {
        console.log(response);
        document.getElementsByClassName("sentiment-text")[0].innerText = response["data"]["sentiment"];
      })
      .catch((err) => {
        console.log(err);
        document.getElementsByClassName("sentiment-text")[0].innerText = "Error"
      });
    }
  }

  const handleValueChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <div style={{height:"100vh", width:"100vw", alignItems:"center", justifyContent:"center", textAlign:"center", backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display:"table-cell", verticalAlign: "middle", horizontalAlign:"middle"}}>
        <Input transparent onChange={handleValueChange} action={{color: 'teal', onClick: () => handleClick(), content: "GET SENTIMENT"}} placeholder='Write...' style={{border:"1px solid #fff", padding:"10px", borderRadius: "5px"}} />
        <p className="sentiment-text" style={{marginTop: "20px", color: "white"}}>No Sentiment</p>
    </div>
  );
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);


export default App;
