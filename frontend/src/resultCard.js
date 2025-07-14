import React from 'react';
import './ResultCard.css';

function ResultCard({ code }) {
  const shortLink = `${window.location.origin}/shorturls/${code}`;

  return (
    <div className="result-card">
      <h4>Short URL:</h4>
      <p>{shortLink}</p>
    </div>
  );
}

export default ResultCard;
