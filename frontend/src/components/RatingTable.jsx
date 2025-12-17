export default function RatingTable({ ratings }) {
  if (!ratings.length) {
    return (
      <p className="text-gray-400">No ratings submitted yet.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="py-2">User Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Rating</th>
          </tr>
        </thead>

        <tbody>
          {ratings.map((r) => (
            <tr
              key={r.userId}
              className="border-b border-gray-700"
            >
              <td className="py-2">{r.userName}</td>
              <td className="py-2">{r.userEmail}</td>
              <td className="py-2 font-semibold">
                {r.rating} / 5
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
