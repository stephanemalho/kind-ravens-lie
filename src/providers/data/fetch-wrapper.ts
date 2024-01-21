import { GraphQLFormattedError } from "graphql";

type Error = {
  message: string;
  statusCode: number | string;
};

const customFetch = async (url: string, options: RequestInit = {}) => {
  const accessToken = localStorage.getItem("access_token");

  const headers = options.headers as Record<string, string>;

  return fetch(url, {
    ...options,
    headers: {
      ...headers,
      Authorization: headers?.Authorization || `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Apollo-require-Preflight": "true",
    },
  });
};

const getGraphQlErrors = (
  body: Record<"errors", GraphQLFormattedError[] | undefined>
): Error | null => {
  if (!body)
    return {
      message: "Unknown error",
      statusCode: "INTERNAL_SERVER_ERROR",
    };

  if (body.errors) {
    const errors = body?.errors;

    const messages = errors?.map((error) => error?.message)?.join("\n");
    const code = errors?.[0]?.extensions?.code;

    return {
      message: messages || JSON.stringify(errors),
      statusCode: code || 500,
    };
  }

  return null;
};

export const fetchWrapper = async (url: string, options: RequestInit = {}) => {
  const response = await customFetch(url, options);

  const responseClone = response.clone();

  const body = await responseClone.json();

  const errors = getGraphQlErrors(body);

  if (errors) {
    throw errors;
  }

  return response;
}
