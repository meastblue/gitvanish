
export type GitProvider = "github" | "gitlab";

export interface GitRepo {
  id: number | string;
  name: string;
  fullName: string;
  description: string | null;
  isPrivate: boolean;
  url: string;
  webUrl: string;

  owner: {
    login: string;
    id: number | string;
    avatarUrl: string;
    webUrl: string;
  };

  language: string | null;
  starsCount: number;
  forksCount: number;
  openIssuesCount: number;

  createdAt: string;
  updatedAt: string;
  lastActivityAt: string;

  size: number;
  defaultBranch: string;
  isArchived: boolean;
  isFork: boolean;

  topics?: string[];
  visibility?: "public" | "private" | "internal";

  provider: GitProvider;
  providerId: number | string;
}

export interface GitUser {
  login: string;
  id: number | string;
  name: string | null;
  email: string | null;
  avatarUrl: string;
  bio: string | null;
  publicReposCount: number;
  followersCount: number;
  followingCount: number;
  createdAt: string;
  webUrl: string;
  provider: GitProvider;
}

export interface RateLimit {
  limit: number;
  remaining: number;
  reset: number;
  used: number;
}

export type RepoVisibility = "all" | "public" | "private";
export type RepoSortBy = "updated" | "created" | "name" | "stars" | "activity";
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

export interface DeleteProgress {
  total: number;
  completed: number;
  failed: number;
  current?: string;
  errors: Array<{
    repo: string;
    error: string;
  }>;
}

export interface ProviderError {
  message: string;
  status?: number;
  provider: GitProvider;
}

export interface IGitProvider {
  readonly name: GitProvider;

  validateToken(token: string): Promise<GitUser>;

  fetchAllRepos(token: string): Promise<GitRepo[]>;
  deleteRepo(token: string, repo: GitRepo): Promise<void>;
  archiveRepo(token: string, repo: GitRepo): Promise<void>;

  getRateLimit(token: string): Promise<RateLimit | null>;
}

export interface ProviderConfig {
  github: {
    apiUrl: string;
    scopes: string[];
    tokenUrl: string;
  };
  gitlab: {
    apiUrl: string;
    scopes: string[];
    tokenUrl: string;
  };
}
