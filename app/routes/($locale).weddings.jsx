import {Await, useLoaderData, Link} from 'react-router';
import styles from '../styles/weddingspage.module.css';
import {AnimatedButton} from '~/components/AnimatedButton/AnimatedButton';

export const meta = () => {
  return [{title: 'Mouaflowers | Weddings'}];
};

// export async function loader({context}) {
//   // Optional debug (remove later)
//   console.log(context.env.FEATURABLE_URL);

//   // Call your REST client
//   const reviewData = await context.featurableReviews.getReviews();

//   return {
//     reviewData,
//   };
// }

export default function Weddings() {
  /** @type {LoaderReturnData} */
  return (
    <div className={styles.weddings}>
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
          <h2>Based in Göteborg, Sweden</h2>
          <h1>Weddings</h1>

          <div className={styles.buttonContainer}>
            <AnimatedButton
              bgColor={'hsl(42, 31%, 99%)'}
              textColor={'#363636'}
              to="/pages/contact"
            >
              INQUIRE
            </AnimatedButton>
          </div>
        </div>
      </section>
      <section className={styles.weddingSection}>
        <h2>Luxury Wedding Floral Design by Moua Flowers</h2>
        <h3>
          <span>WE KNOW HOW SPECIAL THIS DAY IS</span>
          <span>&</span>
          <span>WE WOULD LOVE TO BE PART OF YOUR STORY</span>
        </h3>
        <p>
          Focused on delivering a natural luxurious floral aesthetic, we
          specialize in a timeless garden aesthetic that will provide an elegant
          feel for your celebration.
        </p>
        <div>
          <div className={styles.photoWrapper}>
            <div className={styles.photoArranger}>
              <img
                className={styles.leftImg}
                src="/images/collections.jpeg"
                alt="wedding couple"
              ></img>
              <img
                className={styles.rightImg}
                src="/images/collections.jpeg"
                alt="wedding couple"
              ></img>
            </div>
          </div>
          <div className={styles.textWrapper}>
            <p>
              <span>
                {' '}
                We know how special this day is & we would love to be part of
                your story.
              </span>
              <span>
                {' '}
                We offer foam-free floral design and full-service wedding
                florals, including planning, styling, and professional
                installation.
              </span>
              <span>
                Our work ranges from romantic ceremony settings and bridal
                bouquets to low and tall centerpieces, statement floral
                installations, and thoughtfully curated candle décor.
              </span>
              <span>
                We only take on a small number of weddings each year so we can
                fully focus on every couple we work with.
              </span>
              <span>
                We custom-order premium blooms for every wedding and give each
                celebration our full care from concept to setup.
              </span>
            </p>

            <AnimatedButton
              bgColor={'#edd0ce'}
              textColor={'white'}
              to="/pages/contact"
            >
              INQUIRY
            </AnimatedButton>
          </div>
        </div>
      </section>
      <div className={styles.weddingBannerWrapper}>
        <img
          className={styles.weddingBannerImg}
          src="/images/WeddingsBottomBanner.png"
          alt="wedding couple"
        ></img>
      </div>
    </div>
  );
}
