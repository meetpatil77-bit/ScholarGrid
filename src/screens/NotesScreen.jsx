import { useState } from 'react'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'
import Stars from '../components/Stars'
import { avg, getUser } from '../utils/helpers'

const TABS = [
  ['top',     '⭐ TOP RATED'],
  ['recent',  '🕒 RECENT'],
  ['popular', '🔥 POPULAR'],
]

export default function NotesScreen({ notes, currentUser, onViewNote }) {
  const [tab, setTab] = useState('top')

  const sorted = [...notes].sort((a, b) => {
    if (tab === 'top')     return parseFloat(avg(b.ratings)) - parseFloat(avg(a.ratings))
    if (tab === 'recent')  return b.id - a.id
    return b.dl - a.dl
  })

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background:'var(--bg-primary)' }}>
      {/* Header */}
      <div className="glass" style={{ borderBottom:'1px solid var(--border-subtle)', padding:'24px 20px 0', flexShrink:0, zIndex:10 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
          <div>
            <h2 style={{ fontSize:32, fontWeight:950, letterSpacing:'-1.5px', margin:0, color:'var(--text-primary)', textShadow:'0 0 20px rgba(139,92,246,0.3)' }}>HUB DATA</h2>
            <p style={{ color:'var(--accent-cyan)', fontSize:12, fontWeight:800, marginTop:4, letterSpacing:1 }}>{notes.length.toString().padStart(2, '0')} RESOURCES ACTIVE</p>
          </div>
          <button style={{ 
            background:'rgba(139,92,246,0.1)', border:'1px solid var(--border-accent)', 
            borderRadius:14, width:44, height:44, display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', fontSize:20, transition:'all 0.3s' 
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow='0 0 15px var(--accent-glow)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow='none'}
          >🔍</button>
        </div>
        <div style={{ display:'flex', gap:8, marginBottom: 8 }}>
          {TABS.map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex:1, padding:'10px 0', border:'none', background: tab===id ? 'rgba(139,92,246,0.15)' : 'transparent',
              cursor:'pointer', borderRadius: '12px 12px 0 0',
              fontSize:10, fontWeight: 900, color: tab===id ? 'var(--accent-primary)' : 'var(--text-muted)',
              borderBottom: tab===id ? '2px solid var(--accent-primary)' : '2px solid transparent',
              transition:'all 0.3s',
              letterSpacing:'1px',
            }}>{label}</button>
          ))}
        </div>
      </div>

      <div className="scroll-y" style={{ flex:1, padding:'20px 16px 40px' }}>
        {sorted.map((note, index) => {
          const uploader = getUser(note.uid, currentUser)
          const r = parseFloat(avg(note.ratings))
          const isTeacher = uploader?.role === 'teacher'
          
          return (
            <div
              key={note.id}
              onClick={() => onViewNote(note)}
              className="card-futuristic animate-fadeSlideUp"
              style={{
                marginBottom:16,
                cursor:'pointer',
                animationDelay: `${index * 0.08}s`,
                borderLeft: r >= 4.5 ? '4px solid var(--accent-primary)' : '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ padding:'18px' }}>
                {/* Title row */}
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, marginBottom:12 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                      <Badge type={note.ftype} />
                      <span style={{ color:'var(--accent-cyan)', fontSize:11, fontWeight:800, letterSpacing:'0.5px' }}>{note.subject}</span>
                    </div>
                    <h3 style={{ fontSize:18, fontWeight:800, margin:0, lineHeight:1.3, color:'var(--text-primary)' }}>{note.title}</h3>
                  </div>
                  <div style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius:14, padding:'10px 14px', textAlign:'center', flexShrink:0,
                    border: '1px solid var(--border-subtle)',
                  }}>
                    <div style={{ color:'var(--accent-primary)', fontSize:20, fontWeight:900, textShadow:'0 0 10px rgba(139,92,246,0.3)' }}>{avg(note.ratings)}</div>
                    <div style={{ color:'var(--text-muted)', fontSize:9, fontWeight:800 }}>RATING</div>
                  </div>
                </div>

                <p style={{ color:'var(--text-secondary)', fontSize:13, margin:'0 0 16px', lineHeight:1.5 }}>{note.desc}</p>

                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', borderTop:'1px solid var(--border-subtle)', paddingTop:12 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <Avatar user={uploader} size={28} />
                    <div>
                      <div style={{ color:'var(--text-primary)', fontSize:12, fontWeight:700 }}>{uploader?.name}</div>
                      <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:2 }}>
                        {isTeacher && <span className="verified-badge" style={{ fontSize:8, padding:'2px 6px' }}>VERIFIED</span>}
                        <span style={{ color:'var(--text-muted)', fontSize:10, fontWeight:600 }}>{note.date}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display:'flex', gap:12 }}>
                    <div style={{ textAlign:'right' }}>
                       <div style={{ color:'var(--text-primary)', fontSize:12, fontWeight:800 }}>⬇ {note.dl}</div>
                       <div style={{ color:'var(--text-secondary)', fontSize:11, fontWeight:700 }}>💬 {note.comments.length}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

