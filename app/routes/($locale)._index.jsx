import {Await, useLoaderData, Link} from 'react-router';
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import {ProductItem} from '~/components/ProductItem';
import styles from '../styles/homepage.module.css';
// import {AnimatedButton} from '~/components/AnimatedButton';
import {AnimatedButton} from '~/components/AnimatedButton/AnimatedButton';
import {ParallaxSection} from '~/components/ParallaxSection/ParallaxSection';

// import {json} from '@shopify/remix-oxygen';
// import {CacheShort} from '@shopify/hydrogen';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

/**
 * @param {Route.LoaderArgs} args
 */

// export async function loader(args) {
//   // Start fetching non-critical data without blocking time to first byte
//   const deferredData = loadDeferredData(args);

//   // Await the critical data required to render initial state of the page
//   const criticalData = await loadCriticalData(args);

//   return {...deferredData, ...criticalData};
// }

// export async function loader({context}) {
//   const {characters} = await context.rickAndMorty.query(CHARACTERS_QUERY, {
//     cache: CacheShort(),
//   });
//   return {characters};
// }

export async function loader({context}) {
  // Optional debug (remove later)
  console.log(context.env.FEATURABLE_URL);

  // Call your REST client
  const reviewData = await context.featurableReviews.getReviews();

  return {
    reviewData,
  };
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

// Render the component using data returned by the loader
// const Reviews = () => {
//   return (
//     <div>
//       <h1>Rick & Morty Characters</h1>
//       <ul>
//         {(characters.results || []).map((character) => (
//           <li key={character.name}>{character.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

export default function Homepage() {
  /** @type {LoaderReturnData} */
  // const data = useLoaderData();
  const {reviewData} = useLoaderData();
  const reviews = reviewData?.data?.widget?.reviews ?? [];

  // StarRating.jsx
  const StarRating = ({value, max = 5, size = 20, color = '#FFD700'}) => {
    const stars = [];

    for (let i = 1; i <= max; i++) {
      if (i <= value) {
        // Full star
        stars.push(
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 .587l3.668 7.568L24 9.75l-6 5.847 1.416 8.254L12 18.896l-7.416 5.955L6 15.597 0 9.75l8.332-1.595z" />
          </svg>,
        );
      } else {
        // Empty star
        stars.push(
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 .587l3.668 7.568L24 9.75l-6 5.847 1.416 8.254L12 18.896l-7.416 5.955L6 15.597 0 9.75l8.332-1.595z" />
          </svg>,
        );
      }
    }

    return <div style={{display: 'flex', gap: 2}}>{stars}</div>;
  };

  const renderedReviews = reviews.map((review, i) => {
    return (
      <div key={i}>
        <h3>{review?.author?.name}</h3>
        <img
          src={review?.author?.avatarUrl}
          alt="test"
          width={48}
          height={48}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <p>{review?.text}</p>
        <StarRating value={review?.rating?.value} />
      </div>
    );
  });

  // const renderedInfoCards = infoCards.map((infoCard, i) => {
  //   return (
  //     <>
  //       <InfoCard key={i} cardContent={infoCard} />
  //     </>
  //   );
  // });
  return (
    <div className={styles.home}>
      {/* <img
        className={styles.logo}
        src="../images/ColorLogo.png"
        alt="moua-logo"
      ></img> */}
      <section className={styles.imageWrapper}>
        <img
          className={styles.flowerHero}
          src="/images/WeddingCouple.png"
          alt="wedding couple"
        ></img>
        <div className={styles.overlayText}>
          <img
            className={styles.logo}
            src="/symbols/WhiteLogoNoBackgroundResized.png"
            alt="moua-logo"
          ></img>

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
              bgColor={'hsl(42, 31%, 99%)'}
              textColor={'#363636'}
              to="/pages/contact"
            >
              WEDDINGS
            </AnimatedButton>

            <AnimatedButton
              bgColor={'hsl(42, 31%, 99%)'}
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

      <section className={styles.dummySection}>
        {renderedReviews}
        <Link to="https://www.google.com/maps/place/Moua+flowers+%2F+blommor+Florist+G%C3%B6teborg/@57.6686556,11.9333473,17z/data=!4m8!3m7!1s0xa28c1953c5af7ff5:0x8a4fb365bf584747!8m2!3d57.6686556!4d11.9333473!9m1!1b1!16s%2Fg%2F11pdmlvjky?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D">
          Leave a review!
        </Link>
      </section>
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
