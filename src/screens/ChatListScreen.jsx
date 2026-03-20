import { useState } from 'react'
import { CHATS } from '../data/mockData'

export default function ChatListScreen({ onOpen }) {
  const [query, setQuery] = useState('')
  const filtered = CHATS.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.code.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background:'var(--bg-primary)' }}>
      {/* Sticky header */}
      <div className="glass" style={{
        borderBottom:'1px solid var(--border-subtle)',
        padding:'18px 16px 14px', flexShrink:0,
      }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
          <div>
            <h2 style={{ fontSize:24, fontWeight:950, letterSpacing:'-0.5px', margin:0, color:'#fff' }}>📡 Channels</h2>
            <p style={{ color:'var(--text-muted)', fontSize:12, marginTop:4, fontWeight:700 }}>CE SEM 6 · {CHATS.length} SUBJECTS</p>
          </div>
          <button style={{
            background:'var(--bg-card)', border:'1px solid var(--border-subtle)',
            borderRadius:14, width:40, height:40, cursor:'pointer',
            fontSize:18, color:'var(--accent-primary)',
            transition:'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background='var(--bg-card-hover)'; e.currentTarget.style.borderColor='var(--accent-primary)' }}
            onMouseLeave={e => { e.currentTarget.style.background='var(--bg-card)'; e.currentTarget.style.borderColor='var(--border-subtle)' }}
          >＋</button>
        </div>
        {/* Search */}
        <div style={{
          background:'var(--bg-card)', borderRadius:14,
          display:'flex', alignItems:'center', gap:10, padding:'11px 16px',
          border:'1px solid var(--border-subtle)',
          transition:'border-color 0.2s',
        }}>
          <span style={{ color:'var(--text-muted)', fontSize:14 }}>🔍</span>
          <input
            placeholder="Search channels…"
            value={query} onChange={e=>setQuery(e.target.value)}
            style={{ background:'none', border:'none', outline:'none', color:'#fff', fontSize:14, flex:1, fontWeight:600 }}
          />
        </div>
      </div>

      {/* List */}
      <div className="scroll-y" style={{ flex:1, padding:'10px 12px 24px' }}>
        {filtered.map((chat, index) => (
          <div
            key={chat.id}
            onClick={() => onOpen(chat)}
            className="animate-fadeSlideUp"
            style={{
              display:'flex', alignItems:'center', gap:14,
              padding:'14px 16px', marginBottom:8, borderRadius:18, cursor:'pointer',
              background: chat.unread > 0 ? 'rgba(99,102,241,0.05)' : 'var(--bg-card)',
              border: chat.unread > 0 ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
              transition:'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              animationDelay: `${index * 0.04}s`,
            }}
            onMouseEnter={e => { e.currentTarget.style.background='var(--bg-card-hover)'; e.currentTarget.style.transform='translateX(4px)' }}
            onMouseLeave={e => { e.currentTarget.style.background=chat.unread>0?'rgba(99,102,241,0.05)':'var(--bg-card)'; e.currentTarget.style.transform='translateX(0)' }}
          >
            {/* Icon */}
            <div style={{ position:'relative' }}>
              <div style={{
                width:52, height:52, borderRadius:16, fontSize:24,
                background:`linear-gradient(135deg,${chat.color}22,${chat.color}08)`,
                border:`1px solid ${chat.color}30`,
                display:'flex', alignItems:'center', justifyContent:'center',
                transition:'transform 0.2s',
              }}>{chat.icon}</div>
              {chat.unread > 0 && (
                <div style={{
                  position:'absolute', top:-5, right:-5,
                  background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  borderRadius:10, minWidth:20, height:20, fontSize:10,
                  fontWeight:700, color:'#fff',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  padding:'0 5px', boxShadow:'0 2px 10px rgba(99,102,241,0.5)',
                  border:'2px solid #0a0e17',
                }}>{chat.unread}</div>
              )}
            </div>

            {/* Text */}
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontWeight:700, fontSize:15, color:'#f1f5f9' }}>{chat.name}</span>
                  <span style={{
                    color:chat.color, fontSize:10, fontWeight:700,
                    background:`${chat.color}15`, padding:'2px 8px', borderRadius:6,
                    border:`1px solid ${chat.color}20`,
                  }}>{chat.code}</span>
                </div>
                <span style={{ color:'#64748b', fontSize:11, flexShrink:0 }}>{chat.time}</span>
              </div>
              <p style={{ color:'#94a3b8', fontSize:13, margin:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', letterSpacing:'-0.1px' }}>
                {chat.lastMsg}
              </p>
              <span style={{ color:'#475569', fontSize:11, marginTop:4, display:'block' }}>
                👥 {chat.members} members
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
