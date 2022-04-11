import React, { useState } from 'react';
import './App.css';

function App() {
  const [working, setWorking] = useState<boolean | null>(null);

  const fetchWorkingState = () => {
    fetch('/working')
    .then(response => response.json())
    .then(workingState => setWorking((workingState as any).working))
    .catch((e) => {
      console.log(e);
      setWorking(false)
    })
  }

  return (
    <div className="App">
      <button onClick={fetchWorkingState}>Does it work?!</button>
      {working === null && <div>Maybe?</div>}
      {working === true && <div>Yep!</div>}
      {working === false && <div>Nope!</div>}
    </div>
  );
}

export default App;
