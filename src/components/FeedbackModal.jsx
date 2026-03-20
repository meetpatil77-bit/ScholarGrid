import { useState } from 'react'

export default function FeedbackModal({ isOpen, onClose, user }) {
  const [type, setType] = useState('bug')
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = () => {
    if (!text.trim()) return
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setText('')
      onClose()
    }, 2000)
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 2000, padding: 20,
    }} onClick={onClose}>
      <div 
        className="animate-scaleIn"
        style={{
          width: '100%', maxWidth: 400,
          background: 'var(--bg-card)', borderRadius: 24,
          border: '1px solid var(--border-accent)',
          padding: 24, position: 'relative',
          boxShadow: '0 0 50px rgba(139, 92, 246, 0.2)',
        }} 
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'none', border: 'none', color: 'var(--text-muted)',
            fontSize: 20, cursor: 'pointer',
          }}
        >×</button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🚀</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Thank You!</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Your feedback helps us build a better StudyHive.</p>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>App Feedback</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
              Have a suggestion or found a bug? Let us know!
            </p>

            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              {['bug', 'feature', 'other'].map(t => (
                <button 
                  key={t}
                  onClick={() => setType(t)}
                  style={{
                    flex: 1, padding: '10px 0', borderRadius: 12,
                    border: '1px solid ' + (type === t ? 'var(--accent-primary)' : 'var(--border-subtle)'),
                    background: type === t ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                    color: type === t ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            <textarea 
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Tell us what's on your mind..."
              style={{
                width: '100%', height: 120, borderRadius: 16,
                background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)',
                color: '#fff', padding: 16, fontSize: 14, outline: 'none',
                resize: 'none', marginBottom: 20,
              }}
            />

            <button 
              className="btn-neon"
              onClick={handleSubmit}
              style={{ width: '100%' }}
            >
              Submit Feedback
            </button>
          </>
        )}
      </div>
    </div>
  )
}
