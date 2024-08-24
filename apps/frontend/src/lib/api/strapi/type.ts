import type { Common } from "@chooseresto/backend";

export type ApiContentTypeUid = Extract<
  Common.UID.ContentType,
  `api::${string}`
>;

export const API_ENDPOINTS: {
  [K in ApiContentTypeUid]: string;
} = {
  "api::article.article": "/articles",
  "api::page.page": "/pages",
};
