import {useState} from 'react'

function StoreCard({ store, onRate }) {
  const [rating, setRating] = useState(store.userRating || "");

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold">{store.name}</h2>
      <p className="text-gray-400">{store.address}</p>

      <div className="mt-2">
        <span className="text-sm text-gray-400">
          Average Rating:
        </span>{" "}
        <span className="font-semibold">
          {store.averageRating
            ? Number(store.averageRating).toFixed(1)
            : "—"}{" "}
          / 5
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="bg-gray-700 border border-gray-600 rounded px-2 py-1"
        >
          <option value="">Rate</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <button
          onClick={() => onRate(store.id, rating)}
          disabled={!rating}
          className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {store.userRating ? "Update" : "Submit"}
        </button>

        {store.userRating && (
          <span className="text-sm text-gray-400">
            Your rating: {store.userRating}
          </span>
        )}
      </div>
    </div>
  );
}

export default StoreCard;
