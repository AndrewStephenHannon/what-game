import { useState, useEffect } from 'react'

interface Recommendation {
  game: string;
  suggestions:string[];
}

function RecommendGame() {
    const [result, setResult] = useState<Recommendation>();
    const [gameHistory, setGameHistory] = useState<{ game: string, reason: string }[]>([]);

    const handleClick = (suggestion: string) => {
        if(result?.game)
            setGameHistory(prev => [...prev, {game: result.game, reason: suggestion}])
    }

    useEffect(() => {
        const endpoint = gameHistory.length > 0 ?
            'https://wg8nxxcksi.execute-api.us-east-1.amazonaws.com/default/refineGame':
            'https://627zcva05h.execute-api.us-east-1.amazonaws.com/default/recommendGame'

        const payload = gameHistory.length > 0 ? { history: gameHistory } : undefined;

        const method = gameHistory.length > 0 ? 'POST' : 'GET'

        fetch(endpoint, {
            method: method,
            body: payload ? JSON.stringify(payload) : undefined
        })
    .then(response => response.json())
    .then(data => setResult(data))
    .catch(error => console.error(error));
    },
    [gameHistory]);

    return (
        <>
            <div className="card">

            <h1>{result?.game}</h1>
            <br></br>
            {result?.suggestions.map((suggestion) => <button key={suggestion} onClick= {() => handleClick(suggestion)}>{suggestion}</button>)}
            
            </div>
        </>
    )
}

export default RecommendGame