import { AxiosError } from "axios";
import { refresh } from "@/shared/api";
import { AXIOS_INSTANCE } from "@/shared/api/instance";

function getSession(): { accessToken: string; refreshToken: string } | undefined {
  const data = localStorage.getItem("session");
  if (!data) {
    return undefined;
  }
  const parsed = JSON.parse(data);
  return parsed;
}

export function setSession(session: { accessToken: string; refreshToken: string }) {
  localStorage.setItem("session", JSON.stringify(session));
}

function getAccessToken() {
  return getSession()?.accessToken;
}

function getRefreshToken() {
  return getSession()?.refreshToken;
}

AXIOS_INSTANCE.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers.Authorization = undefined;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let currentlyRefreshing = false;

AXIOS_INSTANCE.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err: AxiosError) => {
    const originalConfig = err.config!;
    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !currentlyRefreshing) {
        currentlyRefreshing = true;
        try {
          const previousRefreshToken = getRefreshToken();
          if (!previousRefreshToken) {
            return Promise.reject(err);
          }
          const rs = await refreshAccessTokenFn(previousRefreshToken);
          const { accessToken, refreshToken } = rs;
          originalConfig.headers.Authorization = `Bearer ${accessToken}`;
          setSession({ accessToken, refreshToken });

          return AXIOS_INSTANCE(originalConfig).then((res) => {
            currentlyRefreshing = false;
            return res;
          });
        } catch (_error) {
          currentlyRefreshing = false;
          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  },
);

export type SessionData = {
  refreshToken: string;
  accessToken: string;
};

/**
 * Обновляет access token. Возвращает новые токены
 */
async function refreshAccessTokenFn(refreshToken: string): Promise<SessionData> {
  const { data } = await refresh(refreshToken);
  return data;
}
