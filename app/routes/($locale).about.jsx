import {Fragment} from 'react';
import styles from '../styles/aboutpage.module.css';
import {AnimatedButton} from '~/components/AnimatedButton/AnimatedButton';

export const meta = () => {
  return [{title: 'Mouaflowers | About'}];
};

// Page copy is kept in one place so it can be translated (Spanish/English) later.
const content = {
  title: 'About',
  intro: {
    lines: ['Hi im Ana Laura', 'Founder & floral designer.', 'The person', 'behind'],
    company: 'Moua Flowers',
    imageAlt: 'Ana Laura, founder of Moua Flowers, holding a pink flower',
  },
  journeyHeading: 'Flower Journey',
  story: {
    title: ['The Story Behind', 'Moua Flowers'],
    paragraphs: [
      'My flower journey started as an Event & Wedding Planning coordinator in my home town Mexico City.',
      'I just fell in love with being in contact with flowers in every single event & felt truly inspired by them.',
      'Since then I have been self-trained & educated with incredible contemporary style florists in the industry. This is where I really developed my airy & loose style.',
      'Later on, love got on the way... while working with a wedding planner in Barcelona, Spain I met my now Swedish boyfriend & why not? took a life-changing decision... keen to explore something more & eager to learn another style I moved from México City to Göteborg, Sweden.',
      'Moua Flowers with cause is based in Högsbo, southwest Göteborg & is available for floral styling, weddings & events of all sizes. We want to make you beautiful flowers, for whatever the occasion.',
    ],
    imageAlt: 'Ana Laura arranging a floral centerpiece on a wedding table',
  },
  whoHeading: 'Who are we',
  concept: {
    title: 'Concept',
    imageAlt:
      'Bride in a white lace dress walking barefoot with a loose garden-style bouquet',
    paragraphs: [
      'Our style is loose, organic & elegant, we are nature lovers that’s why it’s important for us that most of our designs take you to a natural world with movement and a natural fall of flowers to embrace the plants natural habit, by giving you the illusion of flowers growing out of the base.',
      'We celebrate the best of the season, that’s why for our designs, we try to use seasonal flowers since it is the moment when they shine with all their beauty, naturalness & aroma of fresh flowers.',
    ],
    buttons: {
      weddings: 'WEDDINGS',
      orderFlowers: 'ORDER FLOWERS',
      continueExploring: 'CONTINUE EXPLORING',
    },
  },
};

export default function About() {
  return (
    <div className={styles.about}>
      <section className={styles.aboutSection}>
        <div className={styles.headerContent}>
          <div className={styles.line}></div>
          <h1 className={styles.title}>{content.title}</h1>
        </div>
        <div className={styles.lineTwo}></div>
        <div className={styles.founderWrapper}>
          <img
            className={styles.founderImg}
            src="/images/founderImg2.png"
            alt={content.intro.imageAlt}
          ></img>
          <h2>
            {content.intro.lines.map((line) => (
              <Fragment key={line}>
                {line}
                <br />
              </Fragment>
            ))}
            <span className={styles.companyTitle}>
              {content.intro.company}
            </span>
          </h2>
        </div>
      </section>

      <h2 className={`${styles.sectionHeading} ${styles.journeyHeading}`}>
        {content.journeyHeading}
      </h2>

      <section className={styles.storySection}>
        <div className={styles.storyCard}>
          <h3 className={styles.storyTitle}>
            {content.story.title[0]}
            <br />
            {content.story.title[1]}
          </h3>
          <div className={styles.storyTitleLine}></div>
          <div className={`${styles.bodyText} ${styles.storyText}`}>
            {content.story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <img
          className={styles.storyImg}
          src="/images/aboutImages/AnaWorking.png"
          alt={content.story.imageAlt}
          loading="lazy"
        ></img>
      </section>

      <div className={`${styles.headerContent} ${styles.headerContentRight}`}>
        <div className={styles.line}></div>
        <h2 className={styles.sectionHeading}>{content.whoHeading}</h2>
      </div>

      <section className={styles.conceptSection}>
        <div className={styles.conceptCard}>
          {/* The photo is part of the card's background image (ConceptBg.png) */}
          <div
            className={styles.conceptPhoto}
            role="img"
            aria-label={content.concept.imageAlt}
          ></div>
          <div className={styles.conceptLine}></div>
          <h3 className={styles.conceptTitle}>{content.concept.title}</h3>
          <div className={`${styles.bodyText} ${styles.conceptText}`}>
            {content.concept.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.conceptButtons}>
            <AnimatedButton
              bgColor={'var(--dustyPink)'}
              textColor={'white'}
              to="/weddings"
            >
              {content.concept.buttons.weddings}
            </AnimatedButton>
            <AnimatedButton
              bgColor={'var(--dustyPink)'}
              textColor={'white'}
              to="/order-flowers"
            >
              {content.concept.buttons.orderFlowers}
            </AnimatedButton>
            <AnimatedButton
              bgColor={'var(--offBlack)'}
              textColor={'var(--offWhite)'}
              to="/"
            >
              {content.concept.buttons.continueExploring}
            </AnimatedButton>
          </div>
          <div className={styles.conceptEndLine}></div>
        </div>
      </section>
    </div>
  );
}
