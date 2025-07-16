import { useState, useEffect } from 'react'
import './App.css'

interface Recommendation {
  game: string;
  suggestions:[string];
}

function App() {
  const [result, setResult] = useState<Recommendation>();

  useEffect(() => {
    fetch('https://627zcva05h.execute-api.us-east-1.amazonaws.com/default/recommendGame')
   .then(response => response.json())
   .then(data => setResult(data))
   .catch(error => console.error(error));
  },
  []);

  /*const fetchData = async () => { 
      const response = await fetch('https://627zcva05h.execute-api.us-east-1.amazonaws.com/default/recommendGame')
      const data = await response.json()
      return data
   }
  
  console.log(fetchData())*/

  return (
    <>
      <div className="card">

        <h1>{result?.game}</h1>
        <br></br>
        {result?.suggestions.map((suggestion) => <button>{suggestion}</button>)}
        
      </div>
    </>
  )
}

export default App
