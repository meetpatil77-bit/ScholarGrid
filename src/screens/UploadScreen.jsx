import { useState } from 'react'
import { formatTime } from '../utils/helpers'

const FILE_TYPES = ['PDF', 'PPT', 'DOC', 'IMG']

export default function UploadScreen({ currentUser, onNoteAdded }) {
  const [ftype,   setFtype]   = useState('PDF')
  const [title,   setTitle]   = useState('')
  const [subject, setSubject] = useState('')
  const [desc,    setDesc]    = useState('')
  const [file,    setFile]    = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress,setProgress]= useState(0)
  const [done,    setDone]    = useState(false)
  const [errors,  setErrors]  = useState({})

  const validate = () => {
    const e = {}
    if (!title.trim())   e.title   = 'Title is required'
    if (!subject.trim()) e.subject = 'Subject code is required'
    return e
  }

  const handleUpload = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setLoading(true)
    setProgress(0)

    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(iv); return 100 }
        return Math.min(p + 11, 100)
      })
    }, 140)

    setTimeout(() => {
      setLoading(false)
      onNoteAdded({
        id: Date.now(),
        title: title.trim(),
        subject: subject.trim().toUpperCase(),
        desc: desc.trim() || 'Uploaded notes',
        uid: currentUser.id,
        date: 'Mar 13, 2026',
        ftype,
        dl: 0,
        ratings: [],
        myRating: 0,
        comments: [],
      })
      setDone(true)
    }, 1600)
  }

  if (done) {
    return (
      <div style={{
        flex:1, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        padding:'40px 32px', textAlign:'center', background:'var(--bg-primary)',
      }}>
        <div style={{ fontSize:80, marginBottom:20 }} className="animate-bounce">🎉</div>
        <h2 style={{ fontSize:26, fontWeight:950, marginBottom:12, letterSpacing:'-0.5px', color:'#fff' }}>Notes Uploaded!</h2>
        <p style={{ color:'var(--text-secondary)', fontSize:14, lineHeight:1.7, marginBottom:32, maxWidth:280 }}>
          Your notes are live! Classmates can now view, download, and rate them.
        </p>
        <button className="btn-neon" onClick={() => { setDone(false); setTitle(''); setSubject(''); setDesc(''); setFile(null); setProgress(0) }} style={{
          padding:'15px 36px', borderRadius:14, 
          fontSize:16, fontWeight:700, marginBottom:14,
        }}>Upload Another</button>
      </div>
    )
  }

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background:'var(--bg-primary)' }}>
      <div className="glass" style={{ borderBottom:'1px solid var(--border-subtle)', padding:'20px 16px', flexShrink:0 }}>
        <h2 style={{ fontSize:24, fontWeight:950, letterSpacing:'-0.5px', margin:0, color:'#fff' }}>Upload Notes</h2>
        <p style={{ color:'var(--accent-cyan)', fontSize:11, fontWeight:800, marginTop:4, letterSpacing:1 }}>SHARE YOUR INTELLIGENCE</p>
      </div>

      <div className="scroll-y" style={{ flex:1, padding:'16px 16px 24px' }}>
        {/* Drop zone */}
        <div
          onClick={() => document.getElementById('fileIn').click()}
          style={{
            border:'2px dashed var(--border-subtle)', borderRadius:20, padding:'32px 20px',
            textAlign:'center', marginBottom:24, background:'var(--bg-card)', cursor:'pointer',
            transition:'all 0.3s',
          }}
          onMouseEnter={e => {e.currentTarget.style.borderColor='var(--accent-primary)'; e.currentTarget.style.background='var(--bg-card-hover)'}}
          onMouseLeave={e => {e.currentTarget.style.borderColor='var(--border-subtle)'; e.currentTarget.style.background='var(--bg-card)'}}
        >
          <input id="fileIn" type="file" style={{ display:'none' }} onChange={e => setFile(e.target.files[0])} />
          <div style={{ fontSize:40, marginBottom:10 }}>{file ? '📄' : '📤'}</div>
          <p style={{ color: file ? 'var(--accent-primary)' : 'var(--text-secondary)', fontSize:14, fontWeight: 700, margin:0 }}>
            {file ? file.name : 'Selection Repository'}
          </p>
          <p style={{ color:'var(--text-muted)', fontSize:12, marginTop:6, fontWeight:600 }}>PDF · PPT · DOC · IMAGES</p>
        </div>

        {/* File type selector */}
        <div style={{ marginBottom:20 }}>
          <label style={{ color:'var(--text-muted)', fontSize:10, fontWeight:800, letterSpacing:'1px', display:'block', marginBottom:10 }}>CLASSIFICATION</label>
          <div style={{ display:'flex', gap:8 }}>
            {FILE_TYPES.map(t => (
              <button key={t} onClick={() => setFtype(t)} style={{
                flex:1, padding:'12px 0', borderRadius:12, border: ftype===t ? 'none' : '1px solid var(--border-subtle)',
                cursor:'pointer', fontSize:11, fontWeight: 800,
                background: ftype===t ? 'var(--accent-gradient)' : 'var(--bg-card)',
                color: ftype===t ? '#fff' : 'var(--text-secondary)',
                transition:'all 0.3s',
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom:16 }}>
          <label style={{ color:'var(--text-muted)', fontSize:10, fontWeight:800, letterSpacing:'1px', display:'block', marginBottom:8 }}>DESIGNATION *</label>
          <input
            value={title} onChange={e => { setTitle(e.target.value); setErrors(prev=>({...prev,title:''})) }}
            placeholder="e.g. Data Structures – Part 1"
            style={{
              width:'100%', padding:'16px 18px', borderRadius:14,
              background:'var(--bg-card)', border:`1px solid ${errors.title ? '#ef4444' : 'var(--border-subtle)'}`,
              color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box',
              fontWeight:600
            }}
          />
          {errors.title && <p style={{ color:'#ef4444', fontSize:12, marginTop:4 }}>{errors.title}</p>}
        </div>

        {/* Subject */}
        <div style={{ marginBottom:16 }}>
          <label style={{ color:'var(--text-muted)', fontSize:10, fontWeight:800, letterSpacing:'1px', display:'block', marginBottom:8 }}>SUBJECT CODE *</label>
          <input
            value={subject} onChange={e => { setSubject(e.target.value); setErrors(prev=>({...prev,subject:''})) }}
            placeholder="e.g. CS301"
            style={{
              width:'100%', padding:'16px 18px', borderRadius:14,
              background:'var(--bg-card)', border:`1px solid ${errors.subject ? '#ef4444' : 'var(--border-subtle)'}`,
              color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box',
              fontWeight:600
            }}
          />
          {errors.subject && <p style={{ color:'#ef4444', fontSize:12, marginTop:4 }}>{errors.subject}</p>}
        </div>

        {/* Description */}
        <div style={{ marginBottom:28 }}>
          <label style={{ color:'var(--text-muted)', fontSize:10, fontWeight:800, letterSpacing:'1px', display:'block', marginBottom:8 }}>INTEL DESCRIPTION</label>
          <textarea
            value={desc} onChange={e => setDesc(e.target.value)}
            placeholder="Describe the contents of this resource..."
            rows={4}
            style={{
              width:'100%', padding:'16px 18px', borderRadius:14,
              background:'var(--bg-card)', border:'1px solid var(--border-subtle)',
              color:'#fff', fontSize:14, outline:'none', resize:'none', boxSizing:'border-box',
              fontWeight:600, lineHeight:1.5
            }}
          />
        </div>

        {/* Progress */}
        {loading && (
          <div style={{ marginBottom:20 }}>
            <div style={{ background:'var(--bg-card)', borderRadius:10, height:6, overflow:'hidden' }}>
              <div style={{
                width:`${progress}%`, height:'100%',
                background:'var(--accent-gradient)',
                borderRadius:10, transition:'width 0.2s',
              }} />
            </div>
            <p style={{ color:'var(--text-muted)', fontSize:11, textAlign:'center', marginTop:10, fontWeight:700 }}>SYNCHRONIZING… {progress}%</p>
          </div>
        )}

        {/* Submit */}
        <button onClick={handleUpload} disabled={loading} className="btn-neon" style={{
          width:'100%', padding:'18px', borderRadius:16,
          fontSize:15, fontWeight:800,
          background: loading ? 'var(--bg-card)' : 'var(--accent-gradient)',
        }}>
          {loading ? 'PROCESSING...' : 'INITIALIZE UPLOAD'}
        </button>
      </div>
    </div>
  )
}
