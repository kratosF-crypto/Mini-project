import React from 'react';
import ChatbotWidget from './components/ChatbotWidget';
import Dashboard from './pages/Dashboard';

function App(){
  return (
    <div style={{fontFamily: 'Arial, sans-serif', padding: 20}}>
      <h1>Smart Helpdesk (Demo)</h1>
      <div style={{display:'flex', gap:40}}>
        <div style={{flex:1}}>
          <Dashboard />
        </div>
        <div style={{width:380}}>
          <ChatbotWidget />
        </div>
      </div>
    </div>
  );
}

export default App;
