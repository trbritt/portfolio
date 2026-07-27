import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Every published post, newest first.
 *
 * Drafts stay visible during `astro dev` so you can preview them, and are
 * dropped from `astro build` so they never reach blogs.tbritt.xyz.
 */
export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Tag slug -> posts carrying it, ordered by descending post count. */
export async function getTagIndex(): Promise<Map<string, CollectionEntry<'blog'>[]>> {
  const posts = await getPublishedPosts();
  const index = new Map<string, CollectionEntry<'blog'>[]>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const bucket = index.get(tag);
      if (bucket) bucket.push(post);
      else index.set(tag, [post]);
    }
  }

  return new Map(
    [...index.entries()].sort(
      ([aTag, aPosts], [bTag, bPosts]) =>
        bPosts.length - aPosts.length || aTag.localeCompare(bTag)
    )
  );
}
