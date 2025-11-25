import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Dashboard(){
  const [tickets, setTickets] = useState([]);
  useEffect(()=>{
    axios.get('/api/tickets').then(r=>setTickets(r.data)).catch(()=>{});
  },[]);
  return (
    <div>
      <h2>Recent Tickets</h2>
      <div>
        {tickets.length===0 && <div>No tickets yet (create one from chatbot)</div>}
        {tickets.map(t=>(
          <div key={t._id} style={{padding:8, border:'1px solid #eee', marginBottom:8}}>
            <div><strong>{t.title}</strong> — {t.priority} — {t.status}</div>
            <div style={{fontSize:13, color:'#555'}}>{t.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
