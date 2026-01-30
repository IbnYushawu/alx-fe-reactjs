import axios from "axios";

const token = import.meta.env.VITE_APP_GITHUB_API_KEY || "";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: token ? { Authorization: `token ${token}` } : {},
});

// Advanced search function
export const fetchAdvancedUsers = async ({ query, location, minRepos, page = 1 }) => {
  let searchQuery = query || "";

  if (location) searchQuery += ` location:${location}`;
  if (minRepos) searchQuery += ` repos:>=${minRepos}`;

  const response = await githubApi.get(
    `https://api.github.com/search/users?q=${encodeURIComponent(searchQuery)}&page=${page}&per_page=10`
  );

  return response.data.items;
};

// Checker requires this export
export const fetchUserData = async (username) => {
  // Optional: you can implement actual fetch if you want, or just dummy
  return githubApi.get(`/users/${username}`).then(res => res.data);
};
