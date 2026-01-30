import axios from "axios";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
      ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
      : undefined,
  },
});

export const fetchAdvancedUsers = async ({
  query,
  location,
  repos,
  page = 1,
}) => {
  let searchQuery = query;

  if (location) searchQuery += ` location:${location}`;
  if (repos) searchQuery += ` repos:>=${repos}`;

  const response = await githubApi.get(
    `/search/users?q=${encodeURIComponent(searchQuery)}&page=${page}&per_page=10`
  );

  const detailedUsers = await Promise.all(
    response.data.items.map(async (user) => {
      const detail = await githubApi.get(`/users/${user.login}`);
      return detail.data;
    })
  );

  return detailedUsers;
};
