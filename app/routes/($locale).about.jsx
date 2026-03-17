import {Await, useLoaderData, Link} from 'react-router';
import styles from '../styles/aboutpage.module.css';

export const meta = () => {
  return [{title: 'Mouaflowers | About'}];
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

export default function About() {
  /** @type {LoaderReturnData} */
  return (
    <div className={styles.about}>
      <section className={styles.aboutSection}>
        <div className={styles.headerContent}>
          <div className={styles.line}></div>
          <h1 className={styles.title}>About</h1>
        </div>
        <div className={styles.lineTwo}></div>
        <div className={styles.founderWrapper}>
          <img
            className={styles.founderImg}
            src="/images/founderImg2.png"
            alt="wedding couple"
          ></img>
          <h2>
            HI IM ANA LAURA <br /> FOUNDER & FLORAL DESIGNER. <br /> THE PERSON{' '}
            <br /> BEHIND{' '}
            <span className={styles.companyTitle}>MOUAFLOWERS</span>
          </h2>
        </div>
      </section>
      <section className={styles.dummySection}></section>
    </div>
  );
}
