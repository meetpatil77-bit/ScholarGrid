import { useState } from 'react'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'
import Stars from '../components/Stars'
import { avg, getUser, fileIcon } from '../utils/helpers'

export default function NoteDetail({ note: init, currentUser, onBack, onUpdate }) {
  const [note, setNote]       = useState(init)
  const [comment, setComment] = useState('')
  const [myRating, setMyRating] = useState(init.myRating)
  const [downloaded, setDl]   = useState(false)

  const uploader = getUser(note.uid, currentUser)

  const handleRate = (r) => {
    const prev   = myRating
    const newRatings = prev > 0
      ? [...note.ratings.slice(0, -1), r]
      : [...note.ratings, r]
    setMyRating(r)
    const updated = { ...note, ratings: newRatings, myRating: r }
    setNote(updated); onUpdate(updated)
  }

  const handleComment = () => {
    if (!comment.trim()) return
    const updated = {
      ...note,
      comments: [...note.comments, { uid: currentUser.id, text: comment.trim(), time: 'Just now' }],
    }
    setNote(updated); onUpdate(updated); setComment('')
  }

  const handleDownload = () => {
    if (downloaded) return
    setDl(true)
    const updated = { ...note, dl: note.dl + 1 }
    setNote(updated); onUpdate(updated)
    setTimeout(() => setDl(false), 2200)
  }

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background:'var(--bg-primary)' }}>
      {/* Header */}
      <div className="glass" style={{
        padding:'16px 20px', display:'flex', alignItems:'center', gap:12, flexShrink:0,
        zIndex: 10, borderBottom: '1px solid var(--border-subtle)'
      }}>
        <button onClick={onBack} style={{ 
          background:'rgba(255,255,255,0.05)', border:'1px solid var(--border-subtle)', 
          color:'var(--accent-primary)', fontSize:20, cursor:'pointer', 
          width:36, height:36, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center'
        }}>←</button>
        <h3 style={{ fontWeight:800, fontSize:18, margin:0, flex:1, color:'var(--text-primary)' }}>
          RESOURCE HUB
        </h3>
        <button style={{ background:'none', border:'none', fontSize:22, cursor:'pointer' }}>🔖</button>
      </div>

      {/* Scrollable content */}
      <div className="scroll-y" style={{ flex:1, padding:'20px' }}>

        {/* File preview - Enhanced with Cyber Border */}
        <div className="card-futuristic cyber-border" style={{
          padding:'32px 24px', marginBottom:20, textAlign:'center',
          background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, transparent 100%)'
        }}>
          <div className="animate-float" style={{ fontSize:64, marginBottom:16 }}>{fileIcon(note.ftype)}</div>
          <div style={{ marginBottom:12 }}><Badge type={note.ftype} /></div>
          <h2 style={{ fontSize:22, fontWeight:900, margin:'10px 0 6px', lineHeight:1.2, color:'var(--text-primary)' }}>{note.title}</h2>
          <span style={{ color:'var(--accent-cyan)', fontSize:13, fontWeight:800, letterSpacing:1 }}>{note.subject}</span>
          <p style={{ color:'var(--text-secondary)', fontSize:14, marginTop:12, lineHeight:1.6 }}>{note.desc}</p>
        </div>

        {/* Uploader Card */}
        <div className="card-futuristic" style={{
          padding:'16px', marginBottom:20,
          display:'flex', justifyContent:'space-between', alignItems:'center',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ position:'relative' }}>
              <Avatar user={uploader} size={48} />
              {uploader?.role === 'teacher' && (
                <div style={{ 
                  position:'absolute', bottom:-2, right:-2, background:'var(--accent-emerald)',
                  width:16, height:16, borderRadius:'50%', border:'2px solid var(--bg-card)',
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:8
                }}>✓</div>
              )}
            </div>
            <div>
              <div style={{ fontWeight:800, fontSize:15, color:'var(--text-primary)' }}>{uploader?.name}</div>
              <div style={{ color:'var(--text-muted)', fontSize:12, fontWeight:600 }}>
                {uploader?.role === 'teacher' ? 'FACULTY' : 'STUDENT'} · {note.date}
              </div>
            </div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ color:'var(--accent-cyan)', fontSize:24, fontWeight:900, textShadow:'0 0 10px rgba(6, 182, 212, 0.3)' }}>{avg(note.ratings)}</div>
            <div style={{ color:'var(--text-muted)', fontSize:10, fontWeight:700, textTransform:'uppercase' }}>VERDICT</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display:'flex', gap:12, marginBottom:24 }}>
          {[['⬇️', note.dl, 'HITS'], ['💬', note.comments.length, 'INTEL'], ['⭐', note.ratings.length, 'REVIEWS']].map(([ic,v,lb]) => (
            <div key={lb} className="card-futuristic" style={{
              flex:1, padding:'16px 8px', textAlign:'center',
            }}>
              <div style={{ fontSize:20, marginBottom:4 }}>{ic}</div>
              <div style={{ fontWeight:900, fontSize:22, color:'var(--text-primary)' }}>{v}</div>
              <div style={{ color:'var(--text-muted)', fontSize:9, fontWeight:700, letterSpacing:1 }}>{lb}</div>
            </div>
          ))}
        </div>

        {/* Download Action */}
        <button 
          onClick={handleDownload} 
          className="btn-neon"
          style={{
            width:'100%', padding:'20px', fontSize:16, marginBottom:32,
            background: downloaded ? 'var(--accent-emerald)' : 'var(--accent-gradient)',
            boxShadow: downloaded ? '0 0 20px rgba(16, 185, 129, 0.3)' : '0 10px 30px rgba(139, 92, 246, 0.4)',
          }}
        >
          {downloaded ? 'DATA ACQUIRED ✓' : 'ACCESS REPOSITORY ⬇️'}
        </button>

        {/* Review System Section */}
        <div style={{ marginBottom:36 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <h4 style={{ fontWeight:950, fontSize:16, margin:0, letterSpacing:'-0.5px', color:'#fff' }}>PEER EVALUATION</h4>
            <span style={{ fontSize:11, background:'rgba(99,102,241,0.15)', color:'var(--accent-primary)', padding:'4px 10px', borderRadius:20, fontWeight:800, border:'1px solid var(--border-accent)' }}>
              {note.ratings.length} REVIEWS
            </span>
          </div>
          
          <div className="card-futuristic cyber-border" style={{ 
            padding:'36px 24px', textAlign:'center', 
            background: 'linear-gradient(135deg, rgba(30,30,34,0.6) 0%, rgba(10,10,12,0.8) 100%)',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)',
          }}>
            <div style={{ display:'flex', justifyContent:'center', gap:12, marginBottom:18 }}>
              <Stars rating={myRating} size={54} interactive onRate={handleRate} />
            </div>
            {myRating === 0 ? (
              <div>
                <p style={{ color:'var(--accent-cyan)', fontSize:14, margin:'0 0 6px', fontWeight:800, letterSpacing:'1px' }}>
                  AWAITING INPUT
                </p>
                <p style={{ color:'var(--text-muted)', fontSize:12, margin:0, fontWeight:600 }}>
                  Tap a star to submit your repository rating
                </p>
              </div>
            ) : (
              <div>
                <p style={{ color:'var(--accent-emerald)', fontSize:15, margin:'0 0 6px', fontWeight:800, letterSpacing:'1px', textShadow:'0 0 10px rgba(16,185,129,0.3)' }}>
                  EVALUATION LOGGED: {myRating} / 5
                </p>
                <p style={{ color:'var(--text-secondary)', fontSize:12, margin:0, fontWeight:600 }}>
                  Your feedback helps peers find the best intel
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Intel / Comments Section */}
        <div style={{ paddingBottom: 40 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <h4 style={{ fontWeight:900, fontSize:16, margin:0, letterSpacing:'-0.3px' }}>COMMUNICATIONS</h4>
            <span style={{ fontSize:12, color:'var(--accent-cyan)', fontWeight:700 }}>{note.comments.length} MESSAGES</span>
          </div>

          <div className="glass" style={{ borderRadius:24, padding:'20px', border:'1px solid var(--border-subtle)' }}>
            {note.comments.length === 0 ? (
               <p style={{ color:'var(--text-muted)', fontSize:13, textAlign:'center', padding:'20px 0' }}>Silence in the comms. Be the first to speak.</p>
            ) : note.comments.map((c, i) => {
              const cu = getUser(c.uid, currentUser)
              return (
                <div key={i} style={{ display:'flex', gap:12, marginBottom:i === note.comments.length - 1 ? 0 : 20 }}>
                  <Avatar user={cu} size={36} />
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:4 }}>
                      <span style={{ fontWeight:800, fontSize:13, color:'var(--text-primary)' }}>{cu?.name}</span>
                      <span style={{ color:'var(--text-muted)', fontSize:10, fontWeight:700 }}>{c.time}</span>
                    </div>
                    <p style={{ color:'var(--text-secondary)', fontSize:13, margin:0, lineHeight:1.5 }}>{c.text}</p>
                  </div>
                </div>
              )
            })}

            {/* Input - More futuristic */}
            <div style={{ display:'flex', gap:12, marginTop:24, alignItems:'center', position:'relative' }}>
              <div style={{ position:'absolute', top:-12, left:0, right:0, height:1, background:'var(--border-subtle)' }} />
              <input
                value={comment}
                onChange={e => setComment(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleComment()}
                placeholder="TYPE TRANSMISSION..."
                style={{
                  flex:1, background:'rgba(0,0,0,0.3)', border:'1px solid var(--border-subtle)',
                  borderRadius:16, padding:'14px 18px', color:'#fff',
                  fontSize:13, outline:'none', fontWeight:600, letterSpacing:'0.5px'
                }}
              />
              <button onClick={handleComment} style={{
                background:'var(--accent-gradient)',
                border:'none', borderRadius:14, width:48, height:48,
                flexShrink:0, cursor:'pointer', fontSize:20, color:'#fff',
                display:'flex', alignItems:'center', justifyContent:'center',
                boxShadow:'0 5px 15px rgba(139, 92, 246, 0.3)'
              }}>➤</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

