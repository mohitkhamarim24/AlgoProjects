import Navbar from './Navbar';
<<<<<<< HEAD
=======
import Textform from './Textform';
>>>>>>> 36ff1a7 (Completed Login and Signup page)
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
<<<<<<< HEAD
<textarea rows="20" cols="75" value={code} onChange={(e)=>{setcode(e.target.value)}} mode={mode}></textarea>
<br />
<button type="button" className="btn btn-success" onClick={handleSubmit}>Submit</button>
=======
<p>
Code is the language of creation and innovation. It empowers you to solve real-world problems,
 connect with a global community, and leave a lasting legacy.
  Start writing code today and build your future. Keep coding,
   keep building things, and together, let's elevate this world to the next level.
</p>
<h2>Test your Code here!</h2>
<div className='container'>
<Textform  value={code} onChange={(e)=>{setcode(e.target.value)}} mode={mode}></Textform>
</div>
<div className='container my-3'>
<button type="button" className="btn btn-success" onClick={handleSubmit} >Submit</button>
</div>
>>>>>>> 36ff1a7 (Completed Login and Signup page)
<p>{output}</p>
</>
  );
}
export default App;
