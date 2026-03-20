import { useState, useRef } from 'react'

export default function LoginScreen({ onLogin }) {
  const [role, setRole]       = useState('student')
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [pass, setPass]       = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const cardRef = useRef(null)

  const getInitials = (n) => {
    if (!n) return '?'
    const parts = n.split(' ')
    if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase()
    return n.slice(0, 2).toUpperCase()
  }

  const handleLogin = () => {
    if (!name || !email || !pass) {
      cardRef.current.classList.remove('animate-shake')
      void cardRef.current.offsetWidth
      cardRef.current.classList.add('animate-shake')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin({
        id: Math.floor(Math.random() * 1000),
        name: name,
        email: email,
        role,
        av: getInitials(name),
        color: role === 'teacher' ? '#f59e0b' : '#6366f1',
        verified: role === 'teacher',
      })
    }, 1200)
  }

  const onKey = (e) => { if (e.key === 'Enter') handleLogin() }

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'var(--bg-primary)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px 20px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Dynamic Background Elements */}
      <div style={{ 
        position:'fixed', top:-120, right:-80, width:400, height:400, borderRadius:'50%', 
        background:'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', 
        pointerEvents:'none' 
      }} />
      <div style={{ 
        position:'fixed', bottom:-100, left:-100, width:350, height:350, borderRadius:'50%', 
        background:'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)', 
        pointerEvents:'none' 
      }} />
      
      {/* Grid Overlay */}
      <div style={{
        position:'fixed', top:0, left:0, right:0, bottom:0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents:'none', zIndex: 1
      }} />

      {/* Logo Area */}
      <div style={{ textAlign:'center', marginBottom:40, position:'relative', zIndex:2 }} className="animate-fadeSlideUp">
        <div 
          className="animate-float"
          style={{
            width:80, height:80, borderRadius:24,
            background:'var(--accent-gradient)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:36, margin:'0 auto 20px',
            boxShadow:'0 20px 50px rgba(99,102,241,0.3)',
            position:'relative'
          }}
        >
          📚
        </div>
        <h1 style={{ 
          fontSize:32, fontWeight:900, letterSpacing:'-1.5px', margin:0, 
          color: '#fff',
        }}>
          StudyHive
        </h1>
        <p style={{ 
          color:'var(--accent-cyan)', fontSize:11, marginTop:8, fontWeight:700, 
          letterSpacing:'1.5px', textTransform:'uppercase', opacity:0.7 
        }}>
          Identity Access Portal
        </p>
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        className="animate-fadeSlideUp glass"
        style={{
          width:'100%', maxWidth:400,
          borderRadius:28, padding:'32px',
          boxShadow:'0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px var(--border-bright)',
          animationDelay:'0.1s',
          position:'relative', zIndex:2
        }}
      >
        {/* Role toggle */}
        <div style={{
          display:'flex', background:'rgba(0,0,0,0.3)',
          borderRadius:16, padding:5, gap:5, marginBottom:24,
          border:'1px solid var(--border-subtle)',
        }}>
          {['student','teacher'].map((r) => (
            <button key={r} onClick={() => setRole(r)} style={{
              flex:1, padding:'12px 0', borderRadius:12, border:'none', cursor:'pointer',
              background: role===r ? 'var(--accent-gradient)' : 'transparent',
              color: role===r ? '#fff' : 'var(--text-secondary)',
              fontWeight:700, fontSize:13, transition:'0.3s',
              textTransform:'capitalize'
            }}>
              {r}
            </button>
          ))}
        </div>

        <div style={{ marginBottom:16 }}>
          <input
            type="text" value={name} onChange={e=>setName(e.target.value)} onKeyDown={onKey}
            placeholder="FULL NAME"
            style={{
              width:'100%', padding:'16px 20px', borderRadius:14,
              background:'rgba(255,255,255,0.03)', border:'1px solid var(--border-subtle)',
              color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box',
              transition:'all 0.3s', fontWeight:600
            }}
          />
        </div>

        <div style={{ marginBottom:16 }}>
          <input
            type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={onKey}
            placeholder="COLLEGE EMAIL"
            style={{
              width:'100%', padding:'16px 20px', borderRadius:14,
              background:'rgba(255,255,255,0.03)', border:'1px solid var(--border-subtle)',
              color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box',
              transition:'all 0.3s', fontWeight:600
            }}
          />
        </div>

        <div style={{ marginBottom:28 }}>
          <div style={{ position:'relative' }}>
            <input
              type={showPass ? 'text' : 'password'} value={pass}
              onChange={e=>setPass(e.target.value)} onKeyDown={onKey}
              placeholder="ACCESS KEY"
              style={{
                width:'100%', padding:'16px 50px 16px 20px', borderRadius:14,
                background:'rgba(255,255,255,0.03)', border:'1px solid var(--border-subtle)',
                color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box',
                transition:'all 0.3s', fontWeight:600
              }}
            />
            <button onClick={()=>setShowPass(!showPass)} style={{
              position:'absolute', right:16, top:'50%', transform:'translateY(-50%)',
              background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)', fontSize:18,
            }}>
              {showPass ? '🔐' : '🔑'}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="btn-neon"
          style={{
            width:'100%', padding:'18px', borderRadius:16, fontSize:15,
            display:'flex', alignItems:'center', justifyContent:'center', gap:12
          }}
        >
          {loading ? (
            <>
              <div style={{ 
                width:18, height:18, border:'2px solid rgba(255,255,255,0.3)', 
                borderTopColor:'#fff', borderRadius:'50%', animation:'spin-slow 0.8s linear infinite' 
              }} />
              AUTHENTICATING...
            </>
          ) : (
            <>AUTHORIZE ACCESS</>
          )}
        </button>

      </div>

      <p style={{ color:'var(--text-muted)', fontSize:10, marginTop:40, textAlign:'center', letterSpacing:'1px', fontWeight:600, textTransform:'uppercase', position:'relative', zIndex:2 }}>
        SECURE PROTOCOL v2.0 • END-TO-END ENCRYPTED
      </p>
    </div>
  )
}

