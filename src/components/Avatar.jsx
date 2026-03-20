export default function Avatar({ user, size = 36 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: user?.color || '#6366f1',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.36, fontWeight: 700, color: '#fff',
      flexShrink: 0, userSelect: 'none',
    }}>
      {user?.av || user?.avatar || '?'}
    </div>
  )
}
