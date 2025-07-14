import React, { useState } from 'react';
import ShortenerForm from './ShortenerForm'; // adjust path if needed
import './App.css';

function App() {
  const [result, setResult] = useState(null); // ✅ This line fixes your error

  return (
    <div className="App">
      <h2>URL Shortener</h2>
      <ShortenerForm setResult={setResult} />
      {result && (
        <div className="result">
          <p>
            <strong>Short Link:</strong>{' '}
            <a href={result.shortLink} target="_blank" rel="noreferrer">
              {result.shortLink}
            </a>
          </p>
          <p>
            <strong>Expiry:</strong> {result.expiry}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
