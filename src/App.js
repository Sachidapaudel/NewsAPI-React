import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Textform from './Components/Textform';
import Alert from './Components/Alert';


function App() { 
  const [mode, setMode] = useState('light'); // If dark mode is enabled or not
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark Mode Has Been Enabled", "success");
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light Mode Has Been Enabled", "success");
    }
  }

  return (
    <>
    
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} aboutText="About Us" />
      <Alert alert={alert} />
      <div className="container my-3">
        <Textform showAlert={showAlert} heading="Try TextUtils - Word Counter, Character Counter, Remove Punctuation" mode={mode} />
    
      </div>
   </>
  );
}

export default App;
