
export interface GitHubRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  html_url: string;
  url: string;

  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };

  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;

  created_at: string;
  updated_at: string;
  pushed_at: string;

  size: number;
  default_branch: string;
  archived: boolean;
  disabled: boolean;
  fork: boolean;

  topics?: string[];
  visibility?: "public" | "private" | "internal";
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRateLimit {
  limit: number;
  remaining: number;
  reset: number;
  used: number;
}

export type RepoVisibility = "all" | "public" | "private";
export type RepoSortBy = "updated" | "created" | "name" | "stars" | "pushed";
export type RepoSortOrder = "asc" | "desc";

export interface RepoFilters {
  search: string;
  visibility: RepoVisibility;
  language: string | null;
  sortBy: RepoSortBy;
  sortOrder: RepoSortOrder;
  archived: boolean | null;
  fork: boolean | null;
}

export interface GitHubError {
  message: string;
  documentation_url?: string;
  status?: number;
}
