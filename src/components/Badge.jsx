import { fileColor } from '../utils/helpers'

export default function Badge({ type }) {
  return (
    <span style={{
      background: fileColor(type),
      color: '#fff', fontSize: 10, fontWeight: 700,
      padding: '2px 8px', borderRadius: 4, letterSpacing: '0.5px',
    }}>
      {type}
    </span>
  )
}
