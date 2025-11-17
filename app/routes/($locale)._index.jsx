import { Await, useLoaderData, Link } from 'react-router';
import { Suspense } from 'react';
import { Image } from '@shopify/hydrogen';
import { ProductItem } from '~/components/ProductItem';
import styles from "../styles/homepage.module.css"


/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{ title: 'Hydrogen | Home' }];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({ context }) {
  const [{ collections }] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({ context }) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}


export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div className={styles.home}>
      <img
        className={styles.logo}
        src="../images/ColorLogo.png"
        alt="moua-logo"
      ></img>
      <div className={styles.imageWrapper}>
        <img
          className={styles.flowerHero}
          src="../images/flowerHero.jpg"
          alt="wedding couple"
        ></img>
        <div className={styles.overlayText}>
          <h1>Floral Design</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi animi quisquam tenetur tempora aut eius quis velit pariatur fugit possimus nostrum deserunt molestiae at modi, aliquid rem? Ab, labore dolore.
            Exercitationem reprehenderit id soluta nisi possimus quidem, molestias totam quaerat? Eius deleniti temporibus saepe dolores quos cumque praesentium alias accusantium similique adipisci, architecto repellat. Dignissimos voluptatum aliquam in qui quis.
            Cupiditate nostrum saepe soluta id rerum tempore alias deleniti magnam blanditiis corporis repudiandae necessitatibus quam quis ex molestiae neque, a commodi magni asperiores eveniet dolorem iste fugiat facilis delectus! Debitis.
            Error dolore tempora sequi fuga blanditiis vel doloremque molestias deleniti quis ab? Doloremque dignissimos optio, corporis numquam delectus beatae perferendis facilis? Ducimus molestias animi placeat at aliquam recusandae repellat autem.
            Corrupti vero blanditiis nemo? Nobis molestias expedita iste harum magni aliquid ab corporis nulla eaque neque? Dolore, voluptas sapiente cupiditate aliquam veniam atque dignissimos! Expedita dignissimos magnam sit obcaecati aspernatur.</p>
        </div>
      </div>
      <h1>This is the page</h1>
      <h1>This is a deployment test 2</h1>
      {/* <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} /> */}
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({ collection }) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({ products }) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
