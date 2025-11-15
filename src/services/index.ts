
import type {
  IGitProvider,
  GitProvider,
  ProviderConfig,
} from "~/types/git-provider";
import { githubProvider } from "./github";
import { gitlabProvider } from "./gitlab";

export const providerConfig: ProviderConfig = {
  github: {
    apiUrl: "https://api.github.com",
    scopes: ["delete_repo", "repo"],
    tokenUrl: "https://github.com/settings/tokens/new?scopes=delete_repo,repo&description=gitvanish",
  },
  gitlab: {
    apiUrl: "https://gitlab.com/api/v4",
    scopes: ["api", "write_repository"],
    tokenUrl: "https://gitlab.com/-/user_settings/personal_access_tokens?name=gitvanish&scopes=api,write_repository",
  },
};

export function getProvider(type: GitProvider): IGitProvider {
  switch (type) {
    case "github":
      return githubProvider;
    case "gitlab":
      return gitlabProvider;
    default:
      throw new Error(`Unknown provider: ${type}`);
  }
}

export function getProviderConfig(type: GitProvider) {
  return providerConfig[type];
}

export function getProviderName(type: GitProvider): string {
  return type === "github" ? "GitHub" : "GitLab";
}

export function getProviderIcon(type: GitProvider): string {
  return type === "github" ? "github" : "gitlab";
}

export { githubProvider, gitlabProvider };
