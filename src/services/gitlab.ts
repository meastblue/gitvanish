import type {
  IGitProvider,
  GitRepo,
  GitUser,
  RateLimit,
  GitProvider,
} from "~/types/git-provider";

export class GitLabProvider implements IGitProvider {
  readonly name: GitProvider = "gitlab";
  private baseUrl = "https://gitlab.com/api/v4";

  async validateToken(token: string): Promise<GitUser> {
    try {
      const response = await fetch(`${this.baseUrl}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Invalid GitLab token or insufficient permissions");
      }

      const data = await response.json();

      return {
        login: data.username,
        id: data.id,
        name: data.name,
        email: data.email,
        avatarUrl: data.avatar_url,
        bio: data.bio,
        publicReposCount: 0,
        followersCount: 0,
        followingCount: 0,
        createdAt: data.created_at,
        webUrl: data.web_url,
        provider: "gitlab",
      };
    } catch (error: any) {
      throw {
        message: error.message || "Invalid GitLab token",
        status: error.status,
        provider: "gitlab",
      };
    }
  }

  private async fetchProjectLanguages(
    token: string,
    projectId: number | string,
  ): Promise<string | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/projects/${projectId}/languages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        return null;
      }

      const languages = await response.json();

      if (languages && Object.keys(languages).length > 0) {
        const sorted = Object.entries(languages).sort((a: any, b: any) => b[1] - a[1]);
        return sorted[0][0];
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  async fetchAllRepos(token: string): Promise<GitRepo[]> {
    try {
      let page = 1;
      let hasMore = true;
      const allRepos: GitRepo[] = [];

      while (hasMore) {
        const response = await fetch(
          `${this.baseUrl}/projects?membership=true&per_page=100&page=${page}&order_by=updated_at&sort=desc`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch GitLab projects");
        }

        const data = await response.json();
        const mappedRepos = data.map((project: any) =>
          this.mapToGitRepo(project),
        );
        allRepos.push(...mappedRepos);

        hasMore = data.length === 100;
        page++;
      }

      await this.enrichReposWithLanguages(token, allRepos);

      return allRepos;
    } catch (error: any) {
      throw {
        message: error.message || "Failed to fetch GitLab projects",
        status: error.status,
        provider: "gitlab",
      };
    }
  }

  private async enrichReposWithLanguages(
    token: string,
    repos: GitRepo[],
  ): Promise<void> {
    const batchSize = 10;

    for (let i = 0; i < repos.length; i += batchSize) {
      const batch = repos.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async (repo) => {
          const language = await this.fetchProjectLanguages(token, repo.providerId);
          if (language) {
            repo.language = language;
          }
        }),
      );

      if (i + batchSize < repos.length) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
  }

  async deleteRepo(token: string, repo: GitRepo): Promise<void> {
    try {
      const response = await fetch(
        `${this.baseUrl}/projects/${repo.providerId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to delete ${repo.fullName}`);
      }
    } catch (error: any) {
      throw {
        message: error.message || `Failed to delete ${repo.fullName}`,
        status: error.status,
        provider: "gitlab",
      };
    }
  }

  async archiveRepo(token: string, repo: GitRepo): Promise<void> {
    try {
      const response = await fetch(
        `${this.baseUrl}/projects/${repo.providerId}/archive`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to archive ${repo.fullName}`);
      }
    } catch (error: any) {
      throw {
        message: error.message || `Failed to archive ${repo.fullName}`,
        status: error.status,
        provider: "gitlab",
      };
    }
  }

  async getRateLimit(token: string): Promise<RateLimit | null> {
    return null;
  }

  private getPrimaryLanguage(project: any): string | null {
    if (project.statistics?.languages) {
      const languages = Object.entries(project.statistics.languages);
      if (languages.length > 0) {
        const sorted = languages.sort((a: any, b: any) => b[1] - a[1]);
        return sorted[0][0];
      }
    }

    if (project.topics && project.topics.length > 0) {
      const commonLanguages = [
        'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust',
        'Ruby', 'PHP', 'C++', 'C#', 'Swift', 'Kotlin', 'Vue', 'React',
        'HTML', 'CSS', 'Shell', 'Dart', 'Scala', 'Perl', 'R'
      ];
      const languageTopic = project.topics.find((topic: string) =>
        commonLanguages.some(lang => topic.toLowerCase() === lang.toLowerCase())
      );
      if (languageTopic) {
        const found = commonLanguages.find(lang => lang.toLowerCase() === languageTopic.toLowerCase());
        return found || languageTopic;
      }
    }

    if (project.tag_list && project.tag_list.length > 0) {
      const commonLanguages = [
        'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust',
        'Ruby', 'PHP', 'C++', 'C#', 'Swift', 'Kotlin', 'Vue', 'React'
      ];
      const languageTag = project.tag_list.find((tag: string) =>
        commonLanguages.some(lang => tag.toLowerCase() === lang.toLowerCase())
      );
      if (languageTag) {
        const found = commonLanguages.find(lang => lang.toLowerCase() === languageTag.toLowerCase());
        return found || languageTag;
      }
    }

    return null;
  }

  private mapToGitRepo(project: any): GitRepo {
    return {
      id: project.id,
      name: project.name,
      fullName: project.path_with_namespace,
      description: project.description,
      isPrivate: project.visibility === "private",
      url: project._links.self,
      webUrl: project.web_url,

      owner: {
        login: project.namespace.path,
        id: project.namespace.id,
        avatarUrl: project.namespace.avatar_url || "",
        webUrl: project.namespace.web_url,
      },

      language: this.getPrimaryLanguage(project),
      starsCount: project.star_count,
      forksCount: project.forks_count,
      openIssuesCount: project.open_issues_count || 0,

      createdAt: project.created_at,
      updatedAt: project.last_activity_at,
      lastActivityAt: project.last_activity_at,

      size: 0,
      defaultBranch: project.default_branch,
      isArchived: project.archived,
      isFork: project.forked_from_project !== undefined,

      topics: project.topics || project.tag_list || [],
      visibility: project.visibility as "public" | "private" | "internal",

      provider: "gitlab",
      providerId: project.id,
    };
  }
}

export const gitlabProvider = new GitLabProvider();
