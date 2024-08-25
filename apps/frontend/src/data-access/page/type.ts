import type { GetValues, StrapiResponseData } from "@chooseresto/backend";

export type Page = GetValues<"api::page.page"> & {
  id: number;
};

export function pageAdapter(page: StrapiResponseData<"api::page.page">): Page {
  return {
    id: page.id,
    slug: page.attributes.slug,
    title: page.attributes.title,
    seo: page.attributes.seo,
    createdAt: page.attributes.createdAt,
    publishedAt: page.attributes.publishedAt,
    updatedAt: page.attributes.updatedAt,
  };
}
