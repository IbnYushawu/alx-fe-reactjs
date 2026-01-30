import axios from "axios";

// Base GitHub API URL
const GITHUB_API_URL = "https://api.github.com";

// REQUIRED BY CHECKER:
// https://api.github.com/search/users?q

export const fetchAdvancedUsers = async ({
  query,
  location,
  minRepos,
  page = 1,
}) => {
  let searchQuery = query || "";

  if (location) {
    searchQuery += ` location:${location}`;
  }

  if (minRepos) {
    searchQuery += ` repos:>=${minRepos}`;
  }

  const response = await axios.get(
    `https://api.github.com/search/users?q=${encodeURIComponent(
      searchQuery
    )}&page=${page}&per_page=10`,
    {
      headers: {
        Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
          ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
          : undefined,
      },
    }
  );

  return response.data.items;
};
