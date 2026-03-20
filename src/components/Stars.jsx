import { useState } from 'react'

export default function Stars({ rating, size = 16, interactive = false, onRate }) {
  const [hover, setHover] = useState(0)
  const active = hover || Math.round(rating)

  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          onClick={() => interactive && onRate && onRate(s)}
          onMouseEnter={() => interactive && setHover(s)}
          onMouseLeave={() => interactive && setHover(0)}
          style={{
            fontSize: size,
            color: s <= active ? '#fbbf24' : 'var(--bg-elevated)',
            cursor: interactive ? 'pointer' : 'default',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: interactive && s <= active ? 'scale(1.2) translateY(-2px)' : 'scale(1)',
            display: 'inline-block',
            textShadow: s <= active ? '0 0 15px rgba(251, 191, 36, 0.4)' : 'none',
          }}
        >★</span>
      ))}
    </div>
  )
}
