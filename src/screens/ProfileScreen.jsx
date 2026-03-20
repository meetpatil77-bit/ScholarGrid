import { useState } from 'react'
import Avatar from '../components/Avatar'
import FeedbackModal from '../components/FeedbackModal'
import { avg, fileIcon } from '../utils/helpers'

const SETTINGS = [
  { icon: '🔔', label: 'Notifications', right: '' },
  { icon: '🔒', label: 'Privacy & Security', right: '' },
  { icon: '🌙', label: 'Dark Mode', right: 'On' },
  { icon: '🏫', label: 'My Class', right: 'CE Sem 6' },
  { icon: '❓', label: 'Help & Support', right: '' },
]

export default function ProfileScreen({ currentUser, notes, onLogout }) {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const myNotes = notes.filter(n => n.uid === currentUser.id)
  const totalDl = myNotes.reduce((a, n) => a + n.dl, 0)
  const avgRatings = myNotes.flatMap(n => n.ratings)
  const overallAvg = avg(avgRatings)

  const handleSettingClick = (label) => {
    if (label === 'Help & Support') {
      setIsFeedbackOpen(true)
    }
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="scroll-y" style={{ flex: 1 }}>

        {/* Hero banner - More futuristic */}
        <div style={{
          background: 'var(--accent-gradient)',
          padding: '48px 24px 60px', textAlign: 'center', position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Ambient glow in banner */}
          <div style={{
            position: 'absolute', top: '-20%', left: '-10%', width: '150%', height: '150%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)',
            pointerEvents: 'none'
          }} />

          <button onClick={onLogout} style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12, padding: '8px 14px', cursor: 'pointer', color: '#fff',
            fontSize: 12, fontWeight: 700, backdropFilter: 'blur(10px)', zIndex: 10
          }}>SIGN OUT</button>

          <div
            className="animate-float"
            style={{
              width: 88, height: 88, borderRadius: 24,
              background: 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, fontWeight: 900, margin: '0 auto 18px',
              border: '1px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(20px)', position: 'relative', zIndex: 5,
              textShadow: '0 0 10px rgba(255,255,255,0.5)'
            }}
          >
            {currentUser.av}
          </div>

          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 4, position: 'relative', zIndex: 5, letterSpacing: '-0.5px', color: '#fff' }}>
            {currentUser.name}
          </h2>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 500, marginBottom: 16, position: 'relative', zIndex: 5 }}>
            {currentUser.email}
          </div>
          <div style={{ position: 'relative', zIndex: 5 }}>
            <span className="glass" style={{
              color: '#fff', padding: '6px 18px', borderRadius: 30, fontSize: 11, fontWeight: 800,
              letterSpacing: 1, border: '1px solid rgba(255,255,255,0.2)', textTransform: 'uppercase'
            }}>
              {currentUser.role === 'teacher' ? '👨‍🏫 Verified Educator' : '🎓 Engineering Student'}
            </span>
          </div>
        </div>

        {/* Stats (overlapping banner) */}
        <div style={{ display: 'flex', gap: 12, padding: '0 16px', marginTop: -32, position: 'relative', zIndex: 10 }}>
          {[['📄', myNotes.length, 'Notes'], ['⬇️', totalDl, 'Downloads'], ['⭐', overallAvg, 'Rating']].map(([ic, v, lb]) => (
            <div key={lb} className="card-futuristic" style={{
              flex: 1, padding: '16px 8px', textAlign: 'center',
              boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
              borderBottom: lb === 'Rating' ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)'
            }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{ic}</div>
              <div style={{ fontWeight: 900, fontSize: 22, color: 'var(--text-primary)' }}>{v}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{lb}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: '24px 16px 32px' }}>

          {/* My uploads */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, letterSpacing: '-0.3px', color: 'var(--text-primary)' }}>MY COLLABORATIONS</h3>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-primary)' }}>VIEW ALL</span>
          </div>

          {myNotes.length === 0
            ? (
              <div className="glass" style={{ borderRadius: 20, padding: 32, textAlign: 'center', border: '1px dashed var(--border-subtle)' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📂</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>No uploads yet. Start sharing!</p>
              </div>
            )
            : myNotes.map(n => (
              <div key={n.id} className="card-futuristic" style={{
                padding: '14px', marginBottom: 12,
                display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
              }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 12, background: 'rgba(139, 92, 246, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24
                }}>
                  {fileIcon(n.ftype)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-primary)' }}>{n.title}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginTop: 4, display: 'flex', gap: 10 }}>
                    <span>⭐ {avg(n.ratings)}</span>
                    <span>⬇️ {n.dl}</span>
                    <span>💬 {n.comments.length}</span>
                  </div>
                </div>
                <span style={{ color: 'var(--accent-primary)', fontSize: 20, fontWeight: 900 }}>›</span>
              </div>
            ))
          }

          {/* Settings */}
          <h3 style={{ fontSize: 16, fontWeight: 800, marginTop: 32, marginBottom: 16, letterSpacing: '-0.3px', color: 'var(--text-primary)' }}>PREFERENCES</h3>
          <div className="glass" style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
            {SETTINGS.map(({ icon, label, right }, idx) => (
              <div
                key={label}
                onClick={() => handleSettingClick(label)}
                style={{
                  padding: '16px 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
                  borderBottom: idx === SETTINGS.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 22 }}>{icon}</span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {right && <span style={{ color: 'var(--accent-cyan)', fontSize: 13, fontWeight: 700 }}>{right}</span>}
                  <span style={{ color: 'var(--text-muted)', fontSize: 18 }}>›</span>
                </div>
              </div>
            ))}
          </div>

          <button
            className="btn-neon"
            onClick={() => setIsFeedbackOpen(true)}
            style={{
              width: '100%', marginTop: 24, background: 'var(--bg-card)',
              border: '1px solid var(--border-accent)', color: 'var(--accent-primary)',
              textTransform: 'none', letterSpacing: '0'
            }}
          >
            📢 Send App Feedback
          </button>

          <p style={{ color: 'var(--text-muted)', fontSize: 11, textAlign: 'center', marginTop: 32, fontWeight: 600, letterSpacing: 1 }}>
            STUDYHIVE PROTOCOL V1.2.0 • BUILT FOR STUDENTS
          </p>
        </div>
      </div>

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        user={currentUser}
      />
    </div>
  )
}

