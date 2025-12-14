import {createWithCache, CacheLong} from '@shopify/hydrogen';

// const FEATURABLE_API_URL =
//   'https://featurable.com/api/v2/widgets/98ca5873-8fab-4981-b666-7ce9dcd6ceaa';

export function createFeaturableReviewsClient({
  cache,
  waitUntil,
  request,
  env,
}) {
  const withCache = createWithCache({cache, waitUntil, request});

  const FEATURABLE_API_URL = env.FEATURABLE_URL;

  async function getReviews(options = {cacheStrategy: CacheLong()}) {
    const result = await withCache.fetch(
      FEATURABLE_API_URL,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
      {
        cacheKey: ['featurable-widget', FEATURABLE_API_URL],
        cacheStrategy: options.cacheStrategy,
        shouldCacheResponse: (body) => body != null && typeof body === 'object',
      },
    );

    return result;
  }

  return {
    getReviews,
  };
}
