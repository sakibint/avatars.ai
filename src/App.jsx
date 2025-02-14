import React, { useState } from 'react';
import './App.css';
import AvatarGenerator from './components/AvatarGenerator';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="container">
        <AvatarGenerator />
      </main>
    </div>
  );
}

export default App;
