import { useState, useEffect } from 'react';

export const useGitHubStats = () => {
  const [stars, setStars] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const repoResponse = await fetch('https://api.github.com/repos/meastblue/gitvanish');
        if (repoResponse.ok) {
          const repoData = await repoResponse.json();
          setStars(repoData.stargazers_count || 0);
        }

        const userResponse = await fetch('https://api.github.com/users/meastblue');
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setFollowers(userData.followers || 0);
        }
      } catch (error) {
        setStars(0);
        setFollowers(0);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return {
    stars,
    followers,
    loading,
  };
};
