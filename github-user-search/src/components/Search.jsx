import { useState } from "react";
import { fetchAdvancedUsers } from "../services/githubService";

const Search = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUsers([]);

    try {
      const data = await fetchAdvancedUsers({
        query,
        location,
        minRepos,
      });
      setUsers(data);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form
        onSubmit={handleSearch}
        className="grid gap-4 md:grid-cols-4 bg-white p-4 rounded shadow"
      >
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Minimum Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />

        <button
          type="submit"
          className="bg-black text-white rounded px-4 py-2"
        >
          Search
        </button>
      </form>

      {/* Loading State */}
      {loading && <p className="mt-4">Loading...</p>}

      {/* Error State */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Results */}
      <div className="grid gap-4 mt-6 sm:grid-cols-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="border p-4 rounded flex gap-4"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{user.login}</h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 text-sm"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
