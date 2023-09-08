import Navbar from './Navbar';
import './App.css';
import { useState } from 'react';
import Alert from './Alert';
import axios from 'axios';
function App(){
  const [mode,setMode] = useState('light');

  const[alert,setAlert] = useState(null);

  const [code,setcode] = useState("");
  const[output,setOutput]=useState("");
  const handleSubmit =async ()=>{
    const payload ={
      language : "cpp",
      code
    };
    try{
    const {data} = await axios.post("http://localhost:5000/run",payload);
    setOutput(data.output);
    }catch(err){
    console.log(err.response);
    }
  }

  const showAlert=(messege,type)=>{
    setAlert({
      msg:messege,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1000)
  }


  const togglemode = () =>{
    if(mode === 'light'){
      setMode('dark')
      document.body.style.backgroundColor = 'black';
      showAlert("Dark Mode has been enabled" , "success!")
     
    }else{
      setMode('light')
      document.body.style.backgroundColor = 'white';
      showAlert("white Mode has been enabled" , "success!")
      
    }
  }
  return(
<>
<Navbar title = "Meet Code" mode={mode} toggleMode={togglemode} />
<Alert alert = {alert} my-3/>
<h1>Welcome to Meetcode</h1>
<textarea rows="20" cols="75" value={code} onChange={(e)=>{setcode(e.target.value)}} mode={mode}></textarea>
<br />
<button type="button" className="btn btn-success" onClick={handleSubmit}>Submit</button>
<p>{output}</p>
</>
  );
}
export default App;
