export default function CurvedBadge() {
  return (
    <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-4 border-emerald-600">
      <svg viewBox="0 0 200 200" className="absolute w-full h-full">
        <path
          id="curve"
          d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
          fill="none"
        />
        <text fill="green" fontSize="12" fontWeight="bold">
          <textPath href="#curve" startOffset="50%" textAnchor="middle">
            APPROVED BY UGC • APPROVED BY UGC •
          </textPath>
        </text>
      </svg>
      <span className="text-emerald-700 font-bold">UGC</span>
    </div>
  )
}
