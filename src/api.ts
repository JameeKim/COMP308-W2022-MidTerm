/* eslint-disable @typescript-eslint/no-explicit-any */

export type ApiResult<T> =
  | { status: 200, data: T }
  | { status: 400, error: string, message: string }
  | { status: number } & Record<string, any>;

const parseBodyWhen: number[] = [200, 201, 400];

const extractResult = async <T>(response: Response): Promise<ApiResult<T>> => {
  if (parseBodyWhen.includes(response.status)) {
    const body = await response.json();
    return { status: response.status, ...body };
  }

  return { status: response.status };
};

export const get = async <T>(url: string, signal?: AbortSignal): Promise<ApiResult<T>> => {
  const response = await fetch(url, {
    headers: {
      "accept": "application/json",
    },
    method: "GET",
    cache: "no-cache",
    signal,
  });
  return await extractResult(response);
};

export const post = async <T>(
  url: string,
  data: unknown,
  signal?: AbortSignal,
): Promise<ApiResult<T>> => {
  const response = await fetch(url, {
    headers: {
      "accept": "application/json",
      "content-type": "application/json; charset=utf-8",
    },
    method: "POST",
    cache: "no-cache",
    signal,
    body: JSON.stringify(data),
  });
  return await extractResult(response);
};
