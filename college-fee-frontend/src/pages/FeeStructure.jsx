export default function FeeStructure() {
  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-6">📊 Fee Structure</h1>
      <p className="text-lg mb-4">
        Detailed fee structure for major courses at Souravian University.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-gray-800 shadow-lg rounded-lg">
          <thead>
            <tr className=" text-white">
              <th className="px-4 py-3 border">Course</th>
              <th className="px-4 py-3 border">Tuition Fee</th>
              <th className="px-4 py-3 border">Other Fees</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["B.Tech", "₹1,50,000", "₹20,000"],
              ["MBA", "₹1,20,000", "₹15,000"],
              ["BCA", "₹80,000", "₹10,000"],
              ["MCA", "₹90,000", "₹12,000"],
              ["BBA", "₹70,000", "₹8,000"],
              ["B.Sc (IT)", "₹65,000", "₹7,000"],
              ["M.Sc (IT)", "₹75,000", "₹9,000"],
            ].map(([course, fee, other], i) => (
              <tr key={course} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-4 py-2 border">{course}</td>
                <td className="px-4 py-2 border">{fee}</td>
                <td className="px-4 py-2 border">{other}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
