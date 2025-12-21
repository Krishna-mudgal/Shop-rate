export default function StatCard({ title, value }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
