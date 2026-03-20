import { useState, useEffect, useRef } from 'react'
import Avatar from '../components/Avatar'
import { MESSAGES, USERS } from '../data/mockData'
import { getUser, formatTime, AUTO_REPLIES } from '../utils/helpers'

export default function ChatRoom({ chat, currentUser, onBack }) {
  const [msgs, setMsgs] = useState(() =>
    JSON.parse(JSON.stringify(MESSAGES[chat.id] || []))
  )
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' })
  }, [msgs])

  const send = () => {
    const text = input.trim()
    if (!text) return
    const newMsg = { id: Date.now(), sid: currentUser.id, text, time: formatTime() }
    setMsgs(prev => [...prev, newMsg])
    setInput('')
    // Simulate reply after 1.4s
    const others = USERS.filter(u => u.id !== currentUser.id)
    const replier = others[Math.floor(Math.random() * others.length)]
    setTimeout(() => {
      setMsgs(prev => [...prev, {
        id: Date.now() + 1, sid: replier.id,
        text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
        time: formatTime(),
      }])
    }, 1400)
  }

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Header */}
      <div className="glass" style={{
        borderBottom:`1px solid ${chat.color}20`,
        padding:'12px 16px', display:'flex', alignItems:'center', gap:12, flexShrink:0,
      }}>
        <button onClick={onBack} style={{ background:'none', border:'none', color:'#a78bfa', fontSize:24, cursor:'pointer', padding:0, lineHeight:1, transition:'transform 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.transform='translateX(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform='translateX(0)'}
        >←</button>
        <div style={{
          width:44, height:44, borderRadius:14, fontSize:20,
          background:`linear-gradient(135deg,${chat.color}30,${chat.color}10)`,
          border:`1px solid ${chat.color}35`,
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>{chat.icon}</div>
        <div style={{ flex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontWeight:700, fontSize:16, color:'#f1f5f9' }}>{chat.name}</span>
            <span style={{
              color:chat.color, fontSize:9, fontWeight:700,
              background:`${chat.color}15`, padding:'2px 7px', borderRadius:5,
              border:`1px solid ${chat.color}20`,
            }}>{chat.code}</span>
          </div>
          <div style={{ color:'#64748b', fontSize:12, marginTop:1 }}>👥 {chat.members} members</div>
        </div>
        <span style={{ fontSize:18, cursor:'pointer', filter:'grayscale(30%)', transition:'filter 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.filter='grayscale(0%)'}
          onMouseLeave={e => e.currentTarget.style.filter='grayscale(30%)'}
        >📌</span>
      </div>

      {/* Messages */}
      <div className="scroll-y" style={{ flex:1, padding:'14px 12px 8px', background:'linear-gradient(180deg, #0a0e17, #0d1220)' }}>
        <div style={{ textAlign:'center', marginBottom:18 }}>
          <span style={{
            background:'rgba(21,29,46,0.8)', color:'#64748b', fontSize:12,
            padding:'5px 16px', borderRadius:12, border:'1px solid rgba(51,65,85,0.25)',
            fontWeight:500,
          }}>Today</span>
        </div>

        {msgs.map((msg) => {
          const mine   = msg.sid === currentUser.id
          const sender = getUser(msg.sid, currentUser)
          return (
            <div key={msg.id} className="animate-fadeSlideUp" style={{
              display:'flex', justifyContent: mine ? 'flex-end' : 'flex-start',
              marginBottom:10, gap:8, alignItems:'flex-end',
            }}>
              {!mine && <Avatar user={sender} size={28} />}
              <div style={{
                maxWidth:'75%',
                background: mine
                  ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                  : 'rgba(21,29,46,0.85)',
                borderRadius: mine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                padding:'11px 15px',
                boxShadow: mine
                  ? '0 4px 20px rgba(99,102,241,0.2)'
                  : '0 2px 10px rgba(0,0,0,0.15)',
                border: mine ? 'none' : '1px solid rgba(51,65,85,0.25)',
              }}>
                {!mine && (
                  <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:3 }}>
                    <span style={{ color: sender?.color || '#6366f1', fontSize:11, fontWeight:700 }}>
                      {sender?.name}
                    </span>
                    {sender?.role === 'teacher' && (
                      <span style={{
                        fontSize:8, fontWeight:800, color:'#14b8a6',
                        background:'rgba(20,184,166,0.15)', padding:'1px 5px',
                        borderRadius:4, letterSpacing:'0.3px',
                      }}>✓ VERIFIED</span>
                    )}
                  </div>
                )}
                <p style={{ fontSize:14, margin:0, lineHeight:1.5, wordBreak:'break-word', color:'#f1f5f9' }}>{msg.text}</p>
                <div style={{ display:'flex', justifyContent:'flex-end', alignItems:'center', gap:4, marginTop:4 }}>
                  <span style={{ color:'rgba(255,255,255,0.4)', fontSize:10 }}>{msg.time}</span>
                  {mine && <span style={{ color:'#93c5fd', fontSize:11 }}>✓✓</span>}
                </div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="glass" style={{
        borderTop:'1px solid rgba(51,65,85,0.25)',
        padding:'10px 12px', display:'flex', gap:10, alignItems:'center', flexShrink:0,
      }}>
        <button style={{ background:'none', border:'none', fontSize:22, cursor:'pointer', filter:'grayscale(30%)', transition:'filter 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.filter='grayscale(0%)'}
          onMouseLeave={e => e.currentTarget.style.filter='grayscale(30%)'}
        >📎</button>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder={`Message #${chat.name}…`}
          style={{
            flex:1, background:'rgba(15,23,42,0.6)',
            border:'1px solid rgba(51,65,85,0.3)', borderRadius:22,
            padding:'12px 18px', color:'#f1f5f9', fontSize:14, outline:'none',
            transition:'border-color 0.2s',
          }}
        />
        <button onClick={send} className="btn-primary" style={{
          background:'linear-gradient(135deg, #6366f1, #8b5cf6)',
          border:'none', borderRadius:'50%', width:44, height:44, flexShrink:0,
          display:'flex', alignItems:'center', justifyContent:'center',
          cursor:'pointer', fontSize:18, color:'#fff',
          boxShadow:'0 4px 16px rgba(99,102,241,0.4)',
        }}>➤</button>
      </div>
    </div>
  )
}
