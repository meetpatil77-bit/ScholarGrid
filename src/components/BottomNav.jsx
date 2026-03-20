const ALL_TABS = [
  { id: 'chat',    icon: '📡', label: 'HUB' },
  { id: 'notes',   icon: '📄', label: 'DOCS'    },
  { id: 'upload',  icon: '⚡', label: 'UPLOAD', studentOnly: true },
  { id: 'profile', icon: '👤', label: 'USER'  },
]

export default function BottomNav({ active, onChange, userRole }) {
  const TABS = ALL_TABS.filter(t => {
    if (t.studentOnly && userRole === 'teacher') return false
    return true
  })

  return (
    <div style={{ padding: '0 20px 24px', background: 'transparent', position: 'relative', zIndex: 100 }}>
      <nav className="glass" style={{
        display: 'flex',
        padding: '10px 14px',
        borderRadius: 24,
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-bright)',
        boxShadow: 'var(--shadow-lg)',
        justifyContent: 'space-around',
        alignItems: 'center',
        backdropFilter: 'blur(30px)',
      }}>
        {TABS.map((t) => {
          const isActive = t.id === active
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                padding: '10px 12px',
                borderRadius: 18,
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                flex: 1,
              }}
            >
              {isActive && (
                <div className="animate-fadeIn" style={{
                  position: 'absolute', inset: 0, 
                  background: 'rgba(99, 102, 241, 0.08)', 
                  borderRadius: 18, border: '1px solid var(--border-accent)',
                  zIndex: -1
                }} />
              )}
              
              <span style={{
                fontSize: 22,
                filter: isActive ? 'drop-shadow(0 0 10px var(--accent-primary))' : 'grayscale(100%) opacity(0.4)',
                transition: 'all 0.3s',
                transform: isActive ? 'translateY(-3px) scale(1.15)' : 'scale(1)',
              }}>{t.icon}</span>
              
              <span style={{
                fontSize: 9, fontWeight: 900,
                color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                transition: 'color 0.3s',
                letterSpacing: '1.5px',
                textTransform: 'uppercase'
              }}>
                {t.label}
              </span>

              {isActive && (
                <div style={{
                  position: 'absolute', bottom: 5,
                  width: 3, height: 3, borderRadius: '50%',
                  background: 'var(--accent-cyan)',
                  boxShadow: '0 0 8px var(--accent-cyan)',
                }} />
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

