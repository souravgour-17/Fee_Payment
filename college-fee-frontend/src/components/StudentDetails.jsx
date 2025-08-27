export default function StudentDetails({ student }) {
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(student.upiId)}&pn=${encodeURIComponent(student.name)}&am=${encodeURIComponent(student.feesDue)}&cu=INR&tn=${encodeURIComponent('College Fee Payment')}`

  return (
    <div className="mt-6 border rounded-2xl p-5">
      <h2 className="text-xl font-semibold mb-3">Student Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
        <p><span className="font-medium">Name:</span> {student.name}</p>
        <p><span className="font-medium">Enrollment:</span> {student.enrollment}</p>
        <p><span className="font-medium">Course:</span> {student.course}</p>
        <p><span className="font-medium">Year:</span> {student.year}</p>
        <p><span className="font-medium">Fees Due:</span> ₹{student.feesDue}</p>
        <p><span className="font-medium">UPI ID:</span> {student.upiId}</p>
      </div>

      
      <div className="my-5 flex justify-center">
  <img
    src="/upi-qr.jpg"   
    alt="UPI QR"
    className="w-48 h-48 object-contain border rounded-lg shadow"
  />
</div>
    

      <div className="mt-5 text-center">
        <a
          href={upiDeepLink}
          className="inline-block rounded-2xl px-5 py-2 bg-emerald-600 text-white hover:bg-emerald-700 shadow"
        >
          Pay via UPI App
        </a>
        
      </div>
    </div>
  )
}
