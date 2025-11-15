import { Octokit } from "@octokit/rest";
import type {
  IGitProvider,
  GitRepo,
  GitUser,
  RateLimit,
  GitProvider,
} from "~/types/git-provider";

export class GitHubProvider implements IGitProvider {
  readonly name: GitProvider = "github";
  private octokit: Octokit | null = null;

  async validateToken(token: string): Promise<GitUser> {
    const cleanToken = token.trim();

    if (!cleanToken) {
      throw {
        message: "Token cannot be empty",
        status: 400,
        provider: "github",
      };
    }

    this.octokit = new Octokit({ auth: cleanToken });

    try {
      const { data } = await this.octokit.users.getAuthenticated();

      return {
        login: data.login,
        id: data.id,
        name: data.name,
        email: data.email,
        avatarUrl: data.avatar_url,
        bio: data.bio,
        publicReposCount: data.public_repos,
        followersCount: data.followers,
        followingCount: data.following,
        createdAt: data.created_at,
        webUrl: data.html_url,
        provider: "github",
      };
    } catch (error: any) {
      let message = "Invalid GitHub token or insufficient permissions";

      if (error.message?.includes("ByteString")) {
        message = "Invalid token format. Please ensure you copied the token correctly without extra characters.";
      } else if (error.status === 401) {
        message = "Invalid token. Please check your GitHub token and try again.";
      } else if (error.status === 403) {
        message = "Token lacks required permissions. Please generate a new token with 'repo' and 'delete_repo' scopes.";
      }

      throw {
        message,
        status: error.status,
        provider: "github",
      };
    }
  }

  async fetchAllRepos(token: string): Promise<GitRepo[]> {
    if (!this.octokit) {
      this.octokit = new Octokit({ auth: token });
    }

    try {
      let page = 1;
      let hasMore = true;
      const allRepos: GitRepo[] = [];

      while (hasMore) {
        const { data } = await this.octokit.repos.listForAuthenticatedUser({
          per_page: 100,
          page,
          sort: "updated",
          direction: "desc",
        });

        const mappedRepos = data.map((repo) => this.mapToGitRepo(repo));
        allRepos.push(...mappedRepos);

        hasMore = data.length === 100;
        page++;
      }

      return allRepos;
    } catch (error: any) {
      throw {
        message: error.message || "Failed to fetch GitHub repositories",
        status: error.status,
        provider: "github",
      };
    }
  }

  async deleteRepo(token: string, repo: GitRepo): Promise<void> {
    if (!this.octokit) {
      this.octokit = new Octokit({ auth: token });
    }

    try {
      await this.octokit.repos.delete({
        owner: repo.owner.login,
        repo: repo.name,
      });
    } catch (error: any) {
      throw {
        message: error.message || `Failed to delete ${repo.fullName}`,
        status: error.status,
        provider: "github",
      };
    }
  }

  async archiveRepo(token: string, repo: GitRepo): Promise<void> {
    if (!this.octokit) {
      this.octokit = new Octokit({ auth: token });
    }

    try {
      await this.octokit.repos.update({
        owner: repo.owner.login,
        repo: repo.name,
        archived: true,
      });
    } catch (error: any) {
      throw {
        message: error.message || `Failed to archive ${repo.fullName}`,
        status: error.status,
        provider: "github",
      };
    }
  }

  async getRateLimit(token: string): Promise<RateLimit | null> {
    if (!this.octokit) {
      this.octokit = new Octokit({ auth: token });
    }

    try {
      const { data } = await this.octokit.rateLimit.get();
      return {
        limit: data.rate.limit,
        remaining: data.rate.remaining,
        reset: data.rate.reset,
        used: data.rate.used,
      };
    } catch (error) {
      return null;
    }
  }

  private mapToGitRepo(repo: any): GitRepo {
    return {
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      isPrivate: repo.private,
      url: repo.url,
      webUrl: repo.html_url,

      owner: {
        login: repo.owner.login,
        id: repo.owner.id,
        avatarUrl: repo.owner.avatar_url,
        webUrl: repo.owner.html_url,
      },

      language: repo.language,
      starsCount: repo.stargazers_count,
      forksCount: repo.forks_count,
      openIssuesCount: repo.open_issues_count,

      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      lastActivityAt: repo.pushed_at,

      size: repo.size,
      defaultBranch: repo.default_branch,
      isArchived: repo.archived,
      isFork: repo.fork,

      topics: repo.topics,
      visibility: repo.visibility,

      provider: "github",
      providerId: repo.id,
    };
  }
}

export const githubProvider = new GitHubProvider();
