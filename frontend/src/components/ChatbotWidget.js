import React, {useState} from 'react';
import axios from 'axios';

export default function ChatbotWidget(){
  const [messages, setMessages] = useState([{from:'bot', text:'Hi! I am the Smart Helpdesk bot. Ask a question or say "create ticket".'}]);
  const [input, setInput] = useState('');

  async function send(){
    if(!input) return;
    const userMsg = {from:'user', text: input};
    setMessages(m=>[...m, userMsg]);
    // For demo, if message contains 'ticket' call backend create ticket endpoint
    if (input.toLowerCase().includes('ticket') || input.toLowerCase().includes('create')){
      try{
        const resp = await axios.post('/api/tickets', { title: 'Ticket from chatbot', description: input, creatorUsername: 'chatbot-user@example.com' });
        setMessages(m=>[...m, {from:'bot', text: 'Created ticket — id: ' + resp.data._id}]);
      }catch(e){
        setMessages(m=>[...m, {from:'bot', text: 'Error creating ticket'}]);
      }
    } else {
      // otherwise fallback reply
      setMessages(m=>[...m, {from:'bot', text: 'I can create tickets and answer FAQs. Try saying "create ticket" or ask a question.'}]);
    }
    setInput('');
  }

  return (
    <div style={{border:'1px solid #ddd', borderRadius:8, padding:12}}>
      <div style={{height:300, overflowY:'auto', background:'#fafafa', padding:8}}>
        {messages.map((m,i)=>(<div key={i} style={{marginBottom:8}}><strong>{m.from}:</strong> {m.text}</div>))}
      </div>
      <div style={{marginTop:8, display:'flex', gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} style={{flex:1, padding:8}} placeholder='Type message...' />
        <button onClick={send} style={{padding:'8px 12px'}}>Send</button>
      </div>
      <div style={{fontSize:12, color:'#666', marginTop:6}}>Demo chatbot — connect Dialogflow webhook for NLP.</div>
    </div>
  );
}
