import { useState, useEffect } from 'react'

interface Recommendation {
  game: string;
  suggestions:string[];
}

function RecommendGame() {
  const [result, setResult] = useState<Recommendation>();

  useEffect(() => {
    fetch('https://627zcva05h.execute-api.us-east-1.amazonaws.com/default/recommendGame')
   .then(response => response.json())
   .then(data => setResult(data))
   .catch(error => console.error(error));
  },
  []);

  return (
    <>
      <div className="card">

        <h1>{result?.game}</h1>
        <br></br>
        {result?.suggestions.map((suggestion) => <button key={suggestion}>{suggestion}</button>)}
        
      </div>
    </>
  )
}

export default RecommendGame