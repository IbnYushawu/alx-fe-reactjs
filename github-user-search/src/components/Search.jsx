import { useState } from "react";
import { fetchAdvancedUsers } from "../services/githubService";

const Search = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [repos, setRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e, newPage = 1) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await fetchAdvancedUsers({
        query,
        location,
        repos,
        page: newPage,
      });

      setUsers(newPage === 1 ? data : [...users, ...data]);
      setPage(newPage);
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form
        onSubmit={(e) => handleSearch(e, 1)}
        className="grid gap-4 md:grid-cols-4 bg-white p-4 rounded shadow"
      >
        <input
          className="border p-2 rounded"
          placeholder="Username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Min repos"
          value={repos}
          onChange={(e) => setRepos(e.target.value)}
        />

        <button className="bg-black text-white rounded">
          Search
        </button>
      </form>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

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
              <p>Location: {user.location ?? "N/A"}</p>
              <p>Repos: {user.public_repos}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {users.length > 0 && (
        <button
          onClick={(e) => handleSearch(e, page + 1)}
          className="mt-6 mx-auto block bg-gray-200 px-4 py-2 rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Search;
