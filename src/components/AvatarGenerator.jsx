import React, { useState } from 'react';
import './AvatarGenerator.css';

function AvatarGenerator() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);

  const generateAvatar = async () => {
    if (!prompt) {
      setError('Please enter a prompt');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Replace with your actual API endpoint and key
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
          prompt: `high quality avatar of ${prompt}, professional headshot style, clean background`,
          n: 1,
          size: '512x512'
        })
      });

      const data = await response.json();
      if (data.data && data.data[0].url) {
        setAvatar(data.data[0].url);
      } else {
        throw new Error('Failed to generate avatar');
      }
    } catch (err) {
      setError('Error generating avatar. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="avatar-generator">
      <div className="input-section">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your avatar (e.g., 'professional woman with short hair')"
          className="prompt-input"
        />
        <button 
          onClick={generateAvatar}
          disabled={loading}
          className="generate-button"
        >
          {loading ? 'Generating...' : 'Generate Avatar'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="result-section">
        {loading && <div className="loading">Generating your avatar...</div>}
        {avatar && (
          <div className="avatar-result">
            <img src={avatar} alt="Generated avatar" />
            <button 
              onClick={() => window.open(avatar, '_blank')}
              className="download-button"
            >
              Download Avatar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AvatarGenerator;
