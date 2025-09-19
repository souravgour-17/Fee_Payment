export default function FeeStructure() {
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-900">
      {/* Blur Box Container */}
      <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-6xl w-full mx-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-white italic">
          📊 Fee Structure
        </h1>
        <p className="text-lg mb-8 text-center text-white/90">
          Detailed fee structure for major courses at Souravian University.
        </p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-white text-center shadow-lg rounded-lg">
            <thead>
              <tr className="text-white/90">
                <th className="px-4 py-3 border">Course</th>
                <th className="px-4 py-3 border">Tuition Fee</th>
                <th className="px-4 py-3 border">Other Fees</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["B.Tech 🎓", "₹1,50,000", "₹20,000"],
                ["MBA 📚", "₹1,20,000", "₹15,000"],
                ["BCA 💻", "₹80,000", "₹10,000"],
                ["MCA 💻", "₹90,000", "₹12,000"],
                ["BBA 💼", "₹70,000", "₹8,000"],
                ["B.Sc (IT) 🖥️", "₹65,000", "₹7,000"],
                ["M.Sc (IT) 🖥️", "₹75,000", "₹9,000"],
                ["B.Com 💰", "₹60,000", "₹6,000"],
                ["M.Com 💰", "₹80,000", "₹8,000"],
                ["B.Sc (Physics) 🔬", "₹70,000", "₹7,000"],
                ["B.Sc (Chemistry) ⚗️", "₹70,000", "₹7,000"],
                ["B.Sc (Biology) 🧬", "₹70,000", "₹7,000"],
                ["B.A (English) 📖", "₹50,000", "₹5,000"],
                ["B.A (History) 🏛️", "₹50,000", "₹5,000"],
                ["M.A (English) 📖", "₹65,000", "₹6,000"],
                ["M.A (History) 🏛️", "₹65,000", "₹6,000"],
                ["BBA (Finance) 💵", "₹75,000", "₹8,000"],
                ["MBA (Finance) 💵", "₹1,25,000", "₹15,000"],
                ["B.Tech (AI) 🤖", "₹1,70,000", "₹22,000"],
                ["M.Tech (AI) 🤖", "₹1,80,000", "₹25,000"]
              ].map(([course, fee, other], i) => (
                <tr
                  key={course}
                  className={i % 2 === 0 ? "bg-white/30" : "bg-white/10"}
                >
                  <td className="px-4 py-2 border">{course}</td>
                  <td className="px-4 py-2 border">{fee}</td>
                  <td className="px-4 py-2 border">{other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
