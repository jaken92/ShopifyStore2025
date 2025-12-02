import {Await, useLoaderData, Link} from 'react-router';
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import {ProductItem} from '~/components/ProductItem';
import styles from '../styles/homepage.module.css';
// import {AnimatedButton} from '~/components/AnimatedButton';
import {AnimatedButton} from '~/components/AnimatedButton/AnimatedButton';
import {ParallaxSection} from '~/components/ParallaxSection/ParallaxSection';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context}) {
  const [{collections}] = await Promise.all([
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
function loadDeferredData({context}) {
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
      <section className={styles.imageWrapper}>
        <img
          className={styles.flowerHero}
          src="../images/WeddingCouple.png"
          alt="wedding couple"
        ></img>
        <div className={styles.overlayText}>
          <h1>Floral Design</h1>
          <h2>Based in Göteborg, Sweden</h2>
          <div className={styles.paragraphContainer}>
            <p>
              In moua we create unique, elegant & natural style arrangements,
              full of textures, colors & curves for any occasion through which
              anyone can vibrate, help & reconnect with nature & its beauty by
              merging our two passions; the flowers & the ocean.
            </p>
          </div>

          <div className={styles.buttonContainer}>
            <AnimatedButton
              bgColor={'white'}
              textColor={'#363636'}
              to="/pages/contact"
            >
              WEDDINGS
            </AnimatedButton>

            <AnimatedButton
              bgColor={'white'}
              textColor={'#363636'}
              to="/pages/contact"
            >
              ORDER FLOWERS
            </AnimatedButton>
          </div>
        </div>
      </section>
      <section className={styles.introSection}>
        <h3>
          MODERN FLORAL <span>ART</span> WITH A MEXICAN SOUL
        </h3>
        <p>
          Hey! My name is Ana im proudly Mexican and im the creator of Moua
          flowers. <br></br>Flowers fill my soul & I passionatly design
          arrangment hoping to make you feel a sense of elegance, beauty and
          simplicity through flowers, while encourage & inspire you to help
          nature in the way we can.
        </p>
        <div className={styles.keywordsContainer}>
          <p>
            <span>Organic</span>

            <span>Natural</span>

            <span>Feel</span>
          </p>
        </div>
      </section>
      <section className={styles.imageSection}>
        <div className={styles.imagesContainer}>
          <img
            className={styles.imageOne}
            src="../images/collections.jpeg"
            alt="flower arrangement 1"
          ></img>
          <img
            className={styles.imageTwo}
            src="../images/BridalBouquet.jpg"
            alt="flower arrangement 2"
          ></img>
          <img
            className={styles.imageThree}
            src="../images/example.webp"
            alt="flower arrangement 3"
          ></img>
        </div>
      </section>
      <section className={styles.servicesSection}>
        <div className={styles.headerLayout}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>Services</h2>
            <div className={styles.line}></div>
          </div>
        </div>
        <div className={styles.serviceCardsLayout}>
          <div className={styles.serviceCardWithTxt}>
            <div className={styles.serviceLinkContainer}>
              <Link className={styles.imgWrappingLink} to="/pages/contact">
                <img
                  className={styles.serviceImage}
                  src="../images/collections.jpeg"
                  alt="flower arrangement 1"
                ></img>
                <div className={styles.serviceBtnContainer}>
                  <AnimatedButton
                    as="div"
                    bgColor={'white'}
                    textColor={'#363636'}
                    to="/pages/contact"
                  >
                    ORDER FLOWERS
                  </AnimatedButton>
                </div>
              </Link>
            </div>
            <div className={styles.serviceTextContainer}>
              <span></span>
              <p>
                Find a unique piece for that special someone, we offer premium
                floral arrangements available for pickup or delivery.
              </p>
              <span></span>
            </div>
          </div>
          <div className={styles.serviceCardWithTxt}>
            <div className={styles.serviceLinkContainer}>
              <Link className={styles.imgWrappingLink} to="/pages/contact">
                <img
                  className={styles.serviceImage}
                  src="../images/collections.jpeg"
                  alt="flower arrangement 1"
                ></img>
                <div className={styles.serviceBtnContainer}>
                  <AnimatedButton
                    as="div"
                    bgColor={'white'}
                    textColor={'#363636'}
                    to="/pages/contact"
                  >
                    ORDER FLOWERS
                  </AnimatedButton>
                </div>
              </Link>
            </div>
            <div className={styles.serviceTextContainer}>
              <span></span>
              <p>
                Have an upcoming wedding or special event? We’re so excited to
                hear about it! To receive a custom quote and a complimentary
                floral mood board, please get in contact.
              </p>
              <span></span>
            </div>
          </div>
          <div className={styles.serviceCardWithTxt}>
            <div className={styles.serviceLinkContainer}>
              <Link className={styles.imgWrappingLink} to="/pages/contact">
                <img
                  className={styles.serviceImage}
                  src="../images/collections.jpeg"
                  alt="flower arrangement 1"
                ></img>
                <div className={styles.serviceBtnContainer}>
                  <AnimatedButton
                    as="div"
                    bgColor={'white'}
                    textColor={'#363636'}
                    to="/pages/contact"
                  >
                    ORDER FLOWERS
                  </AnimatedButton>
                </div>
              </Link>
            </div>
            <div className={styles.serviceTextContainer}>
              <span></span>
              <p>
                Brighten up your space with a beautiful arrangement delivered to
                your home or business on a weekly or biweekly basis.
              </p>
              <span></span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.parallaxSection}>
        <ParallaxSection image="/images/WeddingCouple.png">
          <div className={styles.parallaxContent}>
            <h3>LUSH GARDEN STYLE WITH A MODERN EDGE</h3>
            <AnimatedButton
              bgColor={'#edd0ce'}
              textColor={'white'}
              to="/pages/contact"
            >
              RECSOURCES
            </AnimatedButton>
          </div>
        </ParallaxSection>
      </section>

      <section className={styles.dummySection}></section>
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
function FeaturedCollection({collection}) {
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
function RecommendedProducts({products}) {
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
