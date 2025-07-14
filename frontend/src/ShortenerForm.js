import React, { useState } from 'react';
import api from './api'; // Axios instance pointing to backend API
import './ShortenerForm.css';

function ShortenerForm({ setResult }) {
  const [url, setUrl] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [validity, setValidity] = useState('');

  const handleSubmit = async () => {
    try {
      const payload = {
        url: url.trim(),
        shortcode: shortcode.trim() || undefined,
        validity: validity ? parseInt(validity) : undefined,
      };

      const response = await api.post('/shorturls', payload);
      setResult(response.data); // contains shortLink and expiry
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="form-container">
      <input
        type="text"
        placeholder="Enter long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        name="url"
      />
      <input
        type="number"
        placeholder="Enter validity in minutes (optional)"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
        name="validity"
      />
      <input
        type="text"
        placeholder="Enter shortcode (optional)"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
        name="shortcode"
      />
      <button onClick={handleSubmit}>Generate Short URL</button>
    </div>
  );
}

export default ShortenerForm;
